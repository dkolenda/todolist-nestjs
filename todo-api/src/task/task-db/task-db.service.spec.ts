import { Test, TestingModule } from '@nestjs/testing';
import { TaskDbService } from './task-db.service';

describe('TaskDbService', () => {
  let service: TaskDbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskDbService],
    }).compile();

    service = module.get<TaskDbService>(TaskDbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
