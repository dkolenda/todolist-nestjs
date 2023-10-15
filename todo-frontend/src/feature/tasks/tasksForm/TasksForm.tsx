import { Button, Card, TextField } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { useTaskStore } from "../useTaskStore";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

enum FIELDS {
    TASK_NAME= 'taskName'
}

const validationSchema = yup.object({
    [FIELDS.TASK_NAME]: yup.string().max(250).required("Required"),
});

export function TasksForm(){
    const methods  = useForm({
        defaultValues: {
            [FIELDS.TASK_NAME]: ""
        },
        resolver: yupResolver(validationSchema),
    })
    const {handleSubmit, register, reset, formState:{errors}} = methods;

    const createTask = useTaskStore((state)=>state.createTask);
    const isFetching = useTaskStore((state)=>state.isFetching);

    const onSubmit = async (data: {[FIELDS.TASK_NAME]:string}) => {
        await createTask(data[FIELDS.TASK_NAME]);
        reset();
    };

    return (
        <Card>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField 
                    label="Task Name" 
                    variant="outlined" 
                    error={!!errors[FIELDS.TASK_NAME]}
                    helperText={errors[FIELDS.TASK_NAME]?.message}
                    {...register(FIELDS.TASK_NAME)} sx={{ paddingBottom:1}} />

                    <Button type="submit" disabled={isFetching}>Add Task</Button>
                </form>
            </FormProvider>
        </Card>
    )
}