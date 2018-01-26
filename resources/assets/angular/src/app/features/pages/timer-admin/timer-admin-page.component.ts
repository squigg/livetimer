import { Component, OnInit } from '@angular/core';
import { Timer } from "../../../models/timer";
import { TimerService } from "../../../services/timer/timer.service";
import { ActivatedRoute, Params } from "@angular/router";
import { Subscription } from "rxjs/Subscription";
import { Observable } from "rxjs/Observable";

@Component({
    selector: 'app-page-timer-admin',
    templateUrl: './timer-admin-page.component.html',
    styleUrls: ['./timer-admin-page.component.scss']
})
export class TimerAdminPageComponent implements OnInit {

    timer: Observable<Timer>;
    protected timerService: TimerService;
    protected subscription: Subscription;

    constructor(private route: ActivatedRoute, timerService: TimerService) {
        this.timerService = timerService;
        this.route.params.subscribe((value: Params) => this.getTimer(value['id']));
    }

    ngOnInit() {

    }

    async getTimer(id: string): Promise<void> {
        this.timer = await this.timerService.connect(id);
    }

}
