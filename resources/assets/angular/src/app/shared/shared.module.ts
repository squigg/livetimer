import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SquareIconButtonComponent } from "./components/square-icon-button/square-icon-button.component";
import { HideOnInactiveDirective } from './directives/hide-on-inactive.directive';

@NgModule({
    imports: [
        CommonModule,
    ],
    exports: [
        SquareIconButtonComponent,
        HideOnInactiveDirective,
    ],
    declarations: [
        SquareIconButtonComponent,
        HideOnInactiveDirective,
    ]
})
export class SharedModule {
}
