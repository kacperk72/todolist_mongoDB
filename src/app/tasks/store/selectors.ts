import { createSelector } from "@ngrx/store";
import { AppStateInterface } from "../types/appState.interface";

export const selectFeature = (state: AppStateInterface) => state.tasks;

export const isLoadingSelector = createSelector(
    selectFeature,
    (state) => state.isLoading
);

export const taskSelector = createSelector(
    selectFeature,
    (state) => state.tasks
);

export const errorSelector = createSelector(
    selectFeature,
    (state) => state.error
);

export const progressSelector = createSelector(
    selectFeature,
    (state) => state.progress
);

export const amountOfTasksSelector = createSelector(
    selectFeature,
    (state) => state.amountOfTasks
);