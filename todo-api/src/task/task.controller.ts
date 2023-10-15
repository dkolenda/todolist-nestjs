import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  ValidationPipe,
  Res,
  HttpStatus,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksDto } from './dto/get-tasks.dto';
import { Response } from 'express';
import { ParamTaskDto } from './dto/param-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto, @Res() res: Response) {
    const task = await this.taskService.create(createTaskDto);

    return res.status(HttpStatus.CREATED).json({
      taskId: task.id,
    });
  }

  @Get()
  async findAll(
    @Query(new ValidationPipe()) query: GetTasksDto,
    @Res() res: Response,
  ) {
    const tasks = await this.taskService.findAll(query.page, query.limit);

    return res
      .status(tasks?.length ? HttpStatus.OK : HttpStatus.NOT_FOUND)
      .json({
        tasks: tasks,
      });
  }

  @Patch(':id')
  update(
    @Param(new ValidationPipe()) params: ParamTaskDto,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.taskService.update(params.id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param(new ValidationPipe()) params: ParamTaskDto) {
    return this.taskService.remove(params.id);
  }
}
