import {
  Component,
  OnInit,
  ComponentFactoryResolver,
  ViewChild,
  OnDestroy
} from "@angular/core";
import { NgForm } from "@angular/forms";
import {Subscription } from "rxjs";
import { Store } from "@ngrx/store";

import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDirective } from "../shared/placeholder.directive";
import * as fromApp from "../store/app.reducer";
import * as fromauthActions from "./auth.action";

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
    private cofaResolver: ComponentFactoryResolver,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.sub = this.store.select("auth").subscribe(authstate => {
      this.isLoading = authstate.loading;
      this.error = authstate.authError;
      if (this.error) {
        this.showErrorAlert(this.error);
      }
    });
  }
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmitForm(authform: NgForm) {
    debugger;
    const email = authform.value.email;
    const pass = authform.value.password;

    if (this.isLoginMode) {
      // authobs = this.authService.login(email, pass);
      this.store.dispatch(
        new fromauthActions.LoginStart({ email: email, password: pass })
      );
    } else {
      // authobs = this.authService.signup(email, pass);
      this.store.dispatch(
        new fromauthActions.SignupStart({ email: email, password: pass })
      );
      authform.reset();
    }
  }

  onhandleerror() {
    this.store.dispatch(new fromauthActions.ClearError());
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
