import { Component, OnInit } from '@angular/core';
import { TimerHttpService } from "../../../services/timer/timer-http.service";
import { Timer } from "../../../models/timer";

@Component({
    selector: 'app-timer-list',
    templateUrl: './timer-list.component.html',
    styleUrls: ['./timer-list.component.scss']
})
export class TimerListComponent implements OnInit {

    private timers: Timer[];
    private name: string;

    constructor(private timerHttpService: TimerHttpService) {
    }

    ngOnInit() {
        this.getTimers();
    }

    async getTimers() {
        this.timers = await this.timerHttpService.getTimers();
    }

    async createTimer() {
        if (!this.name) return;
        await this.timerHttpService.create(this.name);
        await this.getTimers();
        this.name = '';
    }
}
