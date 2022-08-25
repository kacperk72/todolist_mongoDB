import { createAction, props } from "@ngrx/store";
import { TaskInterface } from "../types/task.interface"

export const getTasks = createAction('[Tasks] Get Tasks')
export const getTasksSuccess = createAction(
    '[Tasks] Get Tasks success',
    props<{ tasks: TaskInterface[] }>()
    );
export const getTasksFailure = createAction(
    '[Tasks] Get Tasks failure',
    props<{error: string}>()
    );