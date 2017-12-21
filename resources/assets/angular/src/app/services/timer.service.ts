import { Injectable } from '@angular/core';
import { Timer, TimerStatus } from "../models/timer";
import { TimerHttpService } from "./timer-http.service";
import { Observable } from "rxjs/Rx";
import 'rxjs/add/observable/interval';
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
        let timerObservable = await this.timerHttp.connect(id);
        return timerObservable
            .switchMap((val) => new IntervalObservable(1000).mapTo(val))
            .map(this.handleTick)
            .distinctUntilChanged();
    }

    handleTick(timer: Timer): Timer {
        if (timer.status === TimerStatus.Started) {
            let remaining = Math.max(timer.remaining - 1, 0);
            let status = remaining === 0 ? TimerStatus.Complete : TimerStatus.Started;
            return Object.assign(timer, {remaining: remaining, status: status})
        }
        return timer;
    }

}
