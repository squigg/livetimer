import { Injectable } from '@angular/core';
import { Timer, TimerStatus } from "../../models/timer";
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
            .switchMap(
                (timer) => timer.status === TimerStatus.Started
                    ? Observable.concat(Observable.of(timer), new IntervalObservable(1000).mapTo(timer))
                    : Observable.of(timer),
                (outer, inner, outerIndex, innerIndex) => this.handleTick(outer, innerIndex))
            .share();
    }

    handleTick(timer: Timer, elapsed: number): Timer {
        if (timer.status === TimerStatus.Started) {
            const remaining = Math.max(timer.remaining - elapsed, 0);
            let newValues = {remaining: remaining};
            if (remaining === 0) {
                newValues['status'] = TimerStatus.Complete;
                this.sendComplete(timer);
            }
            return Object.assign({}, timer, {remaining: remaining, status: status})
        }
        return timer;
    }

    private sendComplete(timer: Timer) {
        this.timerHttp.complete(timer.id);
    }

    public disconnect(id: string) {
        this.timerHttp.disconnect(id);
        this.timers.delete(id);
    }

}
