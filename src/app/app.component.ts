import { Component, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Subscription } from 'rxjs';
import { TaskService } from './service/task.service';

export interface TaskElement {
  id: string;
  title: string;
  status: boolean;
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
