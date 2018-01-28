import { NgModule } from '@angular/core';

import { TimerService } from "./timer/timer.service";
import { TimerHttpService } from "./timer/timer-http.service";
import { HttpClientModule } from "@angular/common/http";
import { AppService } from "./app.service";
import { PusherService } from "./pusher.service";
import { TriggerHttpService } from "./trigger/trigger-http.service";
import { HowlService } from "./trigger/howl.service";
import { TriggerService } from "./trigger/trigger.service";

@NgModule({
    declarations: [],
    imports: [
        HttpClientModule,
    ],
    providers: [
        TimerService,
        TimerHttpService,
        AppService,
        PusherService,
        TriggerHttpService,
        TriggerService,
        HowlService
    ],
})
export class ServicesModule {
}
