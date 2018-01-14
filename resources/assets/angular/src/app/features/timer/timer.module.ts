import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";

import { SharedModule } from "../../shared/shared.module";

import { ClockComponent } from './clock/clock.component';
import { TimerAdminComponent } from "./timer-admin/timer-admin.component";
import { TimerDisplayComponent } from "./timer-display/timer-display.component";

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
    ],
    exports: [
        TimerAdminComponent,
        TimerDisplayComponent,
    ],
    declarations: [
        TimerAdminComponent,
        TimerDisplayComponent,
        ClockComponent,
    ]
})
export class TimerModule {
}
