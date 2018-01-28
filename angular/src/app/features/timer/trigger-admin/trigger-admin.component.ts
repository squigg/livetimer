import { Component, Input, OnInit } from '@angular/core';
import { Trigger } from "../../../models/trigger";
import { TriggerHttpService } from "../../../services/trigger/trigger-http.service";
import { TriggerService } from "../../../services/trigger/trigger.service";

@Component({
    selector: 'app-trigger-admin',
    templateUrl: './trigger-admin.component.html',
    styleUrls: ['./trigger-admin.component.scss']
})
export class TriggerAdminComponent implements OnInit {

    @Input() timerId: string;
    @Input() triggers: Trigger[];
    createNew: boolean;
    newTrigger: Trigger;

    constructor(private triggerHttp: TriggerHttpService, private triggerService: TriggerService) {
        this.resetTrigger();
    }

    ngOnInit() {
    }

    private resetTrigger() {
        this.newTrigger = new Trigger('', '', true, 0, null, null, {});
    }

    save(trigger: Trigger) {
        this.triggerHttp.update(trigger.id, trigger);
    }

    delete(trigger: Trigger) {
        this.triggerHttp.delete(trigger.id);
    }

    saveNew(trigger: Trigger) {
        this.triggerHttp.create(this.timerId, trigger);
        this.cancelNew();
    }

    startNew(): void {
        this.createNew = true;
    }

    cancelNew(): void {
        this.resetTrigger();
        this.createNew = false;
    }

}
