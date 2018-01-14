import { TestBed, inject } from '@angular/core/testing';

import { TriggerService } from './trigger.service';

describe('TriggerService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TriggerService]
        });
    });

    it('should be created', inject([TriggerService], (service: TriggerService) => {
        expect(service).toBeTruthy();
    }));
});
