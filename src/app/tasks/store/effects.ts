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
                tap(tasks => console.log(tasks)),
                map((tasks) => TaskActions.getTasksSuccess({ tasks })),
                catchError((error) => 
                    of(TaskActions.getTasksFailure({ error: error. message }))
                )
            );
        })
    ));

    addTask$ = createEffect(() => this.actions$.pipe(
        ofType(TaskActions.addTask),
        mergeMap(action => {
            return this.taskService.addTask(action.task)
        })
    ), {dispatch: false})

    deleteTask$ = createEffect(() => this.actions$.pipe(
        ofType(TaskActions.deleteTask),
        mergeMap(action => {
            return this.taskService.deleteTask(action.task)
        })
    ), {dispatch: false})
    
    constructor(private actions$: Actions, private taskService: TaskService) {}
}