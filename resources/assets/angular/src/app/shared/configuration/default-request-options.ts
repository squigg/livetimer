import { Injectable } from "@angular/core";
import { BaseRequestOptions } from "@angular/http";

@Injectable()
export class DefaultRequestOptions extends BaseRequestOptions {
    constructor() {
        super();

        //this.headers.set('Content-Type', 'application/vnd.api+json');
    }
}
