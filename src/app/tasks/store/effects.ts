import { Injectable } from "@angular/core";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { TaskService } from "../service/task.service";
import * as TaskActions from './actions';


@Injectable()
export class TaskEffects {
    getTasks$ = createEffect(() => 
    this.actions$.pipe(
        ofType(TaskActions.getTasks),
        mergeMap(() => {
            return this.taskService.getTasks().pipe(
                map((tasks) => TaskActions.getTasksSuccess({ tasks })),
                catchError((error) => 
                    of(TaskActions.getTasksFailure({ error: error.message }))
                )
            );
        })
    ));

    getProgress$ = createEffect(() => 
    this.actions$.pipe(
        ofType(TaskActions.getProgress),
        mergeMap(() => {
            return this.taskService.getProgress().pipe(
                tap(el => {
                    console.log(el);
                }),
                map((progress) => TaskActions.getProgressSuccess( {
                    amountOfTasks: progress.amountOfTasks,
                    progress: progress.progress
                } )),
                catchError((error) => 
                    of(TaskActions.getTasksFailure({ error: error.message }))
                )
            );
        })
    ));

    addTask$ = createEffect(() => 
    this.actions$.pipe(
        ofType(TaskActions.addTask),
        mergeMap(action => {
            return this.taskService.addTask(action.task).pipe(
                map(() => TaskActions.addTaskSuccess({task: action.task })),
                catchError((error) => 
                    of(TaskActions.addTaskFailure({ error: error.message }))
                )
            );
        })
    ))

    deleteTask$ = createEffect(() => 
    this.actions$.pipe(
        ofType(TaskActions.deleteTask),
        mergeMap(action => {
            return this.taskService.deleteTask(action.task).pipe(
                map(() => TaskActions.deleteTaskSuccess({task: action.task })),
                catchError((error) => 
                    of(TaskActions.deleteTaskFailure({ error: error.message }))
                )
            );
        })
    ))

    editTask$ = createEffect(() => this.actions$.pipe(
        ofType(TaskActions.editTask),
        mergeMap(action => {
            return this.taskService.taskEdit(action.task).pipe(
                map(() => TaskActions.editTaskSuccess({task: action.task })),
                catchError((error) => 
                    of(TaskActions.editTaskFailure({ error: error.message }))
                )
            );
        })
    ))
    
    constructor(private actions$: Actions, private taskService: TaskService) {}
}