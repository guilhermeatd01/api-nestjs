import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Profile } from './profile.entity';

@Controller('profiles')
export class ProfileController {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  @Get()
  async index(): Promise<Profile[]> {
    return this.profileRepository.find({order: {id: "ASC"}});
  }

  @Get(':id')
  async show(@Param('id') id: string): Promise<Profile> {
    return this.profileRepository.findOneOrFail(id);
  }

  @Post()
  async store(@Body() body: Profile): Promise<Profile> {
    const profile = this.profileRepository.create(body);
    return this.profileRepository.save(profile);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: Profile): Promise<Profile> {
    await this.profileRepository.findOneOrFail(id);
    await this.profileRepository.update({id: +id}, body);
    return await this.profileRepository.findOneOrFail(id);
  }

  @Delete(':id')
  async destroy(@Param('id') id: string): Promise<DeleteResult> {
    await this.profileRepository.findOneOrFail(id);
    return this.profileRepository.delete(id);
  }
}
