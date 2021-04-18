import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'User name',
  })
  readonly name: string;
  @ApiProperty({
    example: 1234,
    description: 'Amount distance in km',
  })
  readonly distance: string;
  @ApiProperty({
    example: 100,
    description: 'Amount flight hours',
  })
  readonly hours: number;
}
