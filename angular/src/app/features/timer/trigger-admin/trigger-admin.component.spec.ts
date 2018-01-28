import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TriggerAdminComponent } from './trigger-admin.component';

describe('TriggerAdminComponent', () => {
    let component: TriggerAdminComponent;
    let fixture: ComponentFixture<TriggerAdminComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TriggerAdminComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TriggerAdminComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
