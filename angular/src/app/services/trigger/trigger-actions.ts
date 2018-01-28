interface IAudioPlayer {
    play(sound: string);

    stop(sound: string);
}

export interface TriggerActionParam {
    [key: string]: string
}

export abstract class TriggerAction {
    abstract apply(): void;

    abstract remove(): void;
}

export class TriggerStyleAction {

    private previousValue;

    constructor(public property: string, public value: string, public el: HTMLElement) {
    }

    apply(): void {
        this.previousValue = this.el.style.getPropertyValue(this.property);
        this.el.style.setProperty(this.property, this.value);
    }

    remove(): void {
        if (this.previousValue) {
            this.el.style.setProperty(this.property, this.value);
        }
        else {
            this.el.style.removeProperty(this.property);
        }
    }
}

export class TriggerSoundAction {

    constructor(public sound: string, public repeat = 1, public player: IAudioPlayer) {
    }

    apply(): void {
        this.player.play(this.sound);
    }

    remove(): void {
        //this.player.stop(this.sound);
    }
}
