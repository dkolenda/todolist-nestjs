import { TableRow, TableCell, Checkbox, Button, Typography } from "@mui/material";
import { Task } from "../models/Task";
import { useTaskStore } from "../useTaskStore";

interface TaskPrps {
    task: Task;
}

export function TaskItam(props:TaskPrps){
    const {task} = props;
    const deleteTask = useTaskStore((state)=>state.deleteTask)
    const checkTask = useTaskStore((state)=>state.checkTask)

    const handleChange = ()=>{
        checkTask(task.id);
    }

    const handleDelete = ()=>{
        deleteTask(task.id);
    }

    return (
    <TableRow>
        <TableCell>
            <Typography sx={{textDecoration: (task.done)?'line-through':'none'}}>
                {task.content}
            </Typography>
        </TableCell>
        <TableCell align="center"><Checkbox onChange={handleChange} checked={task.done} disabled={task.done} /></TableCell>
        <TableCell align="center">
            <Button variant="outlined" color="error" onClick={handleDelete} disabled={task.done}>Delete</Button>
        </TableCell>
    </TableRow>
    )
}