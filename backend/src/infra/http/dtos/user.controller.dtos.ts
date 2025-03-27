import { IsEmail, IsOptional, Length } from 'class-validator';

export class CreateUserRequest {
  @IsEmail()
  email: string;

  @Length(2, 255)
  name: string;
}

export class UpdateUserRequest {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsOptional()
  @Length(2, 255)
  name: string;
}
