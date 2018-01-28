import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerListPageComponent } from './timer-list-page.component';

describe('TimerListPageComponent', () => {
    let component: TimerListPageComponent;
    let fixture: ComponentFixture<TimerListPageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TimerListPageComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TimerListPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
