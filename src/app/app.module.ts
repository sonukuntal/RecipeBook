import { NgModule } from "@angular/core";
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { ErrorpageComponent } from "./errorpage/errorpage.component";
import {SharedModule} from './shared/shared.module';
import {CoreModule} from './core.module';


@NgModule({
  imports: [
    HttpClientModule,
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    CoreModule
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    ErrorpageComponent
  ],
  bootstrap: [AppComponent],
  providers: []
})
export class AppModule {}
