import { Component } from '@angular/core';
import { Timer } from "../../../models/timer";
import { TimerService } from "../../../services/timer/timer.service";
import { ActivatedRoute, Params } from "@angular/router";
import { Subscription } from "rxjs/Subscription";
import { TriggerHttpService } from "../../../services/trigger/trigger-http.service";
import { Trigger } from "../../../models/trigger";

@Component({
    selector: 'app-page-timer-show',
    templateUrl: './timer-show-page.component.html',
    styleUrls: ['./timer-show-page.component.scss']
})
export class TimerShowPageComponent {

    timer: Timer;
    triggers: Trigger[];
    protected subscriptions: Subscription[] = [];

    constructor(private route: ActivatedRoute, private timerService: TimerService, private triggerService: TriggerHttpService) {
        this.route.params.subscribe((value: Params) => this.init(value['id']));
    }

    private init(id: string) {
        this.getTimer(id);
        this.getTriggers(id);
    }

    async getTimer(id: string): Promise<void> {
        let timer = await this.timerService.connect(id);
        this.subscriptions.push(timer.subscribe((timer: Timer) => this.timer = timer));
    }

    async getTriggers(id: string): Promise<void> {
        let triggers = await this.triggerService.connect(id);
        this.subscriptions.push(triggers.subscribe((triggers: Trigger[]) => this.triggers = triggers));
    }

    ngOnDestroy() {
        this.subscriptions.forEach((sub) => sub.unsubscribe());
    }

}
