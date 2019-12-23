import { NgModule } from "@angular/core";
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {StoreModule} from '@ngrx/store';

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { ErrorpageComponent } from "./errorpage/errorpage.component";
import {SharedModule} from './shared/shared.module';
import {CoreModule} from './core.module';
import {ShoopingListReducer} from './shooping-list/Store/shooping-list.reducer';



@NgModule({
  imports: [
    HttpClientModule,
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    CoreModule,
    StoreModule.forRoot({shoopinglist:ShoopingListReducer})
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
