import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkErrorComponent } from './network-error.component';
import { MatCardModule } from '@angular/material/card';

describe('NetworkErrorComponent', () => {
  let component: NetworkErrorComponent;
  let fixture: ComponentFixture<NetworkErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NetworkErrorComponent],
      imports: [MatCardModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NetworkErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
