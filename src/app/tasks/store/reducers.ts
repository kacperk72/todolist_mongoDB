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
    }))
    );