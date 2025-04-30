import { Injectable } from '@nestjs/common';
import { CreateLogDto } from './dto/create-log.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Log } from './entities/log.entity';
@Injectable()
export class LogsService {
  constructor(
    @InjectRepository(Log) private logRepo: Repository<Log>,
  ){}
  create(createLogDto: CreateLogDto) {
    return this.logRepo.save(createLogDto);
  }

  findAll() {
    return this.logRepo.find();
  }

  findOne(id: number) {
    return this.logRepo.findOneBy({ id: id });
  }
}
