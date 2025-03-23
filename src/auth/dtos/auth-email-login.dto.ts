import { IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';
import { lowerCaseTransformer } from 'src/utils/transformers/lower-case.transformer';
import { ApiProperty } from '@nestjs/swagger';

export class AuthEmailLoginDto {
  @ApiProperty({ example: 'admin@gmail.com' })
  @Transform(lowerCaseTransformer)
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
