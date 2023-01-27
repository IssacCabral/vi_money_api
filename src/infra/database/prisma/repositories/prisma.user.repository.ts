import { Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/data/repositories/user-repository';
import { IUser } from 'src/domain/entities/user';
import { CreateUserParams } from 'src/domain/types/user-params';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  createUser(user: CreateUserParams): Promise<IUser> {
    throw new Error('Method not implemented.');
  }
  findUserByEmail(email: string): Promise<IUser> {
    throw new Error('Method not implemented.');
  }
  findUserByUsername(username: string): Promise<IUser> {
    throw new Error('Method not implemented.');
  }
}
