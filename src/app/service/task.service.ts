import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {v4 as uuid} from "uuid";

export interface TaskElement {
  id: string;
  title: string;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private httpClient: HttpClient) { }

  getTasks(): Observable<Object>{
    return this.httpClient.get("http://localhost:3000/tasks");
  }

  addTask(newTask: TaskElement) {
    if(newTask.id === ''){
      newTask.id = uuid();
    }
    console.log(newTask);
    
    return this.httpClient.post("http://localhost:3000/addTask", {
      id: newTask.id,
      title: newTask.title
    });
  }
}
