import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AppSettings } from "../../config/appsettings.class";
import { Echo } from "laravel-echo"
import { Timer, TimerJSON } from "../models/timer";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";

@Injectable()
export class TimerService {

    private http: HttpClient;
    private echo: Echo;
    private timers: Map<string, Timer>;
    private timerSubjects: Map<string, BehaviorSubject<Timer>>;

    constructor(http: HttpClient) {
        this.http = http;
        this.echo = this.createEcho();
    }

    private createEcho() {
        new Echo({
            broadcaster: 'pusher',
            key: AppSettings.PUSHER_KEY,
            cluster: 'eu',
            encrypted: true
        });
    }

    private timerExists(id: string) {
        return this.timers.has(id);
    }

    private async getTimer(id: string) {
        if (!this.timerExists(id)) {
            let timer = await this.get(id);
            this.saveTimerObject(timer);
        }
        return this.timers.get(id);
    }

    private saveTimerObject(timer: Timer): void {
        const timerSubject = new BehaviorSubject<Timer>(timer);
        this.timerSubjects.set(timer.id, timerSubject);
    }

    private getTimerSubject(id: string): BehaviorSubject<Timer> {
        return this.timerSubjects.get(id);
    }

    public connect(id: string): BehaviorSubject<Timer> {

        this.echo.private('App.Timer.' + id)
            .listen('TimerStatusUpdated', this.timerStatusUpdated);

        if (!this.timerExists(id)) {
            this.getTimer(id);
        }

        return this.getTimerSubject(id);
    }

    private createTimerSubject(id: string) {
        const timer = this.getTimer(id);
        if (!timer) throw new Error('Could not find find timer with ID ')
    }

    private timerStatusUpdated(timer) {
        console.log(timer);
    }

    public getTimers(): Promise<Timer[]> {
        return this.http.get(AppSettings.API_ROOT + '/timers')
            .toPromise()
            .then((data: TimerJSON[]) => data.map(Timer.fromJSON))
    }

    public get(id: string): Promise<Timer> {
        return this.convertJsonTimer(this.http.get(AppSettings.API_ROOT + '/timers/' + id));
    }

    public setTime(id: string, duration: number, start: boolean = false) {
        return this.convertJsonTimer(this.http.post(AppSettings.API_ROOT + '/timers/' + id + '/set/' + duration, {start: start}));
    }

    public delete(id: string) {
        return this.http.delete(AppSettings.API_ROOT + '/timers/' + id);
    }

    public create(id: string, name: string) {
        return this.convertJsonTimer(this.http.post(AppSettings.API_ROOT + '/timers', {name: name}));
    }

    public rename(id: string, name: string) {
        return this.convertJsonTimer(this.http.put(AppSettings.API_ROOT + '/timers', {name: name}));
    }

    private action(id: string, action: string) {
        return this.convertJsonTimer(this.http.post(AppSettings.API_ROOT + '/timers/' + id + '/' + action, null));
    }

    public start(id: string) {
        return this.action(id, 'start');
    }

    public restart(id: string) {
        return this.action(id, 'restart');
    }

    public reset(id: string) {
        return this.action(id, 'reset');
    }

    public pause(id: string) {
        return this.action(id, 'pause');
    }

    private convertJsonTimer(objectObservable: Observable<Object>): Promise<Timer> {
        return objectObservable.toPromise().then((data: TimerJSON) => Timer.fromJSON(data));
    }
}
