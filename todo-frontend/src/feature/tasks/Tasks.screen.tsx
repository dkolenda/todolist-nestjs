import { Grid, Stack } from "@mui/material";
import { TasksForm } from "./tasksForm/TasksForm";
import { ErrorSnackbar } from "../../shared/ErrorSnackbar";


export function TaskScreen(){
    return (
        <Stack flex={1} padding={2}>
            <Grid container>
                <Grid item xs={6}><TasksForm/></Grid>
                <Grid item xs={6}></Grid>
            </Grid>
            <ErrorSnackbar/>
        </Stack>
    )
}