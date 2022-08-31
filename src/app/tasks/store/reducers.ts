import { state } from "@angular/animations";
import { createReducer, on } from "@ngrx/store";
import { TaskStateInterface } from "../types/taskState.interface";
import * as TaskActions from './actions'

export const initialState: TaskStateInterface = {
    isLoading: false,
    tasks: [],
    error: null
}

export const reducers = createReducer(initialState,
    on(TaskActions.getTasks, (state) => ({...state, isLoading: true})),
    on(TaskActions.getTasksSuccess, (state, action) => ({
        ...state,
        isLoading: false,
        tasks: action.tasks
    })),
    on(TaskActions.getTasksFailure, (state, action) => ({
        ...state,
        isLoading: false,
        erorr: action.error
    })),
    on(TaskActions.addTask, (state, action) => ({
        ...state,
        tasks: [...state.tasks, action.task]
    })),
    on(TaskActions.deleteTask, (state, action) => ({
        ...state,
        tasks: [...state.tasks.filter(task => task.id !== action.task.id)]
    })),
    on(TaskActions.editTask, (state, action) => ({
        ...state,
        tasks: [...state.tasks.filter(task => task.id !== action.task.id), action.task]
    }))
    );