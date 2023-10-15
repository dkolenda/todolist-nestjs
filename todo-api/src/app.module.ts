import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configSrvices: ConfigService) => {
        return {
          type: 'postgres',
          synchronize: true,
          logging: true,
          autoLoadEntities: true,
          host: configSrvices.get('DB_HOST'),
          port: configSrvices.get('DB_PORT'),
          password: configSrvices.get('DB_PASSWORD'),
          username: configSrvices.get('DB_USERNAME'),
          database: configSrvices.get('DB_DATABASE'),
        };
      },
    }),
    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
