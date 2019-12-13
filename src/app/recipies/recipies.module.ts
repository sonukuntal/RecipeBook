import { NgModule } from "@angular/core";
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { RecipieRouterModule } from "./recipie-router.module";
import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';

import { RecipiesComponent } from "./recipies.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";

@NgModule({
  imports: [RouterModule,RecipieRouterModule,FormsModule,ReactiveFormsModule,SharedModule],
  declarations: [
    RecipiesComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    RecipeEditComponent,
    RecipeStartComponent
  ],
  providers: []
})
export class RecipiesModule {}
