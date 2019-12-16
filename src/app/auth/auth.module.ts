import {NgModule} from '@angular/core';
import { AuthComponent } from './auth.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {RouterModule } from "@angular/router";
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations:[AuthComponent],
  imports:[
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild( [{ path: "", component: AuthComponent }])
  ]
})
export class AuthModule
{

}