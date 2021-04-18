import { HttpException, Inject, Injectable } from '@nestjs/common';
import { BarcodeGenerator, Imports } from './imports/types';
import { CheckBoardingDto } from './dto/check-boarding.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Boarding, BoardingDocument } from './boarding.schema';
import { Model } from 'mongoose';
import { User, UserDocument } from '../users/user.schema';
import { EventsGateway } from './events/events.gateway';

@Injectable()
export class BoardingsService {
  constructor(
    @Inject(Imports.BARCODE_MODULE)
    private readonly barcodeModule: BarcodeGenerator,
    @InjectModel(Boarding.name)
    private readonly boardingModel: Model<BoardingDocument>,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly eventsGateway: EventsGateway,
  ) {}

  async getAllBoardings() {
    return this.boardingModel.find().populate('user').exec();
  }

  async generateCodeForUser(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new HttpException("User doesn't exist", 404);
    }

    let doc = await this.boardingModel.findOne({
      user: user.id,
    });

    if (!doc) {
      doc = await this.boardingModel.create({
        user: user.id,
      });
    }

    return this.barcodeModule.toBuffer({
      bcid: 'code128',
      text: doc.id,
      scale: 3,
      height: 15,
      includetext: true,
      textxalign: 'center',
    });
  }

  async validateCode(boardingDto: CheckBoardingDto) {
    const doc = await this.boardingModel
      .findOne({
        _id: boardingDto.code,
        user: boardingDto.id,
      })
      .populate('user')
      .exec();

    if (!doc) {
      throw new HttpException('Not valid!', 409);
    }

    this.eventsGateway.sendLastChecked(doc.user as UserDocument);
    return doc.user;
  }
}
