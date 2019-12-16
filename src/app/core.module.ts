import {NgModule} from '@angular/core';

import { RecipiesService } from "./recipies/recipies.service";
import { ShoopingListService } from "./shooping-list/shooping-list.service";
import { DataStorageService } from "./shared/data-storage.service";
import { RecipiesResolverService } from "./recipies/recipies-resolver.service";
import { AuthService } from "./auth/auth.service";
import { AuthGuard } from "./auth/auth.guard";

@NgModule({
providers:[
  ShoopingListService,
    RecipiesService,
    DataStorageService,
    RecipiesResolverService,
    AuthService,
    AuthGuard
]
})
export class CoreModule
{

}