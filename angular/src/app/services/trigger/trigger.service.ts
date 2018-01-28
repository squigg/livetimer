import { Injectable } from '@angular/core';
import { HowlService } from "./howl.service";
import { TriggerAction, TriggerSoundAction, TriggerStyleAction } from "./trigger-actions";
import { Trigger, TriggerActionType, TriggerCompareType } from "../../models/trigger";

@Injectable()
export class TriggerService {

    private rootElement: HTMLElement;

    constructor(private howl: HowlService) {
    }

    registerHtmlElement(el: HTMLElement) {
        this.rootElement = el;
    }

    shouldBeApplied(trigger: Trigger, time: number): boolean {
        console.log('Checking Trigger', trigger);
        if (trigger.compare_type === TriggerCompareType.Exactly) {
            return time === trigger.target_time;
        }
        if (trigger.compare_type === TriggerCompareType.LessThan) {
            return time < trigger.target_time;
        }
        if (trigger.compare_type === TriggerCompareType.GreaterThan) {
            return time > trigger.target_time;
        }
    }

    setTriggerActions(trigger: Trigger): Trigger {
        let action: TriggerAction;
        if (trigger.action_type === TriggerActionType.PlaySound) {
            action = new TriggerSoundAction(trigger.action_parameters['sound'], 1, this.howl);
        }
        if (trigger.action_type === TriggerActionType.ChangeStyle) {
            action = new TriggerStyleAction(trigger.action_parameters['property'], trigger.action_parameters['value'], this.rootElement);
        }
        trigger.action = action;
        return trigger;
    }

    applyTrigger(trigger: Trigger): void {
        console.log('Applying Trigger', trigger);
        trigger.action.apply();
        trigger.action.applied = true;
    }

    removeTrigger(trigger: Trigger): void {
        if (trigger.action.applied) {
            console.log('Removing Trigger', trigger);
            trigger.action.remove();
            trigger.action.applied = false;
        }
    }
}
