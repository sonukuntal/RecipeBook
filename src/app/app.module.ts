import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";
import { ShoopingListComponent } from "./shooping-list/shooping-list.component";
import { ShoopingEditComponent } from "./shooping-list/shooping-edit/shooping-edit.component";
import { HeaderComponent } from "./header/header.component";
import { DropdownDirective } from "./shared/dropdown.model";
import { RecipiesService } from "./recipies/recipies.service";
import { ShoopingListService } from "./shooping-list/shooping-list.service";
import { ErrorpageComponent } from "./errorpage/errorpage.component";
import { DataStorageService } from "./shared/data-storage.service";
import { RecipiesResolverService } from "./recipies/recipies-resolver.service";
import { AuthComponent } from "./auth/auth.component";
import { AuthService } from "./auth/auth.service";
import { LoadingSpinnerComponent } from "./shared/loading-spinner/loading-spinner.component";
import { AuthGuard } from "./auth/auth.guard";
import { AlertComponent } from "./shared/alert/alert.component";
import { PlaceholderDirective } from "./shared/placeholder.directive";
import {RecipiesModule} from './recipies/recipies.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RecipiesModule
  ],
  declarations: [
    AppComponent,
    ShoopingListComponent,
    ShoopingEditComponent,
    HeaderComponent,
    DropdownDirective,
    ErrorpageComponent,
    AuthComponent,
    LoadingSpinnerComponent,
    AlertComponent,
    PlaceholderDirective
  ],
  bootstrap: [AppComponent],
  entryComponents: [AlertComponent],
  providers: [
    ShoopingListService,
    RecipiesService,
    DataStorageService,
    RecipiesResolverService,
    AuthService,
    AuthGuard
  ]
})
export class AppModule {}
