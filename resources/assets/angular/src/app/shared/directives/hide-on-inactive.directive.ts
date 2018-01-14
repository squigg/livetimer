import { Directive, ElementRef } from '@angular/core';
import { AppService } from "../../services/app.service";

@Directive({
    selector: '[appHideOnInactive]'
})
export class HideOnInactiveDirective {

    constructor(protected appService: AppService, protected el: ElementRef) {
        el.nativeElement.classList.add('animated');
        el.nativeElement.classList.add('fadeIn');
        this.appService.getActive()
            .subscribe((active) => active ? this.fadeIn() : this.fadeOut());
    }

    fadeIn(): void {
        this.el.nativeElement.classList.remove('fadeOut');
        this.el.nativeElement.classList.add('fadeIn');
    }

    fadeOut(): void {
        this.el.nativeElement.classList.remove('fadeIn');
        this.el.nativeElement.classList.add('fadeOut');
    }
}
