import * as moment from "moment";
import { Moment } from "moment";

export enum TimerStatus {
    Paused = "paused",
    Stopped = "stopped",
    Started = "started",
    Complete = "complete",
}

export class Timer {

    public now: Moment;
    public finishAt: Moment;
    public startedAt: Moment;

    constructor(public id: string,
                public name: string,
                public duration: number,
                public remaining: number,
                public status: TimerStatus) {
        this.now = moment();
        this.startedAt = moment();
        this.finishAt = moment().add(duration, 'seconds');
    }

    // toJSON is automatically used by JSON.stringify
    toJSON(): TimerJSON {
        // copy all fields from `this` to an empty object and return in
        return Object.assign({}, this, {
            // convert fields that need converting
            now: this.now.format(),
            finish_at: this.finishAt.format(),
            started_at: this.startedAt.format()
        });
    }

    // fromJSON is used to convert an serialized version
    // of the Timer to an instance of the class
    static fromJSON(json: TimerJSON | string): Timer {
        if (typeof json === 'string') {
            // if it's a string, parse it first
            return JSON.parse(json, Timer.reviver);
        } else {
            // create an instance of the Timer class
            let timer = Object.create(Timer.prototype);
            // copy all the fields from the json object
            return Object.assign(timer, json, {
                // convert fields that need converting
                now: moment(json.now),
                finishAt: moment(json.finish_at),
                startedAt: moment(json.started_at),
                duration: parseInt(json.duration as string),
                remaining: parseInt(json.remaining as string),
            })
        }
    }

    // reviver can be passed as the second parameter to JSON.parse
    // to automatically call Timer.fromJSON on the resulting value.
    static reviver(key: string, value: any): any {
        return key === "" ? Timer.fromJSON(value) : value;
    }
}

// A representation of Timer's data that can be converted to
// and from JSON without being altered.
export interface TimerJSON {
    id: string;
    name: string;
    duration: number | string;
    remaining: number | string;
    finish_at: string;
    started_at: string;
    now: string;
    status: TimerStatus;
}

// A representation of Timer's data with variable parameters
export interface TimerPartial {
    id?: string;
    name?: string;
    duration?: number;
    remaining?: number;
    finishAt?: string;
    startedAt?: string;
    now?: string;
    status?: TimerStatus;
}
