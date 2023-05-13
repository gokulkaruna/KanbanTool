import { Injectable } from '@angular/core';
import { KanbanURL } from '../models/spring.url';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url: string = KanbanURL.URL + "user/"

  constructor(private h: HttpClient, private route: Router) { }

  public loginUser(user: User): Observable<any> {
    return this.h.post(this.url + "login", user);
  }

  viewAllUsers(): Observable<any> {
    return this.h.get(this.url + "viewaall");
  }

  viewDevs(): Observable<any> {
    return this.h.get(this.url + "view/devs");
  }

  public logoutUser(): void {
    sessionStorage.clear();
    this.route.navigate(['/']);
  }


}
