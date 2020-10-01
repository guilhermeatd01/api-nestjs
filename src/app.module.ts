import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Profile } from './profile/profile.entity';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      "type": "mysql",
      "host": "db",
      "port": 3306,
      "username": "root",
      "password": "root",
      "database": "lazaros",
      "synchronize": true,
      "entities": [Profile],
      "migrationsTableName": "migrations",
      "migrations": ["src/migrations/*.js"],
      "cli": {
          "migrationsDir": "src/migrations"
      }
    }),
    ProfileModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}