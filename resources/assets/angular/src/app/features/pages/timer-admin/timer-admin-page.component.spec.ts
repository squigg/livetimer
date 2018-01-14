import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerAdminPageComponent } from './timer-admin-page.component';

describe('TimerAdminPageComponent', () => {
    let component: TimerAdminPageComponent;
    let fixture: ComponentFixture<TimerAdminPageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TimerAdminPageComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TimerAdminPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
