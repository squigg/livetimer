import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
    selector: 'app-clock',
    templateUrl: './clock.component.html',
    styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnInit {

    @Input() time: number;
    @Input() paused: boolean;
    @Input() showHours: boolean;
    protected hours: number;
    protected minutes: number;
    protected seconds: number;

    constructor() {
    }

    ngOnChanges(changes: SimpleChanges) {
        const time = parseInt(changes['time'].currentValue);
        this.hours = Math.floor(time / (60 * 60));
        this.minutes = Math.floor(time / 60) - this.hours * 60;
        this.seconds = Math.floor(time) - this.minutes * 60;
    }

    ngOnInit() {
    }

}
