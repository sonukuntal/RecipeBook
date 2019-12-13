import {
  Component,
  OnInit,
  ComponentFactoryResolver,
  ViewChild,
  OnDestroy
} from "@angular/core";
import { NgForm } from "@angular/forms";
import { Observable, Subscription } from "rxjs";
import { Router } from "@angular/router";

import { AuthService, AuthServiceData } from "./auth.service";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDirective } from "../shared/placeholder.directive";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"]
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  @ViewChild(PlaceholderDirective, { static: false })
  alertHost: PlaceholderDirective;
  private sub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cofaResolver: ComponentFactoryResolver
  ) {}

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
        this.router.navigate(['/recipies']);
      },
      errorMsg => {
        this.error = errorMsg;
        this.showErrorAlert(errorMsg);
        this.isLoading = false;
      }
    );
  }

  onhandleerror() {
    this.error = null;
  }

  private showErrorAlert(message: string) {
    const alertcmpFactory = this.cofaResolver.resolveComponentFactory(
      AlertComponent
    );
    const hostviewconatinerref = this.alertHost.viewcontainerref;
    hostviewconatinerref.clear();
    const componentRef = hostviewconatinerref.createComponent(alertcmpFactory);
    componentRef.instance.message = message;
    this.sub = componentRef.instance.close.subscribe(() => {
      this.sub.unsubscribe();
      hostviewconatinerref.clear();
    });
  }
  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
