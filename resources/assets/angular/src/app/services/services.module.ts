import { NgModule } from '@angular/core';

import { TimerService } from "./timer.service";
import { TimerHttpService } from "./timer-http.service";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
    declarations: [],
    imports: [
        HttpClientModule,
    ],
    providers: [TimerService, TimerHttpService],
})
export class ServicesModule {
}
