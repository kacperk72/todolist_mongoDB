import { Injectable } from '@angular/core';
import { Observable, delay } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface TaskElement {
  id: string;
  title: string;
  status: boolean;
}

export interface ProgressElement {
  progress: number;
  amountOfTasks: number;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private httpClient: HttpClient) { }

  getTasks(): Observable<TaskElement[]>{
    // return this.httpClient.get<TaskElement[]>("http://localhost:3000/tasks").pipe(delay(1000));
    return this.httpClient.get<TaskElement[]>("http://localhost:3000/tasks");
  }

  getProgress(): Observable<ProgressElement> {
    return this.httpClient.get<ProgressElement>("http://localhost:3000/progress")
  }

  addTask(newTask: TaskElement) {
    return this.httpClient.post("http://localhost:3000/addTask", {
      id: newTask.id,
      title: newTask.title,
      status: newTask.status
    });
  }

  deleteTask(task: TaskElement) {
    const taskId = task.id;
    return this.httpClient.delete(`http://localhost:3000/deleteTask/${taskId}`)
  }

  taskCheck(task: TaskElement, status: boolean) {
    return this.httpClient.patch(`http://localhost:3000/editTaskCheckbox/`, {
        id: task.id,
        status: status
    })
  }

  taskEdit(task: TaskElement) {
    return this.httpClient.patch('http://localhost:3000/editTask', {
      id: task.id,
      title: task.title
    }
    )
  }

}
