export enum TimerStatus {
    Paused = "paused",
    Stopped = "stopped",
    Started = "started",
    Complete = "complete",
}

export class Timer {

    public created: Date;
    public currentTime: number;

    constructor(public id: string,
                public name: string,
                public time: number,
                public status: TimerStatus) {
        this.created = new Date();
        this.currentTime = this.time;
    }

    // toJSON is automatically used by JSON.stringify
    toJSON(): TimerJSON {
        // copy all fields from `this` to an empty object and return in
        return Object.assign({}, this, {
            // convert fields that need converting
            created: this.created.toString()
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
                created: new Date(json.created),
            });
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
    time: number;
    status: TimerStatus;
    created: string;
}
