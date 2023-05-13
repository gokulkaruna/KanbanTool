import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private loginService: LoginService, private route: Router) { }

  ngOnInit(): void {
    this.loginform = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', Validators.required)
    });
  }


  loginform: FormGroup;

  user: User = new User();
  msg: string = "";

  err: boolean = false;


  // loginUser(): void {
  //   this.loginService.loginUser(this.user).subscribe((u) => {
  //     this.user = u;
  //     console.log(u);
  //   },
  //     (error: Response) => {
  //       this.msg = "Invalid password/Email";
  //       this.err = true;
  //     });



  loginUser(): void {
    this.loginService.loginUser(this.user).subscribe({
      next: (v) => {
        this.user = v;
        console.log(v);

        sessionStorage.setItem("userId", this.user.userId);
        sessionStorage.setItem("userType", this.user.userType);
        sessionStorage.setItem("userName", this.user.name);
        sessionStorage.setItem("userEmail", this.user.email);
        this.route.navigate(['/landing'])
        // setTimeout(() => {location.reload();}, 1000);
        // if(this.login.userType.localeCompare("Customer") == 0){
        //   this.route.navigate(['/customer']);
        // }else{
        //   this.route.navigate(['/restaurant']);
        // }     
      },
      error: (e) => {
        this.msg = "Invalid password/Email";
        this.err = true;
      },
      complete: () => console.info('complete')

    })


  }





}
