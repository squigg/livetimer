import { environment } from '../environments/environment';

export class AppSettings {
    public static API_ROOT = environment.base_api_url;
    public static PUSHER_KEY = environment.pusher_key;
    public static SOUNDS = [
        'woop_woop',
        'railroad_crossing_bell',
        'air_horn_1',
        'alert_5',
        'bleep',
        'door_chime',
        'air_horn_2',
        'beep',
        'buzz',
    ];
}
