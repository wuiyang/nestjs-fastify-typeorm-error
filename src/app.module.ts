import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  // removing imports will solve the issue
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      ssl: {
        rejectUnauthorized: false,
      },
      host: 'localhost',
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      extra: {
        ssl: false,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
