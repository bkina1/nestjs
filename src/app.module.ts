import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { UserAppModule } from './user-app/user-app.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerBehindProxyGuard } from './common/guards/throttler-behind-proxy.guard';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000, // time to live in seconds
        limit: 3, // maximum number of requests within the ttl
      },
      {
        name: 'medium',
        ttl: 10000, // time to live in seconds
        limit: 10, // maximum number of requests within the ttl
      },
      {
        name: 'long',
        ttl: 100000, // time to live in seconds
        limit: 100, // maximum number of requests within the ttl
      },
    ]),
    UsersModule,
    DatabaseModule,
    UserAppModule,
  ],
  controllers: [AppController, UsersController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerBehindProxyGuard,
    },
    AppService,
    UsersService,
  ],
})
export class AppModule {}
