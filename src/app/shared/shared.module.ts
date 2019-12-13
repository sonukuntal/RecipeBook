import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DropdownDirective } from "./dropdown.directive";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { AlertComponent } from "./alert/alert.component";
import { PlaceholderDirective } from "./placeholder.directive";

@NgModule({
  imports: [CommonModule],
  declarations: [
    LoadingSpinnerComponent,
    AlertComponent,
    DropdownDirective,
    PlaceholderDirective
  ],
  exports: [
    LoadingSpinnerComponent,
    AlertComponent,
    CommonModule,
    DropdownDirective,
    PlaceholderDirective
  ],
  entryComponents:[AlertComponent]
})
export class SharedModule {}
