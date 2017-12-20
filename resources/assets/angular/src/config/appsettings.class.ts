import { environment } from '../environments/environment';

export class AppSettings {
    public static API_ROOT = environment.base_api_url;
    public static PUSHER_KEY = environment.pusher_key;
}
