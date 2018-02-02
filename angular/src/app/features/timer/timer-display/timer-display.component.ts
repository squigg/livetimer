import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Timer, TimerStatus } from "../../../models/timer";
import { Trigger } from "../../../models/trigger";
import { TriggerService } from "../../../services/trigger/trigger.service";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Component({
    selector: 'app-timer-display',
    templateUrl: './timer-display.component.html',
    styleUrls: ['./timer-display.component.scss']
})
export class TimerDisplayComponent implements OnInit, OnChanges {

    @Input() timer: Timer;
    @Input() triggers: Trigger[] = [];
    @ViewChild('clockWrapper') clockWrapper: ElementRef;

    private initialised$ = new BehaviorSubject<boolean>(false);

    constructor(private triggerService: TriggerService) {
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.triggerService.registerHtmlElement(this.clockWrapper.nativeElement);
        this.initialised$.next(true);
    }

    getRemaining(): number {
        return this.timer ? this.timer.remaining : 0;
    }

    getPaused(): boolean {
        return this.timer ? this.timer.status === TimerStatus.Paused : false;
    }

    getShowHours(): boolean {
        if (!this.timer) return false;
        return this.timer.duration > (60 * 60) || this.timer.remaining > (60 * 60);
    }

    ngOnChanges(changes: SimpleChanges) {

        if (changes.triggers) {
            this.initialised$.filter((v) => v).take(1).subscribe((v) => {
                this.createTriggerActions();
                this.checkTriggers();
            });
        }

        if (changes.timer && changes.timer.currentValue) {
            this.checkTriggers();
        }
    }

    triggersAreValid(): boolean {
        return this.triggers && this.triggers.constructor === Array;
    }

    createTriggerActions(): void {
        if (this.triggersAreValid()) {
            this.triggers.forEach((trigger) => this.triggerService.setTriggerActions(trigger));
        }
    }

    checkTriggers(): void {
        if (this.triggersAreValid()) {
            let triggersToAdd = this.triggers.filter((trigger) => this.triggerService.shouldBeApplied(trigger, this.timer.remaining));
            let triggersToRemove = this.triggers.filter((trigger) => !this.triggerService.shouldBeApplied(trigger, this.timer.remaining));
            triggersToRemove = this.triggerService.removeDuplicates(triggersToAdd, triggersToRemove);
            triggersToAdd = this.triggerService.sortTriggers(triggersToAdd);
            this.applyTriggers(triggersToAdd, triggersToRemove);
        }
    }

    applyTriggers(triggersToAdd: Trigger[], triggersToRemove: Trigger[]): void {
        triggersToRemove.forEach((trigger) => this.triggerService.removeTrigger(trigger));
        triggersToAdd.forEach((trigger) => this.triggerService.applyTrigger(trigger, this.timer.status === TimerStatus.Complete));
    }

}
