import { TestBed, inject } from '@angular/core/testing';

import { TriggerHttpService } from './trigger-http.service';

describe('TriggerHttpService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TriggerHttpService]
        });
    });

    it('should be created', inject([TriggerHttpService], (service: TriggerHttpService) => {
        expect(service).toBeTruthy();
    }));
});
