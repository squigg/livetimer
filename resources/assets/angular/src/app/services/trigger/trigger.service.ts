import { Injectable } from '@angular/core';
import { Trigger, TriggerAction, TriggerCompare } from "../../models/trigger";
import { HowlService } from "./howl.service";

export class TriggerStyleAction {

    constructor(public property: string, public value: string) {
    }
}


@Injectable()
export class TriggerService {

    constructor(private howl: HowlService) {

    }

    check(trigger: Trigger, time: number): boolean {
        if (trigger.compare_type === TriggerCompare.Exactly) {
            return time === trigger.target_time;
        }
        if (trigger.compare_type === TriggerCompare.LessThan) {
            return time < trigger.target_time;
        }
        if (trigger.compare_type === TriggerCompare.GreaterThan) {
            return time > trigger.target_time;
        }
    }

    action(trigger: Trigger) {
        if (trigger.action === TriggerAction.PlaySound) {
            this.howl.play(trigger.action_parameter);
        }
        if (trigger.action === TriggerAction.ChangeBackground) {
            return new TriggerStyleAction('background-color', trigger.action_parameter);
        }
        if (trigger.action === TriggerAction.ChangeForeground) {
            return new TriggerStyleAction('color', trigger.action_parameter);
        }
    }

}
