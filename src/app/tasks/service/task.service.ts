import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {v4 as uuid} from "uuid";

export interface TaskElement {
  id: string;
  title: string;
  status: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private httpClient: HttpClient) { }

  getTasks(): Observable<TaskElement[]>{
    return this.httpClient.get<TaskElement[]>("http://localhost:3000/tasks");
  }

  addTask(newTask: TaskElement) {
    if(newTask.id === ''){
      newTask.id = uuid();
    }
    return this.httpClient.post("http://localhost:3000/addTask", {
      id: newTask.id,
      title: newTask.title,
      status: newTask.status
    });
  }

  deleteTask(taskId: string) {
    return this.httpClient.delete(`http://localhost:3000/deleteTask/${taskId}`)
  }

  taskCheck(task: TaskElement, status: boolean) {
    return this.httpClient.patch(`http://localhost:3000/editTaskCheckbox/`, {
        id: task.id,
        status: status
    })
  }

  taskEdit(task: TaskElement, title: string ) {
    return this.httpClient.patch('http://localhost:3000/editTask', {
      id: task.id,
      title: title
    }
    )
  }

}
