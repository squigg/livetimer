import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "../../shared/shared.module";

import { ClockComponent } from './clock/clock.component';
import { TimerShowComponent } from './timer-show/timer-show.component';
import { TimerListComponent } from "./timer-list/timer-list.component";
import { TimerAdminComponent } from "./timer-admin/timer-admin.component";

@NgModule({
    imports: [
        CommonModule,
        SharedModule
    ],
    exports: [
        TimerShowComponent,
        TimerListComponent,
        TimerAdminComponent
    ],
    declarations: [
        TimerShowComponent,
        TimerListComponent,
        TimerAdminComponent,
        ClockComponent]
})
export class TimerModule {
}
