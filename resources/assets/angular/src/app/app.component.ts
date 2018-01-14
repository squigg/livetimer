import { Component, HostListener } from '@angular/core';
import {
    NavigationCancel,
    NavigationEnd,
    NavigationError,
    NavigationStart,
    Router,
    RouterEvent
} from "@angular/router";

import { AppService } from "./services/app.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    loading: boolean = true;
    appService: AppService;

    @HostListener('mousemove') onMouseMove() {
        this.markActivity();
    }

    constructor(router: Router, appService: AppService) {
        router.events.subscribe((event: RouterEvent) => this.navigationInterceptor(event));
        this.appService = appService;
    }

    // Shows and hides the loading spinner during RouterEvent changes
    navigationInterceptor(event: RouterEvent): void {

        if (event instanceof NavigationStart) {
            this.loading = true;
        }
        if (event instanceof NavigationEnd) {
            this.loading = false;
        }

        // Set loading state to false in both of the below events to hide the spinner in case a request fails
        if (event instanceof NavigationCancel) {
            this.loading = false;
        }
        if (event instanceof NavigationError) {
            this.loading = false;
        }
    }

    protected markActivity() {
        this.appService.setActive();
    }
}
