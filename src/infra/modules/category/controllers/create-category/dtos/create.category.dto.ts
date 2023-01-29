import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateCategoryDto {
  @IsEmail()
  @IsNotEmpty({ message: 'email can not be empty' })
  email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is too weak',
  })
  @IsNotEmpty({ message: 'password can not be empty' })
  password: string;

  @IsNotEmpty({ message: 'name can not be empty' })
  @MinLength(3)
  @MaxLength(50)
  name: string;
}
