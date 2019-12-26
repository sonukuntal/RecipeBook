import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { StoreModule } from "@ngrx/store";
import {EffectsModule} from '@ngrx/effects';

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { ErrorpageComponent } from "./errorpage/errorpage.component";
import { SharedModule } from "./shared/shared.module";
import { CoreModule } from "./core.module";
import * as authReducer from "./store/app.reducer";
import {AuthEffects} from './auth/auth.effects';

@NgModule({
  imports: [
    HttpClientModule,
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    CoreModule,
    StoreModule.forRoot(authReducer.AppReducer),
    EffectsModule.forRoot(AuthEffects)
  ],
  declarations: [AppComponent, HeaderComponent, ErrorpageComponent],
  bootstrap: [AppComponent],
  providers: []
})
export class AppModule {}
