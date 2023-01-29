import { Module } from '@nestjs/common';
import { AuthenticationModule } from './controllers/authentication/authentication.module';

@Module({
  imports: [AuthenticationModule],
  exports: [AuthModule],
})
export class AuthModule {}
