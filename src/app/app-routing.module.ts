import { NgModule, Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { RecipiesComponent } from "./recipies/recipies.component";
import { RecipeListComponent } from "./recipies/recipe-list/recipe-list.component";
import { ShoopingListComponent } from "./shooping-list/shooping-list.component";
import { RecipeItemComponent } from "./recipies/recipe-list/recipe-item/recipe-item.component";
import { ShoopingEditComponent } from "./shooping-list/shooping-edit/shooping-edit.component";
import { HeaderComponent } from "./header/header.component";
import { RecipeDetailComponent } from "./recipies/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipies/recipe-edit/recipe-edit.component";
import { ErrorpageComponent } from "./errorpage/errorpage.component";
import { RecipeStartComponent } from "./recipies/recipe-start/recipe-start.component";
import { RecipiesResolverService } from "./recipies/recipies-resolver.service";
import { AuthComponent } from "./auth/auth.component";
import {AuthGuard} from './auth/auth.guard';

const appRoutes: Routes = [
  { path: "", redirectTo: "/recipies", pathMatch: "full" },
  {
    path: "recipies",
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
  },
  { path: "auth", component: AuthComponent },
  {
    path: "shoopinglist",
    component: ShoopingListComponent,
    children: [{ path: ":id/:edit", component: ShoopingEditComponent }]
  },
  { path: "not-found", component: ErrorpageComponent },
  { path: "**", redirectTo: "/not-found", pathMatch: "full" }
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {}
