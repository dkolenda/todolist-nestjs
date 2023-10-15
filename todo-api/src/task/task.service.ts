import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

export abstract class TaskService {
  abstract create(createTaskDto: CreateTaskDto): Promise<Task>;
  abstract findAll(page: number, limit: number): Promise<Task[]>;
  abstract remove(id: number): void;
  abstract update(id: number, updateTaskDto: UpdateTaskDto): void;
}
