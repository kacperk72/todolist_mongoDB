import { Component, OnInit } from '@angular/core';
import { TaskElement, TaskService } from '../service/task.service';
import { Observable, Subscription } from 'rxjs';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { select, Store } from '@ngrx/store';
import { errorSelector, isLoadingSelector, taskSelector } from '../store/selectors';
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
  listOfTasks: TaskElement[] = [];
  listOfDoneTasks: boolean[] = [];
  progress = 0;
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

  constructor(private taskService: TaskService, private store: Store<AppStateInterface>) { }

  ngOnInit() {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.error$ = this.store.pipe(select(errorSelector))
    this.tasks$ = this.store.pipe(select(taskSelector))

    this.store.dispatch(TasksActions.getTasks());
  }

  // getTasks(){
  //    this.taskService.getTasks().subscribe((tasksDB: TaskElement[]) => {
  //     // console.log(tasksDB);
  //     this.tasksArray = tasksDB

  //     this.tasksArray.forEach((el: TaskElement) => {
  //       this.listOfTasks.push(el);
  //     })
  //   })
  // }

  setVisibleForm() {
    this.isHiddenAddForm = !this.isHiddenAddForm
  }

  // addTask(event: any): void{
  //   this.newTaskValue = event.target.task.value;
  //   const newTask: TaskElement = {title: this.newTaskValue, id: "", status: false}
  //   this.taskService.addTask(newTask).subscribe((res => {
  //     // console.log(res);
  //     this.listOfTasks.push(newTask);
  //   }))
  //   this.isHiddenAddForm = true;
  //   this.getTasks();
  //   this.listOfTasks = [];
  //   event.target.task.value = " ";
  // }

    addTask(event: any){
      this.newTaskValue = event.target.task.value;
      const task: TaskInterface = {title: this.newTaskValue, id: uuid(), status: false}
      this.store.dispatch(TasksActions.addTask({task}));
      this.isHiddenAddForm = true;
      event.target.task.value = " ";

    }

    deleteTask(task: TaskElement, event: any): void {
      this.store.dispatch(TasksActions.deleteTask({task}));
      
      
      // const index = this.listOfTasks.indexOf(task);
      // this.listOfDoneTasks.splice(index,1);
      // this.taskService.deleteTask(task.id).subscribe(res => {
      //   // console.log(res);
      // });
      // this.listOfTasks = this.listOfTasks.filter(el => el.id !== task.id);
      // this.checkProgress();
    }

    editTask(task: TaskElement): void {
      this.taskEdit = task;
      if(!!this.isHiddenEditForm){
        this.isHiddenEditForm=false;
      }
    }

    saveEditedTask(event: any):void {
      const index = this.listOfTasks.indexOf(this.taskEdit);
      const newTitle = event.target.task.value;
      this.listOfTasks[index].title = newTitle;
      this.taskService.taskEdit(this.taskEdit, newTitle).subscribe(res => {
        // console.log(res);
      });
      this.isHiddenEditForm = true;
    }

    checkboxChange(event: MatCheckboxChange, task: TaskElement): void {
      const index = this.listOfTasks.indexOf(task);
      this.listOfDoneTasks[index] = event.checked;
        this.taskService.taskCheck(task, event.checked).subscribe(res => {
          // console.log(res);
        });
        this.checkProgress();
    }

    checkProgress() {
      this.progress = 0;
      this.listOfDoneTasks.forEach(el => {
        if(el === true){
          this.progress++;
        }
      })
    }

}

