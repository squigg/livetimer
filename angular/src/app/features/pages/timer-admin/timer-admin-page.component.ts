import { Component, OnInit } from '@angular/core';
import { Timer } from "../../../models/timer";
import { TimerService } from "../../../services/timer/timer.service";
import { ActivatedRoute, Params } from "@angular/router";
import { Subscription } from "rxjs/Subscription";
import { Trigger } from "../../../models/trigger";
import { TriggerHttpService } from "../../../services/trigger/trigger-http.service";
import SelectOption from "../../../shared/classes/select-option";

@Component({
    selector: 'app-page-timer-admin',
    templateUrl: './timer-admin-page.component.html',
    styleUrls: ['./timer-admin-page.component.scss']
})
export class TimerAdminPageComponent implements OnInit {

    timer: Timer;
    triggers: Trigger[] = [];
    templates: Timer[] = [];
    protected subscriptions: Subscription[] = [];

    constructor(private route: ActivatedRoute, private timerService: TimerService, private triggerService: TriggerHttpService) {
        this.route.params.subscribe((value: Params) => this.init(value['id']));
    }

    ngOnInit() {

    }

    private init(id: string) {
        this.getTimer(id);
        this.getTriggers(id);
        this.getTemplates(id);
    }

    async getTimer(id: string): Promise<void> {
        let timer$ = await this.timerService.connect(id);
        this.subscriptions.push(timer$.subscribe((timer: Timer) => this.timer = timer));
    }

    async getTriggers(id: string): Promise<void> {
        let triggers$ = await this.triggerService.connect(id);
        this.subscriptions.push(triggers$.subscribe((triggers: Trigger[]) => this.triggers = triggers));
    }

    async getTemplates(id: string): Promise<void> {
        let templates = await this.timerService.getTemplates();
        this.templates = templates.filter((t) => t.id !== id);
    }

    ngOnDestroy() {
        this.subscriptions.forEach((sub) => sub.unsubscribe());
    }

}
