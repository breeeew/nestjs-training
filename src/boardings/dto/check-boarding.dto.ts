import { ApiProperty } from '@nestjs/swagger';

export class CheckBoardingDto {
  @ApiProperty({
    example: '607c418e12acd66fa792a451',
  })
  readonly id: string;
  @ApiProperty({
    example: '607c418e12acd66fa792a123',
  })
  readonly code: string;
}
