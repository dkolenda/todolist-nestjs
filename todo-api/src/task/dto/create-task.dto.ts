import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';
import * as sanitizeHtml from 'sanitize-html';

export class CreateTaskDto {
  @IsString()
  @MinLength(2)
  @MaxLength(250)
  @IsNotEmpty()
  @Transform((params: TransformFnParams) =>
    sanitizeHtml(params.value.trim(), {
      disallowedTagsMode: 'escape',
    }),
  )
  content: string;
}
