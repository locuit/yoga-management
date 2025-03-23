import { Transform } from 'class-transformer';

import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

import { lowerCaseTransformer } from 'src/utils/transformers/lower-case.transformer';
import { UserRole, UserStatus } from '../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'admin@gmail.com' })
  @Transform(lowerCaseTransformer)
  @IsNotEmpty()
  @IsEmail()
  email: string | null;

  @ApiProperty({ example: '123456' })
  @MinLength(6)
  password?: string;

  @ApiProperty({ example: 'Gymer' })
  @IsNotEmpty()
  fullName: string | null;

  @ApiProperty({ example: 'Admin', enum: UserRole })
  role: UserRole;

  status?: UserStatus;

  hash?: string | null;
}
