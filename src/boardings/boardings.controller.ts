import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { BoardingsService } from './boardings.service';
import { Response } from 'express';
import { CheckBoardingDto } from './dto/check-boarding.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../users/user.schema';

@ApiTags('boarding')
@Controller('/boarding')
export class BoardingsController {
  constructor(private boardingsService: BoardingsService) {}

  @Get()
  async getAll() {
    return this.boardingsService.getAllBoardings();
  }

  @ApiOperation({
    summary: 'Generate barcode for user by id',
  })
  @ApiResponse({
    status: 201,
    description: 'Image file represented as string of binary data',
  })
  @Post('/gen')
  async generateCodeForUser(@Body('id') id: string, @Res() res: Response) {
    const image = await this.boardingsService.generateCodeForUser(id);
    res.contentType('image/png').send(image);
  }

  @ApiOperation({
    summary: 'Check user invite by id and invite code (same as invite id)',
  })
  @ApiResponse({
    status: 201,
    description: 'Check was succeed',
    type: User,
  })
  @Post('/check')
  async validateInviteCode(@Body() boardingDto: CheckBoardingDto) {
    return this.boardingsService.validateCode(boardingDto);
  }
}
