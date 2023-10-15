import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from '../dto/create-task.dto';
import { Task } from '../entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskService } from '../task.service';

@Injectable()
export class TaskDbService implements TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const { content } = createTaskDto;

    const createTask = this.taskRepository.create({
      content,
      done: false,
    });
    return this.taskRepository.save(createTask);
  }

  findAll(page: number, limit: number): Promise<Task[]> {
    const skip = (page - 1) * limit;
    return this.taskRepository.find({ skip, take: limit });
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} task`;
  // }

  // update(id: number, updateTaskDto: UpdateTaskDto) {
  //   return `This action updates a #${id} task`;
  // }

  async remove(id: number) {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Not found task');
    }
  }
}
