import { Component, OnInit } from '@angular/core';
import { TaskElement, TaskService } from '../service/task.service';
import { map, Observable, Subscription } from 'rxjs';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { select, Store } from '@ngrx/store';
import { amountOfTasksSelector, errorSelector, isLoadingSelector, progressSelector, taskSelector } from '../store/selectors';
import { AppStateInterface } from '../types/appState.interface';
import * as TasksActions from '../store/actions';
import { TaskInterface } from '../types/task.interface';
import {v4 as uuid} from "uuid";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})

export class TasksComponent implements OnInit {
  title = 'to-do-list-app';
  isHiddenAddForm = true;
  isHiddenEditForm = true;
  newTaskValue = '';
  taskEdit: TaskElement = {
    id: '',
    title: '',
    status: false
  };
  tasksArrayDB: any;
  tasksArray: any;

  isLoading$!: Observable<boolean>;
  error$!: Observable<string | null>;
  tasks$!: Observable<TaskInterface[]>
  progress$!: Observable<number>;
  amountOfTasks$!: Observable<number>;

  constructor(private taskService: TaskService, private store: Store<AppStateInterface>) { }

  ngOnInit() {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.error$ = this.store.pipe(select(errorSelector))
    this.tasks$ = this.store.pipe(select(taskSelector))
    this.progress$ = this.store.pipe(select(progressSelector))
    this.amountOfTasks$ = this.store.pipe(select(amountOfTasksSelector))

    this.store.dispatch(TasksActions.getTasks());
    this.store.dispatch(TasksActions.getProgress());
  }

  setVisibleForm() {
    this.isHiddenAddForm = !this.isHiddenAddForm
  }

  addTask(event: any){
      this.newTaskValue = event.target.task.value;
      const task: TaskInterface = {title: this.newTaskValue, id: uuid(), status: false}
      this.store.dispatch(TasksActions.addTask({task}));
      this.isHiddenAddForm = true;
      event.target.task.value = " ";
      this.store.dispatch(TasksActions.getProgress());

    }

    deleteTask(task: TaskElement) {
      this.store.dispatch(TasksActions.deleteTask({task}));
      this.store.dispatch(TasksActions.getProgress());

    }

    editTask(task: TaskElement): void {
      this.taskEdit = task;
      if(!!this.isHiddenEditForm){
        this.isHiddenEditForm=false;
      }
    }

    saveEditedTask(event: any):void {
      const task: TaskElement ={
        id: this.taskEdit.id,
        title: event.target.task.value,
        status: this.taskEdit.status
      }
      this.store.dispatch(TasksActions.editTask({task}));
      this.isHiddenEditForm = true;
    }

    checkboxChange(event: MatCheckboxChange, task: TaskElement): void {
        this.taskService.taskCheck(task, event.checked).subscribe(res => {
          // console.log(res);
        });
        this.store.dispatch(TasksActions.getProgress());

    }

    

}

