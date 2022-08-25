import { Component, OnInit } from '@angular/core';
import { TaskElement, TaskService } from '../service/task.service';
import { Observable, Subscription } from 'rxjs';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { select, Store } from '@ngrx/store';
import { errorSelector, isLoadingSelector, taskSelector } from '../store/selectors';
import { AppStateInterface } from '../types/appState.interface';

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
  newTask: TaskElement = {
    id: '',
    title: '',
    status: false,
  };
  taskEdit: TaskElement = {
    id: '',
    title: '',
    status: false
  };
  tasksArrayDB: any;
  tasksArray: any;

  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  tasks$: Observable<TaskElement[]>

  private subGetTasks$!: Subscription;

  constructor(private taskService: TaskService, private store: Store<AppStateInterface>) {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.error$ = this.store.pipe(select(errorSelector))
    this.tasks$ = this.store.pipe(select(taskSelector))
  }

  ngOnInit() {
    // this.store.dispatch(TasksActions.getTasks());
    this.getTasks();
    for(let i=0; i<this.listOfTasks.length; i++){
      this.listOfDoneTasks[i] = false;
    }
  }

  getTasks(){
    this.subGetTasks$ = this.taskService.getTasks().subscribe((tasksDB: Object) => {
      this.tasksArrayDB = tasksDB;
      this.tasksArray = this.tasksArrayDB.trips;

      this.tasksArray.forEach((el: TaskElement) => {
        this.listOfTasks.push(el);
      })
    })
  }

  setVisibleForm() {
    this.isHiddenAddForm = !this.isHiddenAddForm
  }

  addTask(event: any): void{
    this.newTaskValue = event.target.task.value;
    this.newTask.title = this.newTaskValue;
    this.newTask.id = '';
    this.newTask.status = false;
    this.taskService.addTask(this.newTask).subscribe((res => {
      // console.log(res);
      this.listOfTasks.push(this.newTask);
    }))
    this.isHiddenAddForm = true;
    this.getTasks();
    this.listOfTasks = [];
    event.target.task.value = " ";
  }

  deleteTask(task: TaskElement, event: any): void {
    const index = this.listOfTasks.indexOf(task);
    this.listOfDoneTasks.splice(index,1);
    this.taskService.deleteTask(task.id).subscribe(res => {
      // console.log(res);
    });
    this.listOfTasks = this.listOfTasks.filter(el => el.id !== task.id);
    this.checkProgress();
  }

  editTask(task: TaskElement): void {
    this.taskEdit = task;
    if(this.isHiddenEditForm == true){
      this.isHiddenEditForm=false;
    }
  }

  saveEditedTask(event: any):void {
    const index = this.listOfTasks.indexOf(this.taskEdit);
    console.log(this.taskEdit);
    console.log(this.listOfTasks);
    
    
    const newTitle = event.target.task.value;
    this.listOfTasks[index].title = newTitle;
    this.taskService.taskEdit(this.taskEdit, newTitle).subscribe(res => {
      // console.log(res);
    });
    this.isHiddenEditForm = true;
  }

  checkboxChange(event: MatCheckboxChange, task: TaskElement): void {
    const index = this.listOfTasks.indexOf(task);
      if(event.checked === true){
          this.listOfDoneTasks[index] = true;
      }
      if(event.checked === false){
        this.listOfDoneTasks[index] = false;
      }
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

