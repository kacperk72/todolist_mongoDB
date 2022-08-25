import { Injectable } from "@angular/core";
import { catchError, map, mergeMap, of } from "rxjs";
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
                    of(TaskActions.getTasksFailure({ error: error. message }))
                )
            );
        })
    ));

    constructor(private actions$: Actions, private taskService: TaskService) {}
}