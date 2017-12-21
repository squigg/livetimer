import { Component, OnInit } from '@angular/core';
import { TimerHttpService } from "../../../services/timer-http.service";
import { Timer, TimerStatus } from "../../../models/timer";
import { ActivatedRoute, Params } from "@angular/router";
import { TimerService } from "../../../services/timer.service";
import { Subscription } from "rxjs/Subscription";

@Component({
    selector: 'app-timeradmin',
    templateUrl: './timer-admin.component.html',
    styleUrls: ['./timer-admin.component.css']
})
export class TimerAdminComponent implements OnInit {

    protected timer: Timer;
    protected subscription: Subscription;
    protected timerService: TimerService;
    protected timerHttpService: TimerHttpService;
    protected duration: number;

    constructor(private route: ActivatedRoute, timerService: TimerService, timerHttpService: TimerHttpService) {
        this.timerService = timerService;
        this.timerHttpService = timerHttpService;
        this.route.params.subscribe((value: Params) => this.getTimer(value['id']));
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    async getTimer(id: string): Promise<void> {
        let timer = await this.timerService.connect(id);
        this.subscription = timer.subscribe((timer: Timer) => this.timer = timer);
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
