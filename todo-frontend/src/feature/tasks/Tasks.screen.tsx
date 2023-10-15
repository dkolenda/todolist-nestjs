import { Grid, Stack } from "@mui/material";
import { TasksForm } from "./tasksForm/TasksForm";
import { ErrorSnackbar } from "../../shared/ErrorSnackbar";
import { TaskList } from "./taskList/TaskList";


export function TaskScreen(){
    return (
        <Stack flex={1} padding={2}>
            <Grid container>
                <Grid item xs={12}><TasksForm/></Grid>
                <Grid item xs={12}><TaskList /></Grid>
            </Grid>
            <ErrorSnackbar/>
        </Stack>
    )
}