import { Injectable } from '@angular/core';
import { Timer, TimerStatus } from "../models/timer";
import { TimerHttpService } from "./timer-http.service";
import { Observable } from "rxjs/Rx";
import { IntervalObservable } from "rxjs/observable/IntervalObservable";


@Injectable()
export class TimerService {

    private offsetMilliseconds: number;
    private timerHttp: TimerHttpService;
    private timers = new Map<string, Observable<Timer>>();

    constructor(timerHttp: TimerHttpService) {
        this.timerHttp = timerHttp;
    }

    public async connect(id: string): Promise<Observable<Timer>> {
        if (this.timers.has(id)) {
            return this.timers.get(id);
        }
        this.timers.set(id, await this.getTimer(id));
        return this.timers.get(id);
    }

    private async getTimer(id): Promise<Observable<Timer>> {
        return (await this.timerHttp.connect(id))
            .switchMap((timer) => timer.status === TimerStatus.Started ? new IntervalObservable(1000).mapTo(timer) : Observable.of(timer))
            .map(this.handleTick)
            .share();
    }

    handleTick(timer: Timer): Timer {
        if (timer.status === TimerStatus.Started) {
            let remaining = Math.max(timer.remaining - 1, 0);
            let status = remaining === 0 ? TimerStatus.Complete : TimerStatus.Started;
            return Object.assign(timer, {remaining: remaining, status: status})
        }
        return timer;
    }

    public disconnect(id: string) {
        this.timerHttp.disconnect(id);
        this.timers.delete(id);
    }

}
