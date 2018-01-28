import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Trigger } from "../../../models/trigger";
import { TriggerService } from "../../../services/trigger/trigger.service";

@Component({
    selector: 'app-trigger-form',
    templateUrl: './trigger-form.component.html',
    styleUrls: ['./trigger-form.component.scss']
})
export class TriggerFormComponent implements OnInit {

    @Input() trigger: Trigger;
    @Output() save = new EventEmitter<Trigger>();
    @Output() delete = new EventEmitter<Trigger>();

    constructor(public triggerService: TriggerService) {
    }

    ngOnInit() {
    }

    saveTrigger(): void {
        this.save.emit(this.trigger);
    }

    deleteTrigger(): void {
        this.delete.emit(this.trigger);
    }
}
