import { NgModule } from "@angular/core";
import {HttpClientModule} from '@angular/common/http';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { RecipiesService } from "./recipies/recipies.service";
import { ShoopingListService } from "./shooping-list/shooping-list.service";
import { ErrorpageComponent } from "./errorpage/errorpage.component";
import { DataStorageService } from "./shared/data-storage.service";
import { RecipiesResolverService } from "./recipies/recipies-resolver.service";
import { AuthComponent } from "./auth/auth.component";
import { AuthService } from "./auth/auth.service";
import { AuthGuard } from "./auth/auth.guard";

import { RecipiesModule } from "./recipies/recipies.module";
import { ShoopingModule } from "./shooping-list/shooping.module";
import {SharedModule} from './shared/shared.module';

@NgModule({
  imports: [
    RecipiesModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ShoopingModule,
    HttpClientModule,
    SharedModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    ErrorpageComponent,
    AuthComponent
  ],
  bootstrap: [AppComponent],
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
