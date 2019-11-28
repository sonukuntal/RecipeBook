import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

import { AuthService } from "./auth.service";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"]
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {}
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmitForm(authform: NgForm) {
    if (this.isLoginMode) {
    } else {
      const email = authform.value.email;
      const pass = authform.value.password;
      this.isLoading = true;
      this.authService.signup(email, pass).subscribe(
        resData => {
          this.isLoading = false;
        },
        errorMsg => {
          this.error = errorMsg;
          this.isLoading = false;
        }
      );
      authform.reset();
    }
  }
}
