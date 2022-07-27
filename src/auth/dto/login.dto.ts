import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ type: String, description: 'Desired email' })
  email: string;

  @ApiProperty({ type: String, description: 'Desired password' })
  password: string;
}
