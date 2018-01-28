import { TriggerAction, TriggerActionParam } from "../services/trigger/trigger-actions";

export enum TriggerActionType {
    PlaySound = "play_sound",
    ChangeStyle = "change_style",
}

export enum TriggerCompareType {
    Exactly = "exactly",
    LessThan = "less_than",
    GreaterThan = "greater_than",
}

export class Trigger {

    public action: TriggerAction;

    constructor(public id: string,
                public name: string,
                public enabled: boolean,
                public target_time: number,
                public compare_type: TriggerCompareType,
                public action_type: TriggerActionType,
                public action_parameters: TriggerActionParam[]) {
    }

    // toJSON is automatically used by JSON.stringify
    toJSON(): TriggerJSON {
        // copy all fields from `this` to an empty object and return in
        return Object.assign({}, this, {
            // convert fields that need converting
        });
    }

    // fromJSON is used to convert an serialized version
    // of the Trigger to an instance of the class
    static fromJSON(json: TriggerJSON | string): Trigger {
        if (typeof json === 'string') {
            // if it's a string, parse it first
            return JSON.parse(json, Trigger.reviver);
        } else {
            // create an instance of the Trigger class
            let trigger = Object.create(Trigger.prototype);
            // copy all the fields from the json object
            return Object.assign(trigger, json, {
                // convert fields that need converting
            })
        }
    }

    // reviver can be passed as the second parameter to JSON.parse
    // to automatically call Trigger.fromJSON on the resulting value.
    static reviver(key: string, value: any): any {
        return key === "" ? Trigger.fromJSON(value) : value;
    }
}

// A representation of Trigger's data that can be converted to
// and from JSON without being altered.
export interface TriggerJSON {
    id: string;
    name: string;
    target_time: number;
    compare_type: TriggerCompareType;
    action_type: TriggerActionType;
    action_parameters: TriggerActionParam[];
    enabled: boolean;
}
