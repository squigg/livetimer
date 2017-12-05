import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerAdminComponent } from './timer-admin.component';

describe('TimerAdminComponent', () => {
    let component: TimerAdminComponent;
    let fixture: ComponentFixture<TimerAdminComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TimerAdminComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TimerAdminComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
