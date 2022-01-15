import { Module } from '@nestjs/common';
import { NewUserController } from './users.controller';
import { UserService } from './users.service';

@Module({
  imports: [],
  controllers: [NewUserController],
  providers: [UserService],
})
export class UserModule {}
