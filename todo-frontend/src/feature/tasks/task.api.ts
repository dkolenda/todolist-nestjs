import { type CreateTaskDto } from './../../../../todo-api/src/task/dto/create-task.dto';
import { api } from "../../shared/api";


export function createTask({content}: CreateTaskDto){
    return api.post('task', {
        content,
    })
}