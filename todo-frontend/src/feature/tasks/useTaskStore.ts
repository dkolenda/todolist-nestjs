import { create } from 'zustand'
import { checkTask, createTask, deleteTask, fetchTasks } from './task.api'
import { Task } from './models/Task';
import { AxiosError } from 'axios';
import { TaskErrors } from './models/TaskErrors';



interface TaskStore {
    tasks: Task[];
    page: number, 
    limit: number,
    isFetching: boolean;
    error: string;
}

interface TaskAction {
    createTask: (content:string)=>void;
    getFetch: ()=>void;
    deleteTask: (id:number)=>void;
    showDefaultError: ()=>void;
    showError: (e:unknown)=>void;
    checkTask: (id:number)=>void;
}

export const useTaskStore = create<TaskStore & TaskAction>((set, get) => ({
  tasks: [],
  page: 1, 
  limit: 20,
  isFetching: false,
  error:'',
  showDefaultError: ()=>{
    set(() => ({ 
        error: 'something went wrong',
        isFetching:false
    }));
  },

  showError: (e: unknown)=>{
    if(e instanceof AxiosError){
        switch(e.response?.data?.message){
            case TaskErrors.NOT_FOUND_TASK:
                set(() => ({ 
                    error: 'Not found task',
                    isFetching:false
                })); 
                return;  
            default:
                get().showDefaultError();
                return; 
        }
    }
    get().showDefaultError();
  },

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
            tasks: [task, ...state.tasks],
            isFetching:false
        }));
    }catch(e){
        get().showDefaultError();
    }
  },

  getFetch: async ()=>{
    try{
        set(() => ({isFetching:true}));
        const response = await fetchTasks({page:get().page,limit:get().limit});
        set(() => ({ 
            tasks: response.data.tasks,
            isFetching:false
        }));
    }catch(e){
        get().showDefaultError();
    }
  },

  deleteTask: async (id)=>{
    try{
        set(() => ({isFetching:true}));
        await deleteTask(id);
        set(() => ({ 
            tasks: get().tasks.filter((task)=>task.id!==id),
            isFetching:false
        }));
    }catch(e){
        get().showError(e);
    }
  },
  
  checkTask: async (id)=>{
    try{
        set(() => ({
            isFetching:true,
            tasks: get().tasks.map((task)=>{
                    if(task.id === id){
                        task.done = true;
                    }
                    return task;
            })
        }));
        await checkTask(id, true);
        set(() => ({isFetching:false}));
    }catch(e){
        get().showError(e);
        set(() => ({
            tasks: get().tasks.map((task)=>{
                    if(task.id === id){
                        task.done = false;
                    }
                    return task;
            })
        }));
    }
  }
}))