import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerShowComponent } from './timer-show.component';

describe('TimerShowComponent', () => {
    let component: TimerShowComponent;
    let fixture: ComponentFixture<TimerShowComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TimerShowComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TimerShowComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
