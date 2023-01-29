import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'name can not be empty' })
  @MinLength(3)
  @MaxLength(50)
  name: string;
}
