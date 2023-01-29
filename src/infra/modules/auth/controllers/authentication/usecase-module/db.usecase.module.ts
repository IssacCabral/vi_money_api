import { Module, Provider } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from 'src/infra/database/database.module';
import { PrismaUserRepository } from 'src/infra/database/prisma/repositories/prisma.user.repository';
import {
  HASH_SERVICE,
  USER_REPOSITORY,
} from 'src/infra/modules/user/user.providers';
import { BcryptHashAdapter } from 'src/infra/protocols/bcrypt.hash.adapter';
import { JwtAdapter } from 'src/infra/protocols/jwt.adapter';
import { JWT_SERVICE } from '../../../auth.providers';
import { jwtConstants } from '../constants';

const providers: Provider[] = [
  {
    provide: USER_REPOSITORY,
    useClass: PrismaUserRepository,
  },
  {
    provide: HASH_SERVICE,
    useClass: BcryptHashAdapter,
  },
  {
    provide: JWT_SERVICE,
    useClass: JwtAdapter,
  },
];

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [...providers],
  exports: [...providers],
})
export class DbAuthUseCaseModule {}
