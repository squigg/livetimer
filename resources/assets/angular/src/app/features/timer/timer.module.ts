import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimerComponent } from './timer.component';
import { SharedModule } from "../../shared/shared.module";
import { ClockComponent } from './clock/clock.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule
    ],
    exports: [TimerComponent],
    declarations: [TimerComponent, ClockComponent]
})
export class TimerModule {
}
