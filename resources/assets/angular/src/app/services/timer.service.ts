import { Injectable } from '@angular/core';
import { Timer } from "../models/timer";
import { TimerHttpService } from "./timer-http.service";
import { BehaviorSubject, Observable } from "rxjs/Rx";
import * as moment from "moment";

@Injectable()
export class TimerService {

    private offsetMilliseconds: number;
    private timerHttp: TimerHttpService;
    private timerSubjects = new Map<string, BehaviorSubject<Timer>>();

    constructor(timerHttp: TimerHttpService) {
        this.timerHttp = timerHttp;
    }

    public async connect(id: string): Promise<Observable<Timer>> {
        let timerSubject = await this.timerHttp.connect(id);
        this.setHooks(timerSubject);
        this.timerSubjects.set(id, timerSubject);
        return timerSubject.asObservable();
    }

    private setHooks(timerObservable: Observable<Timer>) {
        return timerObservable.subscribe(
            (timer) => {
                this.handleTimerChange(timer)
            });
    }

    private handleTimerChange(timer: Timer) {
        const timerSubject = this.timerSubjects.get(timer.id);
        this.offsetMilliseconds = timer.now.diff(moment(), 'milliseconds');

        // Do stuff with timer in here????

        timerSubject.next(timer);
    }
}
