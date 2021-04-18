import {
  ConnectedSocket,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../../users/user.schema';
import { Model } from 'mongoose';

@WebSocketGateway()
export class EventsGateway implements OnGatewayDisconnect {
  @WebSocketServer()
  private server: Server;
  private interval: NodeJS.Timeout;
  private toSendIndex: number;
  private readonly statisticsClients: Socket[];
  private readonly lastCheckedClients: Socket[];

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {
    this.statisticsClients = [];
    this.lastCheckedClients = [];
  }

  sendLastChecked(user: User) {
    for (const client of this.lastCheckedClients) {
      client.emit('boarding', user);
    }
  }

  @SubscribeMessage('boarding')
  async handleBoardingEvent(@ConnectedSocket() client: Socket) {
    this.lastCheckedClients.push(client);
  }

  @SubscribeMessage('map')
  async handleMapEvent(@ConnectedSocket() client: Socket) {
    clearInterval(this.interval);

    this.statisticsClients.push(client);

    const emitNextUser = async () => {
      const users = await this.userModel.find().exec();

      if (this.toSendIndex == null || this.toSendIndex >= users.length) {
        this.toSendIndex = 0;
      }
      const user = users[this.toSendIndex];

      for (const client of this.statisticsClients) {
        if (!client.disconnected) {
          client.emit('userStatistics', user);
        }
      }

      this.toSendIndex++;
    };

    await emitNextUser();
    this.interval = setInterval(() => emitNextUser(), 10000);
  }

  handleDisconnect() {
    clearInterval(this.interval);
  }
}
