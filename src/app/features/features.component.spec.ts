import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturesComponent } from './features.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FeaturesRoutingModule } from './features-routing.module';
import { StoreModule } from '@ngrx/store';
import { mockReducer } from '@/app/app.component.spec';
import { EffectsModule } from '@ngrx/effects';

describe('FeaturesComponent', () => {
  let component: FeaturesComponent;
  let fixture: ComponentFixture<FeaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        FeaturesComponent
      ],
      imports: [
        StoreModule.forRoot({ mock: mockReducer }),
        EffectsModule.forRoot([]),
        CommonModule,
        FeaturesRoutingModule,
        SharedModule,
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
