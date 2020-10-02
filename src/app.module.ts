import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Profile } from './profile/profile.entity';
import { ProfileModule } from './profile/profile.module';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';

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
      "entities": [Profile, User],
      "migrationsTableName": "migrations",
      "migrations": ["src/migrations/*.js"],
      "cli": {
          "migrationsDir": "src/migrations"
      }
    }),
    ProfileModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}