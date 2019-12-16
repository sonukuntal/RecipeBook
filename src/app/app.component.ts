import { Component, OnInit } from "@angular/core";
import { AuthService } from "./auth/auth.service";
import {LoggingService} from './logging.service'

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  ngOnInit() {
    this.authService.autologin();
    this.loggingService.printLog('Hello i from appcomponent ngoninit service');
  }
  constructor(private authService: AuthService, private loggingService:LoggingService) {}
}
