import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/profile/profile.entity';
import { DeleteResult, Repository } from 'typeorm';
import CreateUserDto from './create-user.dto';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  @Get()
  async index(): Promise<User[]> {
    return this.userRepository.find({order: {id: "ASC"}, relations: ['profiles'] });
  }

  @Get(':id')
  async show(@Param('id') id: string): Promise<User> {
    return this.userRepository.findOneOrFail(id, { relations: ['profiles'] });
  }

  @Post()
  async store(@Body() body: CreateUserDto): Promise<User> {
    const { name, profileIDs } = body;
    const user = new User();

    user.name = name;
    user.profiles = <Profile[]>[];

    for (let i = 0; i < profileIDs.length; i++) {
      const profile = await this.profileRepository.findOne(profileIDs[i]);
      user.profiles.push(profile);
    }

    return this.userRepository.save(user);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: CreateUserDto,
  ): Promise<User> {
    const { name, profileIDs } = body;
    const user = await this.userRepository.findOneOrFail(id);

    user.name = name;
    user.profiles = <Profile[]>[];

    for (let i = 0; i < profileIDs.length; i++) {
      const profile = await this.profileRepository.findOne(profileIDs[i]);
      user.profiles.push(profile);
    }

    return this.userRepository.save(user);
  }

  @Delete(':id')
  async destroy(@Param('id') id: string): Promise<DeleteResult> {
    await this.userRepository.findOneOrFail(id);
    return this.userRepository.delete(id);
  }
}
