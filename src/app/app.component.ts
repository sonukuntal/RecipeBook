import { Component, OnInit } from "@angular/core";
import {Store} from '@ngrx/store';
import { AuthService } from "./auth/auth.service";
import {LoggingService} from './logging.service';
import * as fromApp from './store/app.reducer';
import * as authActions from './auth/auth.action';

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  ngOnInit() {
    //this.authService.autologin();
    this.store.dispatch(new authActions.AutoLogin())
    this.loggingService.printLog('Hello i from appcomponent ngoninit service');
  }
  constructor(private store: Store<fromApp.AppState>, private loggingService:LoggingService) {}
}
