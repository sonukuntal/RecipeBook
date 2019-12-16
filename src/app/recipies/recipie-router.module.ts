import {NgModule} from '@angular/core';
import {Routes,RouterModule} from '@angular/router';

import {AuthGuard} from '../auth/auth.guard';
import { RecipiesComponent } from "./recipies.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipiesResolverService } from "./recipies-resolver.service";

const routes:Routes=[
  {
    path: "",
    component: RecipiesComponent,
    canActivate:[AuthGuard],
    children: [
      { path: "", component: RecipeStartComponent },
      { path: "new", component: RecipeEditComponent },
      {
        path: ":id",
        component: RecipeDetailComponent,
        resolve: [RecipiesResolverService]
      },
      {
        path: ":id/edit",
        component: RecipeEditComponent,
        resolve: [RecipiesResolverService]
      },
      {
        path: ":list",
        component: RecipeListComponent,
        children: [{ path: ":id/:item", component: RecipeItemComponent }]
      }
    ]
  }
];

@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class RecipieRouterModule
{

}