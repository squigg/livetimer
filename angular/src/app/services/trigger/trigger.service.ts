import { Injectable } from '@angular/core';
import { HowlService } from "./howl.service";
import { TriggerAction, TriggerSoundAction, TriggerStyleAction } from "./trigger-actions";
import { Trigger, TriggerActionType, TriggerCompareType } from "../../models/trigger";
import SelectOption from "../../shared/classes/select-option";
import { AppSettings } from "../../../config/appsettings.class";

@Injectable()
export class TriggerService {

    private rootElement: HTMLElement;
    public compareOptions: SelectOption[];
    public soundOptions: SelectOption[];
    public actionOptions: SelectOption[];

    constructor(private howl: HowlService) {
        this.compareOptions = Object.keys(TriggerCompareType).map((key, index) => new SelectOption(key, Object.values(TriggerCompareType)[index]));
        this.actionOptions = Object.keys(TriggerActionType).map((key, index) => new SelectOption(key, Object.values(TriggerActionType)[index]));
        this.soundOptions = AppSettings.SOUNDS.map((value, index) => new SelectOption(value, value));
    }

    registerHtmlElement(el: HTMLElement) {
        this.rootElement = el;
    }

    shouldBeApplied(trigger: Trigger, time: number): boolean {

        if (!this.rootElement) return false;

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

    removeDuplicates(triggersToAdd: Trigger[], triggersToRemove: Trigger[]): Trigger[] {
        return triggersToRemove.filter((t) => triggersToAdd.every((ti) => ti.action_parameters.property !== t.action_parameters.property));
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

    applyTrigger(trigger: Trigger, complete: boolean): void {

        if (complete && trigger.action_type == TriggerActionType.PlaySound) return;

        trigger.action.apply();
        // trigger.action.applied = true;
    }

    removeTrigger(trigger: Trigger): void {
        // if (trigger.action.applied) {
        trigger.action.remove();
        // trigger.action.applied = false;
        // }
    }

    testSound(sound: string) {
        this.howl.play(sound);
    }

    sortTriggers(triggersToAdd: Trigger[]) {
        triggersToAdd = triggersToAdd.sort((a, b) => {
            if (a.compare_type === b.compare_type) return 0;
            return a.compare_type === TriggerCompareType.Exactly ? 1 : -1;
        });
        triggersToAdd = triggersToAdd.sort((a, b) => {
            if (a.target_time === b.target_time) return 0;
            return a.target_time < b.target_time ? 1 : -1;
        });
        console.log('triggers', triggersToAdd);
        return triggersToAdd;
    }
}
