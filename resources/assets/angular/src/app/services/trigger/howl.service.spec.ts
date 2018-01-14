import { TestBed, inject } from '@angular/core/testing';

import { HowlService } from './howl.service';

describe('HowlService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [HowlService]
        });
    });

    it('should be created', inject([HowlService], (service: HowlService) => {
        expect(service).toBeTruthy();
    }));
});
