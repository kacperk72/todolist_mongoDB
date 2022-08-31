import { TaskInterface } from "./task.interface";

export interface TaskStateInterface {
    isLoading: boolean;
    tasks: TaskInterface[];
    error: string | null;
    progress: number;
    amountOfTasks: number;
}