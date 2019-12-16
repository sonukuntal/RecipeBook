import { NgModule, Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { ErrorpageComponent } from "./errorpage/errorpage.component";
import { AuthComponent } from "./auth/auth.component";

const appRoutes: Routes = [
  { path: "", redirectTo: "/recipies", pathMatch: "full" }
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {}
