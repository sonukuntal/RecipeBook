import {NgModule} from '@angular/core';
import { AuthComponent } from './auth.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule } from "@angular/router";
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations:[AuthComponent],
  imports:[
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    SharedModule,
    RouterModule.forChild( [{ path: "auth", component: AuthComponent }])
  ]
})
export class AuthModule
{

}