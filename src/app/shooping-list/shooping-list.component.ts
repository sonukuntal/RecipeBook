import { Component, OnInit, OnDestroy } from "@angular/core";
import { ingredient } from "../shared/ingredient.model";
import { ShoopingListService } from "./shooping-list.service";
import { LoggingService } from "../logging.service";
import { Subscription,Observable } from "rxjs";
import { Store } from "@ngrx/store";
import * as fromshoopingList from './Store/shooping-list.reducer';

@Component({
  selector: "app-shooping-list",
  templateUrl: "./shooping-list.component.html",
  styleUrls: ["./shooping-list.component.css"]
})
export class ShoopingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ingredients:ingredient[]}>;
 // unsubsing: Subscription;
  constructor(
    private shoopingListService: ShoopingListService,
    private loggingService: LoggingService,
    private store:Store<fromshoopingList.AppState>
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
    this.shoopingListService.editingredient.next(index);
  }
}
