import { Injectable } from '@angular/core';
import { Timer, TimerStatus } from "../models/timer";
import { TimerHttpService } from "./timer-http.service";
import { BehaviorSubject, Observable } from "rxjs/Rx";
import 'rxjs/add/observable/interval';
import * as moment from "moment";
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
            .map((val) => val.status === TimerStatus.Started ? Object.assign(val, {remaining: Math.max(val.remaining - 1, 0)}) : val)
            .distinctUntilChanged();
    }



}
