import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_PIPE } from '@nestjs/core';
import { LogsModule } from './logs/logs.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { LoggerService } from './common/utils/logger.service';
@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'phet_test',
    autoLoadEntities: true,
    synchronize: true,
  }), UsersModule, LogsModule],
  controllers: [AppController],
  providers: [AppService, LoggerService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*'); // ทุก route
  }
}
