import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { authInterceptor } from './services/interceptors/auth/auth.interceptor';
import { errorInterceptor } from './services/interceptors/error/error.interceptor';
import { networkInterceptor } from './services/interceptors/network/network.interceptor';
import { paginationHeadersInterceptor } from './services/interceptors/pagination-headers/pagination-headers.interceptor';
import { SharedModule } from './shared/shared.module';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { StoreModule } from '@ngrx/store';
import { Action, createReducer, on } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

const initialState = {};

const _mockReducer = createReducer(initialState);

export function mockReducer(state: any, action: Action) {
  return _mockReducer(state, action);
}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        StoreModule.forRoot({ mock: mockReducer }),
        EffectsModule.forRoot([]),
        BrowserModule,
        AppRoutingModule,
        SharedModule,
        CoreModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        provideAnimationsAsync(),
        provideHttpClient(withInterceptors([
          authInterceptor,
          paginationHeadersInterceptor,
          errorInterceptor,
          networkInterceptor
        ])),
        provideHttpClientTesting(),
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'users-bmt'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('users-bmt');
  });
});
