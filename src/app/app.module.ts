import { NgModule } from "@angular/core";
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { ErrorpageComponent } from "./errorpage/errorpage.component";
import { RecipiesModule } from "./recipies/recipies.module";
import { ShoopingModule } from "./shooping-list/shooping.module";
import {AuthModule} from './auth/auth.module';
import {SharedModule} from './shared/shared.module';
import {CoreModule} from './core.module';


@NgModule({
  imports: [

    ShoopingModule,
    HttpClientModule,
    SharedModule,
    AppRoutingModule,
    CoreModule,
    AuthModule
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    ErrorpageComponent
  ],
  bootstrap: [AppComponent],
  providers: []
})
export class AppModule {}
