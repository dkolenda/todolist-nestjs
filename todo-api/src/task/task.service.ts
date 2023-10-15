import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entities/task.entity';

export abstract class TaskService {
  abstract create(createTaskDto: CreateTaskDto): Promise<Task>;
}
