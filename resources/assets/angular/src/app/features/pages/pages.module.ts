import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "../../shared/shared.module";
import { TimerModule } from "../timer/timer.module";

import { TimerShowPageComponent } from './timer-show/timer-show-page.component';
import { TimerAdminPageComponent } from "./timer-admin/timer-admin-page.component";
import { TimerListPageComponent } from "./timer-list/timer-list-page.component";
import { RouterModule } from "@angular/router";
import { NavigationComponent } from "./navigation/navigation.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        TimerModule,
        RouterModule
    ],
    exports: [
        TimerShowPageComponent,
        TimerAdminPageComponent,
        TimerListPageComponent,
        PageNotFoundComponent,
        NavigationComponent,
    ],
    declarations: [
        TimerShowPageComponent,
        TimerAdminPageComponent,
        TimerListPageComponent,
        PageNotFoundComponent,
        NavigationComponent,
    ]
})
export class PagesModule {
}
