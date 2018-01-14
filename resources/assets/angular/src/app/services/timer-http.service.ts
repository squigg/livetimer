import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from "@angular/common/http";
import { AppSettings } from "../../config/appsettings.class";
import { Timer, TimerJSON } from "../models/timer";
import { Observable } from "rxjs/Rx";

import { PusherService } from "./pusher.service";

@Injectable()
export class TimerHttpService {

    constructor(private http: HttpClient, private pusherService: PusherService) {
    }

    public async connect(id: string): Promise<Observable<Timer>> {

        return Observable.of(await this.get(id))
            .concat(this.subscribeToPusher(id));
    }

    private subscribeToPusher(id): Observable<Timer> {
        return this.pusherService.listen(id, 'TimerUpdated')
            .map((data) => Timer.fromJSON(data.timer));
    }

    public disconnect(id: string): void {
        this.pusherService.disconnect(id);
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

    private convertJsonTimer(data$: Observable<Object>): Promise<Timer> {
        return data$.toPromise().then((data: HttpResponse<TimerJSON>) => Timer.fromJSON(data.body));
    }
}
