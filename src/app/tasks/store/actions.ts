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

export const addTask = createAction(
    '[Tasks] Add Task',
    props<{ task: TaskInterface }>()     
);
export const addTaskSuccess = createAction(
    '[Tasks] Add Task Success',
    props<{ task: TaskInterface }>()
);
export const deleteTask = createAction(
    '[Tasks] Delete Task',
    props<{ task: TaskInterface }>()     
);
export const deleteTaskSuccess = createAction(
    '[Tasks] Add Task Success',
    props<{ task: TaskInterface }>()
);
