import { Component, Input, OnInit } from '@angular/core';
import { Timer, TimerStatus } from "../../models/timer";
import { TimerService } from "../../services/timer.service";
import { Observable } from "rxjs/Observable";

@Component({
    selector: 'app-timer',
    templateUrl: './timer.component.html',
    styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

    private timer: Timer;
    private remaining: number;
    private timerService: TimerService;
    private timerObservable: Observable<Timer>;
    private timerInterval: number;
    @Input() id: string;

    constructor(timerService: TimerService) {
        this.timerService = timerService;
    }

    ngOnInit() {
        this.timerService.connect(this.id).then(
            (observable) => {
                this.timerObservable = observable;
                this.timerObservable.subscribe(
                    (timer) => this.updateTimer(timer)
                )
            })
    }

    private updateTimer(timer: Timer) {
        this.timer = timer;
        if (timer.status === TimerStatus.Started) {
            this.timerInterval = setInterval(() => this.updateRemaining());
        }
        else {
            clearInterval(this.timerInterval);
        }
    }

    private updateRemaining() {
        this.remaining = this.remaining - 1;
        if (this.remaining <= 0) this.remaining = 0;
    }
}
