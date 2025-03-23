import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { lowerCaseTransformer } from 'src/utils/transformers/lower-case.transformer';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../users/entities/user.entity';

export class AuthRegisterDto {
  @ApiProperty({ example: 'admin@gmail.com' })
  @Transform(lowerCaseTransformer)
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'admin' })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: '123456' })
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'Admin' })
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ example: 'Admin' })
  @IsNotEmpty()
  role: UserRole;
}
