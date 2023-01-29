import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { DbAuthUseCase } from 'src/data/usecases/auth/db-auth';
import { DatabaseModule } from 'src/infra/database/database.module';
import { AUTH_USE_CASE } from '../../auth.providers';
import { AuthenticationController } from './authentication.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { DbAuthUseCaseModule } from './usecase-module/db.usecase.module';

@Module({
  imports: [DbAuthUseCaseModule, PassportModule, DatabaseModule],
  controllers: [AuthenticationController],
  providers: [
    {
      provide: AUTH_USE_CASE,
      useClass: DbAuthUseCase,
    },
    JwtStrategy,
  ],
})
export class AuthenticationModule {}
