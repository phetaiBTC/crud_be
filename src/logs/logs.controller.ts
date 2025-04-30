import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { LogsService } from './logs.service';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';
import * as fs from 'fs';
import * as path from 'path';
@Controller('logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) { }

  @Post()
  create(@Body() createLogDto: CreateLogDto) {
    return this.logsService.create(createLogDto);
  }

  @Get()
async getLogs(@Query('date') date: string): Promise<{ message: string }[]> {
  const logDate = date || new Date().toISOString().split('T')[0]; // เช่น '2025-04-29'
  const logFile = path.join(__dirname, '..', '..', 'logs', `application-${logDate}.log`);

  try {
    const logContent = fs.readFileSync(logFile, 'utf-8');
    const lines = logContent
      .split('\n')
      .filter(line => line.trim() !== '')
      .map(line => ({ message: line }))
      .reverse();

    return lines;
  } catch (err) {
    return [{ message: `ไม่พบ log สำหรับวันที่ ${logDate}` }];
  }
}


}
