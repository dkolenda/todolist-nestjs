import { Transform, TransformFnParams } from 'class-transformer';
import { IsNumber, Min } from 'class-validator';

export class GetTasksDto {
  @Transform((params: TransformFnParams) => parseInt(params.value))
  @IsNumber()
  @Min(1)
  page: number;

  @Transform((params: TransformFnParams) => parseInt(params.value))
  @IsNumber()
  @Min(1)
  limit: number;
}
