import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  OnDestroy
} from "@angular/core";
import { ingredient } from "../../shared/ingredient.model";
import { ShoopingListService } from "../shooping-list.service";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import * as shoopinglistaction from '../Store/shooping-list.actions';

@Component({
  selector: "app-shooping-edit",
  templateUrl: "./shooping-edit.component.html",
  styleUrls: ["./shooping-edit.component.css"]
})
export class ShoopingEditComponent implements OnInit, OnDestroy {
  @ViewChild("f", { static: true }) editform: NgForm;
  subsc: Subscription;
  edititem = false;
  editindex: number;
  edititemform: ingredient;

  constructor(
    private shoopingListService: ShoopingListService,
    private store: Store<{ shoopinglist: { ingredients: ingredient[] } }>
  ) {}

  ngOnInit() {
    this.subsc = this.shoopingListService.editingredient.subscribe(
      (index: number) => {
        this.editindex = index;
        this.edititem = true;
        this.edititemform = this.shoopingListService.getingredientbyid(index);
        this.editform.setValue({
          name: this.edititemform.name,
          amount: this.edititemform.amount
        });
      }
    );
  }

  onsubmitIngredients(form: NgForm) {
    const values = form.value;
    if (this.edititem) {
      this.shoopingListService.updateingredients(
        this.editindex,
        new ingredient(values.name, values.amount)
      );
    } else {
     // this.shoopingListService.addnewingredient(
     //   new ingredient(values.name, values.amount)
     // );
     this.store.dispatch(new shoopinglistaction.AddIngredient(new ingredient(values.name, values.amount)));
    }
    this.edititem = false;
    form.reset();
  }

  ondelete(form: NgForm) {
    this.shoopingListService.deleteingredients(this.editindex);
    form.reset();
    this.edititem = false;
  }

  onclickclear() {
    this.editform.reset();
    this.edititem = false;
  }

  ngOnDestroy() {
    this.subsc.unsubscribe();
  }
}
