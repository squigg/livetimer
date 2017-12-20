import { Component, OnInit } from '@angular/core';
import { Timer } from "../../../models/timer";
import { TimerService } from "../../../services/timer.service";
import { ActivatedRoute, Params } from "@angular/router";
import { Subscription } from "rxjs/Subscription";
import { TimerHttpService } from "../../../services/timer-http.service";

@Component({
    selector: 'app-timershow',
    templateUrl: './timer-show.component.html',
    styleUrls: ['./timer-show.component.css']
})
export class TimerShowComponent implements OnInit {

    protected timer: Timer;
    protected timerService: TimerService;
    protected subscription: Subscription;
    protected timerHttpService: TimerHttpService;

    constructor(private route: ActivatedRoute, timerService: TimerService) {
        this.timerService = timerService;
        this.route.params.subscribe((value: Params) => this.getTimer(value['id']));
    }

    ngOnInit() {

    }

    getRemaining(): number {
        return this.timer ? this.timer.remaining : 0;
    }

    getStatus(): string {
        return this.timer ? this.timer.status : '';
    }

    async getTimer(id: string): Promise<void> {
        let timer = await this.timerService.connect(id);
        this.subscription = timer.subscribe((timer: Timer) => this.timer = timer);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
