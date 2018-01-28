import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";

import { SharedModule } from "../../shared/shared.module";

import { ClockComponent } from './clock/clock.component';
import { TimerAdminComponent } from "./timer-admin/timer-admin.component";
import { TimerDisplayComponent } from "./timer-display/timer-display.component";
import { TimerListComponent } from "./timer-list/timer-list.component";
import { RouterModule } from "@angular/router";

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        RouterModule
    ],
    exports: [
        TimerAdminComponent,
        TimerDisplayComponent,
        TimerListComponent,
    ],
    declarations: [
        TimerAdminComponent,
        TimerDisplayComponent,
        TimerListComponent,
        ClockComponent,
    ]
})
export class TimerModule {
}
