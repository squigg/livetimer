import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { SharedModule } from "./shared/shared.module";
import { TimerModule } from "./features/timer/timer.module";
import { PagesModule } from "./features/pages/pages.module";
import { ServicesModule } from "./services/services.module";

import { TimerShowPageComponent } from "./features/pages/timer-show/timer-show-page.component";
import { TimerListPageComponent } from "./features/pages/timer-list/timer-list-page.component";
import { TimerAdminPageComponent } from "./features/pages/timer-admin/timer-admin-page.component";
import { PageNotFoundComponent } from "./features/pages/page-not-found/page-not-found.component";

const appRoutes: Routes = [
    {path: 'timers', component: TimerListPageComponent},
    {path: 'timer/:id/admin', component: TimerAdminPageComponent},
    {path: 'timer/:id', component: TimerShowPageComponent},
    {path: '**', component: PageNotFoundComponent}
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        RouterModule.forRoot(
            appRoutes,
            //{enableTracing: true} // <-- debugging purposes only
        ),
        BrowserModule,
        SharedModule,
        TimerModule,
        PagesModule,
        ServicesModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
