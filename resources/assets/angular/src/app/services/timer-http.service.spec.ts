import { TestBed, inject } from '@angular/core/testing';

import { TimerHttpService } from './timer-http.service';

describe('TimerHttpService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TimerHttpService]
        });
    });

    it('should be created', inject([TimerHttpService], (service: TimerHttpService) => {
        expect(service).toBeTruthy();
    }));
});
