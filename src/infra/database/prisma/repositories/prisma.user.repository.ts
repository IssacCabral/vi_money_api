import { Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/data/repositories/user-repository';
import { IUser } from 'src/domain/entities/user';
import { CreateUserParams } from 'src/domain/types/user-params';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(user: CreateUserParams): Promise<IUser> {
    const createdUser = await this.prismaService.user.create({
      data: user,
    });

    return createdUser;
  }

  async findUserById(id: string): Promise<IUser> {
    return await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
  }

  async findUserByEmail(email: string): Promise<IUser> {
    return await this.prismaService.user.findFirst({
      where: {
        email,
      },
    });
  }

  async findUserByUsername(username: string): Promise<IUser> {
    return await this.prismaService.user.findFirst({
      where: {
        username,
      },
    });
  }
}
