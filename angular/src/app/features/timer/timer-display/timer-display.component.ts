import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Timer, TimerStatus } from "../../../models/timer";
import { Trigger } from "../../../models/trigger";
import { TriggerService } from "../../../services/trigger/trigger.service";

@Component({
    selector: 'app-timer-display',
    templateUrl: './timer-display.component.html',
    styleUrls: ['./timer-display.component.scss']
})
export class TimerDisplayComponent implements OnInit, OnChanges {

    @Input() timer: Timer;
    @Input() triggers: Trigger[] = [];
    @ViewChild('clockWrapper') clockWrapper: ElementRef;

    constructor(private triggerService: TriggerService) {
    }

    ngOnInit() {

    }

    ngAfterViewInit() {
        this.triggerService.registerHtmlElement(this.clockWrapper.nativeElement);
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

        if (changes.triggers && changes.triggers.currentValue) {
            this.createTriggerActions();
            this.checkTriggers();
        }
        if (changes.timer && changes.timer.currentValue) {
            this.checkTriggers();
        }
    }

    createTriggerActions(): void {
        this.triggers.forEach((trigger) => this.triggerService.setTriggerActions(trigger));
    }

    checkTriggers(): void {
        this.triggers.forEach((trigger) => this.checkTrigger(trigger, this.timer.remaining));
    }

    checkTrigger(trigger: Trigger, time: number): void {
        this.triggerService.shouldBeApplied(trigger, time) ? this.triggerService.applyTrigger(trigger) : this.triggerService.removeTrigger(trigger);
    }


}
