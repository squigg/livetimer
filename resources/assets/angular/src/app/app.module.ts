import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { SharedModule } from "./shared/shared.module";
import { TimerModule } from "./features/timer/timer.module";
import { ServicesModule } from "./services/services.module";
import { TimerShowComponent } from "./features/timer/timer-show/timer-show.component";
import { TimerListComponent } from "./features/timer/timer-list/timer-list.component";
import { TimerAdminComponent } from "./features/timer/timer-admin/timer-admin.component";
import { PageNotFoundComponent } from "./shared/error/page-not-found/page-not-found.component";

const appRoutes: Routes = [
    {path: 'timers', component: TimerListComponent},
    {path: 'timer/:id/admin', component: TimerAdminComponent},
    {path: 'timer/:id', component: TimerShowComponent},
    {path: '**', component: PageNotFoundComponent}
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        RouterModule.forRoot(
            appRoutes,
            {enableTracing: true} // <-- debugging purposes only
        ),
        BrowserModule,
        SharedModule,
        TimerModule,
        ServicesModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
