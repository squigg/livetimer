import { Component, Input, OnInit } from '@angular/core';
import { Timer, TimerStatus } from "../../../models/timer";

@Component({
    selector: 'app-timer-display',
    templateUrl: './timer-display.component.html',
    styleUrls: ['./timer-display.component.scss']
})
export class TimerDisplayComponent implements OnInit {

    @Input() timer: Timer;

    ngOnInit() {

    }

    getRemaining(): number {
        return this.timer ? this.timer.remaining : 0;
    }

    getPaused(): boolean {
        return this.timer ? this.timer.status === TimerStatus.Paused : false;
    }

    getShowHours(): boolean {
        return this.timer ? this.timer.duration > (60 * 60) : false;
    }
}
