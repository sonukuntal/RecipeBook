import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { ShoopingListComponent } from "./shooping-list.component";
import { ShoopingEditComponent } from "./shooping-edit/shooping-edit.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: "",
        component: ShoopingListComponent,
        children: [{ path: ":id/:edit", component: ShoopingEditComponent }]
      }
    ])
  ],
  exports: [ShoopingListComponent, ShoopingEditComponent],
  declarations: [ShoopingListComponent, ShoopingEditComponent]
})
export class ShoopingModule {}
