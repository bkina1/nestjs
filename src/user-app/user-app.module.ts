import { Module } from '@nestjs/common';
import { UserAppService } from './user-app.service';
import { UserAppController } from './user-app.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UserAppController],
  providers: [UserAppService],
})
export class UserAppModule {}
