import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SharedModule } from "./shared/shared.module";
import { TimerModule } from "./features/timer/timer.module";
import { ServicesModule } from "./services/services.module";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
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
