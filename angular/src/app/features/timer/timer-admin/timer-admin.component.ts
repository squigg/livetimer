import { Component, Input, OnInit } from '@angular/core';
import { TimerHttpService } from "../../../services/timer/timer-http.service";
import { Timer, TimerStatus } from "../../../models/timer";

@Component({
    selector: 'app-timer-admin',
    templateUrl: './timer-admin.component.html',
    styleUrls: ['./timer-admin.component.scss']
})
export class TimerAdminComponent implements OnInit {

    @Input() timer: Timer;
    protected timerHttpService: TimerHttpService;
    duration: number;

    constructor(timerHttpService: TimerHttpService) {
        this.timerHttpService = timerHttpService;
    }

    ngOnInit() {
    }

    ngOnDestroy() {
    }

    pause() {
        this.timerHttpService.pause(this.timer.id, this.timer.remaining);
    }

    stop() {
        this.timerHttpService.stop(this.timer.id, this.timer.remaining);
    }

    resume() {
        this.timerHttpService.resume(this.timer.id);
    }

    start() {
        this.timerHttpService.start(this.timer.id);
    }

    reset() {
        this.timerHttpService.reset(this.timer.id);
    }

    setDuration() {
        this.timerHttpService.update(this.timer.id, Object.assign(this.timer, {duration: this.duration}))
    }

    isInitial(): boolean {
        return this.timer.remaining === this.timer.duration;
    }

    showPause(): boolean {
        return this.timer.status === TimerStatus.Started;
    }

    showResume(): boolean {
        return this.timer.status === TimerStatus.Paused || (this.timer.status === TimerStatus.Stopped && !this.isInitial());
    }

    showStart(): boolean {
        return this.timer.status === TimerStatus.Stopped && this.isInitial();
    }

    showStop(): boolean {
        return (this.timer.status === TimerStatus.Started) || (this.timer.status === TimerStatus.Paused);
    }
}
