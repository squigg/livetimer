import { HideOnInactiveDirective } from './hide-on-inactive.directive';
import { inject } from "@angular/core/testing";

describe('HideOnInactiveDirective', () => {

    it('should be created', inject([HideOnInactiveDirective], (directive: HideOnInactiveDirective) => {
        expect(directive).toBeTruthy();
    }));
});
