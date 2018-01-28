import { Injectable } from '@angular/core';
import { Trigger, TriggerJSON } from "../../models/trigger";
import { Observable } from "rxjs/Rx";
import { AppSettings } from "../../../config/appsettings.class";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { PusherService } from "../pusher.service";

@Injectable()
export class TriggerHttpService {

    constructor(private http: HttpClient, private pusherService: PusherService) {
    }

    public async connect(id: string): Promise<Observable<Trigger[]>> {

        return Observable.of(await this.getTriggers(id))
            .concat(this.subscribeToPusher(id));
    }

    private subscribeToPusher(id): Observable<Trigger[]> {
        return this.pusherService.listen(id, 'TriggerUpdated')
            .map((data) => data.triggers.map((trigger: TriggerJSON) => Trigger.fromJSON(trigger)));
    }

    public disconnect(id: string): void {
        this.pusherService.disconnect(id);
    }

    public getTriggers(timerId: string): Promise<Trigger[]> {
        return this.http.get<TriggerJSON[]>(AppSettings.API_ROOT + '/timers/' + timerId + '/triggers')
            .toPromise()
            .then((triggers: TriggerJSON[]) => triggers.map(Trigger.fromJSON))
    }

    public get(id: string): Promise<Trigger> {
        return this.convertJsonTrigger(this.http.get<TriggerJSON>(AppSettings.API_ROOT + '/triggers/' + id, {observe: 'response'}));
    }

    public update(id: string, trigger: Trigger) {
        return this.convertJsonTrigger(this.http.put<TriggerJSON>(AppSettings.API_ROOT + '/triggers/' + id, trigger, {observe: 'response'}));
    }

    public delete(id: string) {
        return this.http.delete(AppSettings.API_ROOT + '/triggers/' + id);
    }

    public create(id: string, name: string) {
        return this.convertJsonTrigger(this.http.post<TriggerJSON>(AppSettings.API_ROOT + '/triggers', {name: name}, {observe: 'response'}));
    }

    public rename(id: string, name: string) {
        return this.convertJsonTrigger(this.http.put<TriggerJSON>(AppSettings.API_ROOT + '/triggers', {name: name}, {observe: 'response'}));
    }

    private convertJsonTrigger(data$: Observable<Object>): Promise<Trigger> {
        return data$.toPromise()
            .then((data: HttpResponse<TriggerJSON>) => Trigger.fromJSON(data.body))
    }

}
