import { Component, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Subscription } from 'rxjs';
import { TaskService } from './service/task.service';

export interface TaskElement {
  id: string;
  title: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'to-do-list-app';
  isHiddenAddForm = true;
  isHiddenEditForm = true;
  listOfTasks: TaskElement[] = [];
  listOfDoneTasks: boolean[] = [];
  progress = 0;
  newTaskValue = '';
  newTask: TaskElement = {
    id: '',
    title: ''
  };
  taskEdit: TaskElement = {
    id: '',
    title: ''
  };
  tasksArrayDB: any;
  tasksArray: any;

  private subGetTasks$!: Subscription;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
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
    this.taskService.addTask(this.newTask)
    // this.listOfTasks.push(this.newTask);
    event.target.task.value = " "; 
    this.isHiddenAddForm = true;
  }

  deleteTask(task: TaskElement, event: any): void {
    const index = this.listOfTasks.indexOf(task);
    this.listOfDoneTasks.splice(index,1);
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
    this.listOfTasks[index].title = event.target.task.value;
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
