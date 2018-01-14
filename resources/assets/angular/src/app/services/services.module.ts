import { NgModule } from '@angular/core';

import { TimerService } from "./timer.service";
import { TimerHttpService } from "./timer-http.service";
import { HttpClientModule } from "@angular/common/http";
import { AppService } from "./app.service";
import { PusherService } from "./pusher.service";

@NgModule({
    declarations: [],
    imports: [
        HttpClientModule,
    ],
    providers: [TimerService, TimerHttpService, AppService, PusherService],
})
export class ServicesModule {
}
