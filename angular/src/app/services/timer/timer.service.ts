import { Injectable } from '@angular/core';
import { Timer, TimerStatus } from "../../models/timer";
import { TimerHttpService } from "./timer-http.service";
import { Observable } from "rxjs/Rx";
import { IntervalObservable } from "rxjs/observable/IntervalObservable";

interface TimerNewValues {
    remaining: number,
    status?: TimerStatus
}

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

    public async getTemplates(): Promise<Timer[]> {
        return this.timerHttp.getTimers();
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
        if (timer.status !== TimerStatus.Started) return timer;

        const remaining = timer.remaining - elapsed;
        let newValues: TimerNewValues = {remaining: remaining};

        if (remaining <= -1) {
            newValues.remaining = 0;
            newValues.status = TimerStatus.Complete;
            this.sendComplete(timer);
        }

        return Object.assign({}, timer, newValues)
    }

    private sendComplete(timer: Timer) {
        this.timerHttp.complete(timer.id);
    }

    public disconnect(id: string) {
        this.timerHttp.disconnect(id);
        this.timers.delete(id);
    }
}
