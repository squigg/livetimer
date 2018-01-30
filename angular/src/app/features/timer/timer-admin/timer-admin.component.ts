import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { TimerHttpService } from "../../../services/timer/timer-http.service";
import { Timer, TimerStatus } from "../../../models/timer";
import { Trigger } from "../../../models/trigger";
import SelectOption from "../../../shared/classes/select-option";

@Component({
    selector: 'app-timer-admin',
    templateUrl: './timer-admin.component.html',
    styleUrls: ['./timer-admin.component.scss']
})
export class TimerAdminComponent implements OnInit {

    @Input() timer: Timer;
    @Input() triggers: Trigger[];
    @Input() templates: Timer[];

    templateOptions: SelectOption[];
    templateId: string;

    duration: number;
    name: string;
    finishAt: Date;

    constructor(protected timerHttpService: TimerHttpService) {
    }

    ngOnInit() {

    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.templates) {
            this.templateOptions = changes.templates.currentValue.map((t) => new SelectOption(t.name, t.id));
        }
        if (changes.timer) {
            this.name = changes.timer.currentValue.name;
            this.duration = changes.timer.currentValue.duration;
        }
    }

    ngOnDestroy() {
    }

    pause() {
        this.timerHttpService.pause(this.timer.id, this.timer.remaining);
    }

    stop() {
        this.timerHttpService.stop(this.timer.id, this.timer.remaining);
    }

    resume() {
        this.timerHttpService.resume(this.timer.id);
    }

    start() {
        this.timer.status === TimerStatus.Stopped
            ? this.resume()
            : this.timerHttpService.start(this.timer.id);
    }

    restart() {
        this.timerHttpService.start(this.timer.id);
    }

    reset() {
        this.timerHttpService.reset(this.timer.id);
    }

    setDuration() {
        this.timerHttpService.update(this.timer.id, {duration: this.duration})
    }

    setFinish() {
        this.timerHttpService.updateFinishAt(this.timer.id, this.finishAt)
    }

    setName() {
        this.timerHttpService.update(this.timer.id, {name: this.name})
    }

    copyTemplate() {
        this.timerHttpService.copyTemplate(this.timer.id, this.templateId);
    }

    showPause(): boolean {
        return this.timer.status === TimerStatus.Started;
    }

    showResume(): boolean {
        return this.timer.status === TimerStatus.Paused;
    }

    showStart(): boolean {
        return this.timer.status === TimerStatus.Stopped;
    }

    showStop(): boolean {
        return (this.timer.status === TimerStatus.Started) || (this.timer.status === TimerStatus.Paused);
    }
}
