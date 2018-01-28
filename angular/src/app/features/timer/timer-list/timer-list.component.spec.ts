import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerListComponent } from './timer-list.component';

describe('TimerListPageComponent', () => {
    let component: TimerListComponent;
    let fixture: ComponentFixture<TimerListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TimerListComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TimerListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
