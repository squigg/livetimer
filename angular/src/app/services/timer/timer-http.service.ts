import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from "@angular/common/http";
import { AppSettings } from "../../../config/appsettings.class";
import { Timer, TimerJSON } from "../../models/timer";
import { Observable } from "rxjs/Rx";

import { PusherService } from "../pusher.service";
import * as moment from "moment";
import { Subject } from "rxjs/Subject";

@Injectable()
export class TimerHttpService {

    protected subjects = new Map<string, Subject<Timer>>();

    constructor(private http: HttpClient, private pusherService: PusherService) {
    }

    public async connect(id: string): Promise<Observable<Timer>> {

        this.subjects.set(id, new Subject<Timer>());
        return Observable.of(await this.get(id))
            .concat(this.subscribeToPusher(id))
            .merge(this.subjects.get(id));
    }

    public async refresh(id: string): Promise<void> {
        this.subjects.get(id).next(await this.get(id));
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

    public update(id: string, data: Object) {
        return this.convertJsonTimer(this.http.put<TimerJSON>(AppSettings.API_ROOT + '/timers/' + id, data, {observe: 'response'}));
    }

    public updateFinishAt(id: string, date: Date) {
        const dateString = moment(date).format();
        return this.convertJsonTimer(this.http.put<TimerJSON>(AppSettings.API_ROOT + '/timers/' + id, {finish_at: dateString}, {observe: 'response'}));
    }

    public delete(id: string) {
        return this.http.delete(AppSettings.API_ROOT + '/timers/' + id);
    }

    public create(name: string) {
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

    public complete(id: string) {
        return this.action(id, 'complete');
    }

    public stop(id: string, remaining: number) {
        return this.action(id, 'stop', {remaining: remaining});
    }

    public pause(id: string, remaining: number) {
        return this.action(id, 'pause', {remaining: remaining});
    }

    public copyTemplate(id: string, templateId: string) {
        return this.action(id, 'template', {template: templateId});
    }

    private convertJsonTimer(data$: Observable<Object>): Promise<Timer> {
        return data$.toPromise().then((data: HttpResponse<TimerJSON>) => Timer.fromJSON(data.body));
    }
}
