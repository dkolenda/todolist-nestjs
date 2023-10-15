import { create } from 'zustand'
import { createTask } from './task.api'

interface Task {
    content:string,
    done:boolean,
    id:number
}

interface TaskStore {
    tasks: Task[];
    isFetching: boolean;
    error: string;
}

interface TaskAction {
    createTask: (content:string)=>void
}

export const useTaskStore = create<TaskStore & TaskAction>((set) => ({
  tasks: [],
  isFetching: false,
  error:'',
  createTask: async (content:string)=>{
    try{
        set(() => ({isFetching:true, error:''}));
        const response = await createTask({content});
        const task = {
            content,
            done:false,
            id:response.data.taskId
        }
        set((state: TaskStore) => ({ 
            tasks: [...state.tasks, task],
            isFetching:false
        }));
    }catch(e){
        set(() => ({ 
            error: 'something went wrong',
            isFetching:false
        }));
    }
  }
}))