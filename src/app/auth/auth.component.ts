import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Observable } from "rxjs";
import {Router} from '@angular/router';

import { AuthService, AuthServiceData } from "./auth.service";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"]
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService,private router:Router) {}

  ngOnInit() {}
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmitForm(authform: NgForm) {
    const email = authform.value.email;
    const pass = authform.value.password;
    this.isLoading = true;
    let authobs: Observable<AuthServiceData>;

    if (this.isLoginMode) {
      authobs = this.authService.login(email, pass);
    } else {
      authobs = this.authService.signup(email, pass);
      authform.reset();
    }
    authobs.subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['recipies']);
      },
      errorMsg => {
        this.error = errorMsg;
        this.isLoading = false;
      }
    );
  }
}
