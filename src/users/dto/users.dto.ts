import { ApiProperty } from '@nestjs/swagger';

export class UsersDto {
  @ApiProperty({ type: String, description: 'Full name' })
  fullname: string;

  @ApiProperty({ type: String, description: 'Desired email' })
  email: string;

  @ApiProperty({ type: String, description: 'Desired password' })
  password: string;

  @ApiProperty({ type: Number, description: 'Identification number' })
  dni: number;

  @ApiProperty({ type: String, description: 'Desired address' })
  address: string;
}
