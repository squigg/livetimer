import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
    selector: 'app-clock',
    templateUrl: './clock.component.html',
    styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnInit {

    @Input() time: number;
    @Input() paused: boolean;
    @Input() showHours = true;
    hours: number;
    minutes: number;
    seconds: number;

    constructor() {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['time']) {
            const time = parseInt(changes['time'].currentValue);
            if (this.showHours) {
                this.hours = Math.floor(time / (60 * 60));
                this.minutes = Math.floor(time / 60) - this.hours * 60;
                this.seconds = Math.floor(time) - this.minutes * 60 - this.hours * 60 * 60;
            }
            else {
                this.minutes = Math.floor(time / 60);
                this.seconds = Math.floor(time) - this.minutes * 60;
            }
        }
    }

    ngOnInit() {
    }

}
