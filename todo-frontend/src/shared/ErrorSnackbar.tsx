import { Alert, Snackbar } from "@mui/material";
import { useTaskStore } from "../feature/tasks/useTaskStore";

export function ErrorSnackbar(){
    const error = useTaskStore((state)=>state.error);
    return (
        <Snackbar
        open={!!error?.length}
        autoHideDuration={1000}>
            <Alert severity="error">{error}</Alert>
        </Snackbar>
    )
}