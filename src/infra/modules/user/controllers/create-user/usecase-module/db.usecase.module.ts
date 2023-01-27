import { Module, Provider } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/database/database.module';
import { PrismaUserRepository } from 'src/infra/database/prisma/repositories/prisma.user.repository';
import { BcryptHashAdapter } from 'src/infra/protocols/bcrypt.hash.adapter';
import { HASH_SERVICE, USER_REPOSITORY } from '../../../user.providers';

const providers: Provider[] = [
  {
    provide: USER_REPOSITORY,
    useClass: PrismaUserRepository,
  },
  {
    provide: HASH_SERVICE,
    useClass: BcryptHashAdapter,
  },
];

@Module({
  imports: [DatabaseModule],
  providers: [...providers],
  exports: [...providers],
})
export class DbCreateUserUseCaseModule {}
