import { Injectable } from '@angular/core';
import { Howl } from 'howler/src/howler.core';
import { AppSettings } from "../../../config/appsettings.class";

@Injectable()
export class HowlService {

    private howls: Map<string, Howl>;

    constructor() {
        AppSettings.SOUNDS.forEach((sound) => this.createHowl(sound));
    }

    createHowl(sound: string) {
        this.howls.set(sound, new Howl({
            autoplay: false,
            src: ['/sounds/' + sound + '.mp3'],
        }));
    }

    play(sound: string) {
        this.howls.get(sound).play();
    }


}
