import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  OnDestroy
} from "@angular/core";
import { ingredient } from "../../shared/ingredient.model";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import * as shoopinglistaction from "../Store/shooping-list.actions";
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: "app-shooping-edit",
  templateUrl: "./shooping-edit.component.html",
  styleUrls: ["./shooping-edit.component.css"]
})
export class ShoopingEditComponent implements OnInit, OnDestroy {
  @ViewChild("f", { static: true }) editform: NgForm;
  subsc: Subscription;
  edititem = false;
  edititemform: ingredient;

  constructor(
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.subsc = this.store.select("shoopinglist").subscribe(stateData => {
      if (stateData.editIngredientIndex > -1) {
        this.edititem = true;
        this.edititemform = stateData.editIngredient;
        this.editform.setValue({
          name: this.edititemform.name,
          amount: this.edititemform.amount
        });
      } else {
        this.edititem = false;
      }
    });
    // this.subsc = this.shoopingListService.editingredient.subscribe(
    //   (index: number) => {
    //     this.editindex = index;
    //    this.edititem = true;
    //    this.edititemform = this.shoopingListService.getingredientbyid(index);
    //     this.editform.setValue({
    //       name: this.edititemform.name,
    //       amount: this.edititemform.amount
    //     });
    //   }
    // );
  }

  onsubmitIngredients(form: NgForm) {
    const values = form.value;
    if (this.edititem) {
      // this.shoopingListService.updateingredients(

      this.store.dispatch(
        new shoopinglistaction.UpdateIngredient(
          new ingredient(values.name, values.amount)
        )
      );

      //  );
    } else {
      // this.shoopingListService.addnewingredient(
      //   new ingredient(values.name, values.amount)
      // );
      this.store.dispatch(
        new shoopinglistaction.AddIngredient(
          new ingredient(values.name, values.amount)
        )
      );
    }
    this.edititem = false;
    form.reset();
  }

  ondelete(form: NgForm) {
    // this.shoopingListService.deleteingredients(this.editindex);
    this.store.dispatch(
      new shoopinglistaction.DeleteIngredient()
    );
    form.reset();
    this.edititem = false;
  }

  onclickclear() {
    this.editform.reset();
    this.edititem = false;
    this.store.dispatch(new shoopinglistaction.StopEdit());
  }

  ngOnDestroy() {
    this.subsc.unsubscribe();
    this.store.dispatch(new shoopinglistaction.StopEdit());
  }
}
