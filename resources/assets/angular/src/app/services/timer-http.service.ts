import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from "@angular/common/http";
import { AppSettings } from "../../config/appsettings.class";
import { Timer, TimerJSON } from "../models/timer";
import { BehaviorSubject, Observable } from "rxjs/Rx";

import Pusher from 'pusher-js';
import Echo from 'laravel-echo';

let pusher = Pusher;

@Injectable()
export class TimerHttpService {

    private http: HttpClient;
    private echo: any;
    private timerSubjects = new Map<string, BehaviorSubject<Timer>>();

    constructor(http: HttpClient) {
        this.http = http;
        this.echo = this.createEcho();
    }

    private createEcho(): any {
        return new Echo({
            broadcaster: 'pusher',
            key: AppSettings.PUSHER_KEY,
            cluster: 'eu',
            encrypted: true
        });
    }

    public async connect(id: string): Promise<Observable<Timer>> {

        if (!this.timerExists(id)) {
            await this.fetchTimer(id);
        }

        this.echo.channel('App.Timer.' + id)
            .listen('TimerUpdated', (data) => this.timerUpdated(data.timer));

        return this.getTimerSubject(id).asObservable();
    }

    public disconnect(id: string): void {
        this.echo.leave('App.Timer.' + id);
    }

    private timerExists(id: string) {
        return this.timerSubjects.has(id);
    }

    private getTimerSubject(id: string): BehaviorSubject<Timer> {
        return this.timerSubjects.get(id);
    }

    private createTimerSubject(timer: Timer): void {
        const timerSubject = new BehaviorSubject<Timer>(timer);
        this.timerSubjects.set(timer.id, timerSubject);
    }

    private async fetchTimer(id: string): Promise<void> {
        let timer = await this.get(id);
        this.createTimerSubject(timer);
    }

    private timerUpdated(data: TimerJSON) {
        const timer = Timer.fromJSON(data)
        const timerSubject = this.getTimerSubject(timer.id)
        timerSubject.next(timer);
    }

    public getTimers(): Promise<Timer[]> {
        return this.http.get<TimerJSON[]>(AppSettings.API_ROOT + '/timers')
            .toPromise()
            .then((timers: TimerJSON[]) => timers.map(Timer.fromJSON))
    }

    public get(id: string): Promise<Timer> {
        return this.convertJsonTimer(this.http.get<TimerJSON>(AppSettings.API_ROOT + '/timers/' + id, {observe: 'response'}));
    }

    public update(id: string, timer: Timer) {
        return this.convertJsonTimer(this.http.put<TimerJSON>(AppSettings.API_ROOT + '/timers/' + id, timer, {observe: 'response'}));
    }

    public delete(id: string) {
        return this.http.delete(AppSettings.API_ROOT + '/timers/' + id);
    }

    public create(id: string, name: string) {
        return this.convertJsonTimer(this.http.post<TimerJSON>(AppSettings.API_ROOT + '/timers', {name: name}, {observe: 'response'}));
    }

    public rename(id: string, name: string) {
        return this.convertJsonTimer(this.http.put<TimerJSON>(AppSettings.API_ROOT + '/timers', {name: name}, {observe: 'response'}));
    }

    private action(id: string, action: string, body?: Object) {
        return this.convertJsonTimer(this.http.post<TimerJSON>(AppSettings.API_ROOT + '/timers/' + id + '/' + action, body, {observe: 'response'}));
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

    public resume(id: string) {
        return this.action(id, 'resume');
    }

    public stop(id: string, remaining: number) {
        return this.action(id, 'stop', {remaining: remaining});
    }

    public pause(id: string, remaining: number) {
        return this.action(id, 'pause', {remaining: remaining});
    }

    private convertJsonTimer(objectObservable: Observable<Object>): Promise<Timer> {
        return objectObservable.toPromise().then((data: HttpResponse<TimerJSON>) => Timer.fromJSON(data.body));
    }
}
