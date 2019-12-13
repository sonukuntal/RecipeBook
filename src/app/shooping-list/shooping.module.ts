import {NgModule} from '@angular/core';
import { BrowserModule } from "@angular/platform-browser";
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import { ShoopingListComponent } from "./shooping-list.component";
import { ShoopingEditComponent } from "./shooping-edit/shooping-edit.component";



@NgModule({
  imports:[BrowserModule,FormsModule,RouterModule.forChild([{
    path: "shoopinglist",
    component: ShoopingListComponent,
    children: [{ path: ":id/:edit", component: ShoopingEditComponent }]
  }])],
  exports:[ShoopingListComponent,ShoopingEditComponent],
  declarations:[ShoopingListComponent,ShoopingEditComponent]
})
export class ShoopingModule
{

}