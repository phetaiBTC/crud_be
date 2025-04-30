import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
  ) { }
  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.userRepo.findOne({ where: { email: createUserDto.email } });
    if (existingUser) {
      throw new BadRequestException('Email is already in use');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = this.userRepo.create({
      ...createUserDto,
      password: hashedPassword,
    });
    this.userRepo.save(newUser);
    return { message : `Created user successfully` };
  }

  findAll() {
    return this.userRepo.find();
  }

  findOne(id: number) {
    return this.userRepo.findOneBy({ id: id });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this.userRepo.update(id, {
      username: updateUserDto.username,
      email: updateUserDto.email,
      updatedAt: new Date(),
    });
    return { message: `Updated user successfully` };
  }

  remove(id: number) {
    this.userRepo.delete(id);
    return { message: `Deleted user successfully` };
  }
}
