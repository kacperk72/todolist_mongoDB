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
export const getProgress = createAction('[Tasks] Get Progress')
export const getProgressSuccess = createAction(
    '[Tasks] Get Progress success',
    props<{ amountOfTasks: number, progress: number }>()
);
export const getProgressFailure = createAction(
    '[Tasks] Get Progress failure',
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
export const addTaskFailure = createAction(
    '[Tasks] Add Task Failure',
    props<{error: string}>()
);
export const deleteTask = createAction(
    '[Tasks] Delete Task',
    props<{ task: TaskInterface }>()     
);
export const deleteTaskSuccess = createAction(
    '[Tasks] Delete Task Success',
    props<{ task: TaskInterface }>()
);
export const deleteTaskFailure = createAction(
    '[Tasks] Delete Task Failure',
    props<{error: string}>()
);
export const editTask = createAction(
    '[Tasks] Edit Task',
    props<{ task: TaskInterface }>()     
);
export const editTaskSuccess = createAction(
    '[Tasks] Edit Task Success',
    props<{ task: TaskInterface }>()
);
export const editTaskFailure = createAction(
    '[Tasks] Edit Task Failure',
    props<{error: string}>()
);
