import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerShowPageComponent } from './timer-show-page.component';

describe('TimerShowPageComponent', () => {
    let component: TimerShowPageComponent;
    let fixture: ComponentFixture<TimerShowPageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TimerShowPageComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TimerShowPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
