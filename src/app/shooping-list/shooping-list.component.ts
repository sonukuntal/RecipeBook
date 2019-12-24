import { Component, OnInit, OnDestroy } from "@angular/core";
import { ingredient } from "../shared/ingredient.model";
import { LoggingService } from "../logging.service";
import { Subscription,Observable } from "rxjs";
import { Store } from "@ngrx/store";
import * as  shoopingListAction from './Store/shooping-list.actions';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: "app-shooping-list",
  templateUrl: "./shooping-list.component.html",
  styleUrls: ["./shooping-list.component.css"]
})
export class ShoopingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ingredients:ingredient[]}>;
 // unsubsing: Subscription;
  constructor(
    private loggingService: LoggingService,
    private store:Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.ingredients =this.store.select('shoopinglist');
   // this.ingredients = this.shoopingListService.getingredients();
   // this.unsubsing = this.shoopingListService.newingredient.subscribe(
    //  (ing: ingredient[]) => {
    //    this.ingredients = ing;
    //  }
   // );

   // this.loggingService.printLog("Hello from shooping list ngoninit");
  }

  ngOnDestroy() {
   // this.unsubsing.unsubscribe();
  }

  editingredients(index: number) {
   // this.shoopingListService.editingredient.next(index);
   this.store.dispatch(new shoopingListAction.StartEdit(index));
  }
}
