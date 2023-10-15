import { type CreateTaskDto } from './../../../../todo-api/src/task/dto/create-task.dto';
import { api } from "../../shared/api";


export function createTask({content}: CreateTaskDto){
    return api.post('task', {
        content,
    })
}

export function fetchTasks({page, limit}: {page:number, limit:number}){
    return api.get(`task?page=${page}&limit=${limit}`)
}

export function deleteTask(id:number){
    return api.delete(`task/${id}`)
}

export function checkTask(id:number,done:boolean){
    return api.patch(`task/${id}`, {
        done
    })
}