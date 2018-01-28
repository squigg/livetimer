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
        console.log('Changes', changes, changes.timer, changes.triggers);
        if (changes.timer && changes.timer.currentValue && this.triggers) {
            this.triggers.forEach((trigger) => this.checkTrigger(trigger, changes.timer.currentValue.remaining));
        }
        if (changes.triggers && changes.triggers.currentValue) {
            this.triggers.forEach((trigger) => this.triggerService.setTriggerActions(trigger));
        }
    }

    checkTrigger(trigger: Trigger, time: number): void {
        console.log('Checking Trigger', trigger);
        this.triggerService.shouldBeApplied(trigger, time) ? this.triggerService.applyTrigger(trigger) : this.triggerService.removeTrigger(trigger);
    }


}
