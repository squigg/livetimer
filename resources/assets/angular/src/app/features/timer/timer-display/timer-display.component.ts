import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Timer, TimerStatus } from "../../../models/timer";
import { Trigger, TriggerAction } from "../../../models/trigger";
import { TriggerService, TriggerStyleAction } from "../../../services/trigger/trigger.service";

@Component({
    selector: 'app-timer-display',
    templateUrl: './timer-display.component.html',
    styleUrls: ['./timer-display.component.scss']
})
export class TimerDisplayComponent implements OnInit, OnChanges {

    @Input() timer: Timer;
    @Input() triggers: Trigger[];

    constructor(private triggerService: TriggerService) {
    }

    ngOnInit() {

    }

    getRemaining(): number {
        return this.timer ? this.timer.remaining : 0;
    }

    getPaused(): boolean {
        return this.timer ? this.timer.status === TimerStatus.Paused : false;
    }

    getShowHours(): boolean {
        return this.timer ? this.timer.duration > (60 * 60) : false;
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.timer) {
            this.triggers.forEach((trigger) => this.checkTrigger(trigger));
        }
    }

    checkTrigger(trigger: Trigger): void {
        if (this.triggerService.check(trigger, this.timer.remaining)) {
            this.applyAction(this.triggerService.action(trigger))
        }
    }

    applyAction(action: TriggerStyleAction): void {
        // TODO: apply style changes
    }

}
