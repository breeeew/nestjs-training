import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BoardingsController } from './boardings.controller';
import { BoardingsService } from './boardings.service';
import { Boarding, BoardingSchema } from './boarding.schema';
import { ImportsModule } from './imports/imports.module';
import { User, UserSchema } from '../users/user.schema';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Boarding.name, schema: BoardingSchema },
      { name: User.name, schema: UserSchema },
    ]),
    ImportsModule,
    EventsModule,
  ],
  controllers: [BoardingsController],
  providers: [BoardingsService],
})
export class BoardingsModule {}
