import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Timer, TimerStatus } from "../../../models/timer";
import { Trigger, TriggerActionType, TriggerCompareType } from "../../../models/trigger";
import { HowlService } from "../../../services/trigger/howl.service";
import { TriggerAction, TriggerSoundAction, TriggerStyleAction } from "../../../services/trigger/trigger-actions";

@Component({
    selector: 'app-timer-display',
    templateUrl: './timer-display.component.html',
    styleUrls: ['./timer-display.component.scss']
})
export class TimerDisplayComponent implements OnInit, OnChanges {

    @Input() timer: Timer;
    @Input() triggers = Array<Trigger>();
    @ViewChild('clockWrapper') clockWrapper: ElementRef;

    private appliedTriggers = new Set<string>();

    constructor(private howl: HowlService) {
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
        console.log('Changes', changes);
        if (changes.timer && changes.timer.currentValue && this.triggers) {
            this.triggers.forEach((trigger) => this.checkTrigger(trigger, changes.timer.currentValue.remaining));
        }
        if (changes.triggers && changes.triggers.currentValue) {
            this.triggers.forEach((trigger) => this.createTriggerActions(trigger));
        }
    }

    checkTrigger(trigger: Trigger, time: number): void {
        console.log('Checking Trigger', trigger);
        this.shouldBeApplied(trigger, time) ? this.applyTrigger(trigger) : this.removeTrigger(trigger);
    }

    applyTrigger(trigger: Trigger): void {
        console.log('Applying Trigger', trigger);
        trigger.action.apply();
        this.appliedTriggers.add(trigger.id);
    }

    removeTrigger(trigger: Trigger): void {
        const exists = this.appliedTriggers.delete(trigger.id);
        if (exists) {
            console.log('Removing Trigger', trigger);
            trigger.action.remove();
        }
    }

    shouldBeApplied(trigger: Trigger, time: number): boolean {
        console.log('Checking Trigger', trigger);
        if (trigger.compare_type === TriggerCompareType.Exactly) {
            return time === trigger.target_time;
        }
        if (trigger.compare_type === TriggerCompareType.LessThan) {
            return time < trigger.target_time;
        }
        if (trigger.compare_type === TriggerCompareType.GreaterThan) {
            return time > trigger.target_time;
        }
    }

    private createTriggerActions(trigger: Trigger): Trigger {
        let action: TriggerAction;
        if (trigger.action_type === TriggerActionType.PlaySound) {
            action = new TriggerSoundAction(trigger.action_parameters['sound'], 1, this.howl);
        }
        if (trigger.action_type === TriggerActionType.ChangeStyle) {
            action = new TriggerStyleAction(trigger.action_parameters['property'], trigger.action_parameters['value'], this.clockWrapper.nativeElement);
        }
        trigger.action = action;
        return trigger;
    }
}
