import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';


import {AppRoutingModule} from './app-routing.module';
import { AppComponent } from './app.component';
import { RecipiesComponent } from './recipies/recipies.component';
import { RecipeListComponent } from './recipies/recipe-list/recipe-list.component';
import { ShoopingListComponent } from './shooping-list/shooping-list.component';
import { RecipeItemComponent } from './recipies/recipe-list/recipe-item/recipe-item.component';
import { ShoopingEditComponent } from './shooping-list/shooping-edit/shooping-edit.component';
import { HeaderComponent } from './header/header.component';
import { RecipeDetailComponent } from './recipies/recipe-detail/recipe-detail.component';
import {DropdownDirective} from './shared/dropdown.model';
import { RecipiesService } from './recipies/recipies.service';
import { ShoopingListService } from './shooping-list/shooping-list.service';
import { RecipeEditComponent } from './recipies/recipe-edit/recipe-edit.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { RecipeStartComponent } from './recipies/recipe-start/recipe-start.component';
import { DataStorageService } from './shared/data-storage.service';
import { RecipiesResolverService } from './recipies/recipies-resolver.service';
import { AuthComponent } from './auth/auth.component';
import { AuthService } from './auth/auth.service';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule,AppRoutingModule,ReactiveFormsModule,HttpClientModule],
  declarations: [ AppComponent, RecipiesComponent, RecipeListComponent, ShoopingListComponent, RecipeItemComponent, ShoopingEditComponent, HeaderComponent, RecipeDetailComponent,DropdownDirective, RecipeEditComponent, ErrorpageComponent, RecipeStartComponent, AuthComponent, LoadingSpinnerComponent],
  bootstrap:    [ AppComponent ],
  providers: [ShoopingListService,RecipiesService, DataStorageService, RecipiesResolverService, AuthService]
})
export class AppModule { }
