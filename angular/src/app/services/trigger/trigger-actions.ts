interface IAudioPlayer {
    play(sound: string);

    stop(sound: string);
}

export interface TriggerActionParam {
    [key: string]: string
}

export abstract class TriggerAction {

    applied: boolean = false;

    abstract apply(): void;

    abstract remove(): void;
}

export class TriggerStyleAction extends TriggerAction {

    private previousValue;

    constructor(public property: string, public value: string, public el: HTMLElement) {
        super();
    }

    apply(): void {
        if (!this.applied) this.previousValue = this.el.style.getPropertyValue(this.property);
        this.el.style.setProperty(this.property, this.value);
    }

    remove(): void {
        if (this.previousValue) {
            this.el.style.setProperty(this.property, this.previousValue);
        }
        else {
            this.el.style.removeProperty(this.property);
        }
    }
}

export class TriggerSoundAction extends TriggerAction {

    constructor(public sound: string, public repeat = 1, public player: IAudioPlayer) {
        super();
    }

    apply(): void {
        this.player.play(this.sound);
    }

    remove(): void {
        //this.player.stop(this.sound);
    }
}
