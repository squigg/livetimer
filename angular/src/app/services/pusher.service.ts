import { Injectable } from '@angular/core';
import { AppSettings } from "../../config/appsettings.class";

import Pusher from 'pusher-js';
import Echo from 'laravel-echo';
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";

let pusher = Pusher;

@Injectable()
export class PusherService {

    private echo: any;

    constructor() {
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

    public listen(timerId: string, eventId: string): Observable<any> {
        const obs = new Subject<any>();
        this.echo.channel('App.Timer.' + timerId)
            .listen(eventId, (data) => obs.next(data));
        return obs.asObservable();
    }

    public disconnect(timerId: string): void {
        this.echo.leave('App.Timer.' + timerId);
    }
}
