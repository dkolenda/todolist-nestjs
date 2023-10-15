import { Transform, TransformFnParams } from 'class-transformer';
import { IsNumber, Min } from 'class-validator';

export class ParamTaskDto {
  @Transform((params: TransformFnParams) => parseInt(params.value))
  @IsNumber()
  @Min(1)
  id: number;
}
