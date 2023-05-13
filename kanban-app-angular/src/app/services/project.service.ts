import { Injectable } from '@angular/core';
import { KanbanURL } from '../models/spring.url';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private h: HttpClient, private route: Router) { }

  url: string = KanbanURL.URL + "project/"

  addProject(project: Project): Observable<any> {
    return this.h.post(this.url + "add", project);
  }

  getProjectList(): Observable<any> {
    return this.h.get(this.url + "viewall");
  }



}
