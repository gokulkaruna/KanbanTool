import { Injectable } from '@angular/core';
import { KanbanURL } from '../models/spring.url';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Task } from '../models/task.model';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  url: string = KanbanURL.URL + "task/"

  constructor(private h: HttpClient, private route: Router) { }

  addTask(task: Task, projectId: string, devId: string): Observable<any> {
    return this.h.post(this.url + "add/" + projectId + "/" + devId, task);
  }

  updateTask(task: Task, projectId: string, devId: string): Observable<any> {
    return this.h.put(this.url + "update/" + projectId + "/" + devId, task);
  }



  viewAllTasks(projectId: string): Observable<any> {
    return this.h.get(this.url + "viewall/" + projectId);
  }

  viewTodoTasks(projectId: string): Observable<any> {
    return this.h.get(this.url + "viewtodo/" + projectId);
  }

  viewInprogTasks(projectId: string): Observable<any> {
    return this.h.get(this.url + "viewinprog/" + projectId);
  }

  viewDoneTasks(projectId: string): Observable<any> {
    return this.h.get(this.url + "viewdone/" + projectId);
  }

  viewTaskProject(projectId: string): Observable<any> {
    return this.h.get(this.url + "viewtaskproject/" + projectId);
  }

  deleteTask(taskId: string): Observable<any> {
    return this.h.delete(this.url + "delete/" + taskId);

  }


}
