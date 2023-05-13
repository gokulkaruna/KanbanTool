import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private router: Router) { }


  canActivate(): boolean {
    if (sessionStorage.getItem('userName')) {
      return true;
    }
    this.router.navigate(['/'], { queryParams: { err: 'no-user-logon' } });
    return false;
  }

}
