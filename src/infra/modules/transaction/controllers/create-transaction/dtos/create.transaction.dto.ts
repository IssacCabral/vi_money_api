import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

import { TransactionType } from 'src/domain/entities/transaction';

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsUUID()
  categoryId: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  title: string;

  @IsNotEmpty()
  @IsEnum(TransactionType)
  type: string;

  @IsNumber()
  @Type(() => Number)
  @IsPositive()
  amount: number;
}
