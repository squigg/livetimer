import { fakeAsync, flush, inject, TestBed, tick } from '@angular/core/testing';

import { AppService } from './app.service';
import { Observable } from "rxjs/Observable";
import any = jasmine.any;

describe('AppService', () => {

    let subscribeWithSpy = (service: AppService) => {
        const obs = service.getActive();
        expect(obs).toEqual(any(Observable));
        let obSpy = jasmine.createSpy('obSpy');
        obs.subscribe((data) => {
            console.log(data);
            obSpy(data)
        });
        return obSpy;
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AppService]
        });
    });

    afterEach(fakeAsync(() => {

        }
    ));

    it('should be created', inject([AppService], (service: AppService) => {
        expect(service).toBeTruthy();
    }));

    it('should init with true', fakeAsync(inject([AppService], (service: AppService) => {
        let obSpy = subscribeWithSpy(service);
        tick(1);
        expect(obSpy.calls.count()).toEqual(1);
        expect(obSpy.calls.mostRecent().args[0]).toEqual(true);
        tick(5000);
    })));

    it('should emit false after 5 seconds', fakeAsync(inject([AppService], (service: AppService) => {
        let obSpy = subscribeWithSpy(service);
        tick(5001);
        expect(obSpy.calls.count()).toEqual(2);
        expect(obSpy.calls.mostRecent().args[0]).toEqual(false);
    })));


    it('should emit true after setActive', inject([AppService], (service: AppService) => {
        const obs = service.getActive();
        obs.subscribe((data) => {
            console.log(data);
            expect(data).toEqual(true)
        });
        service.setActive();
    }));

});
