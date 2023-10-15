import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Checkbox, Button } from "@mui/material";
import { useTaskStore } from "../useTaskStore";
import { useEffect} from 'react';
import { TaskItam } from "./TaskItam";

export function TaskList(){
    const tasks = useTaskStore((state)=>state.tasks);
    const getFetch = useTaskStore((state)=>state.getFetch);

    useEffect(()=>{
        getFetch();
    },[])

    return (
      <TableContainer sx={{ maxWidth: '100%' }}>
            <Table>
                <TableHead>
                    <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tasks.map((task) => (
                        <TaskItam key={task.id} task={task} />
                    ))}
                </TableBody>
            </Table>
      </TableContainer>
    )
}