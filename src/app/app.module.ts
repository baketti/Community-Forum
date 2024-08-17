import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SharedModule } from './shared/shared.module';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from '@/app/core/interceptors/auth/auth.interceptor';
import { errorInterceptor } from '@/app/core/interceptors/error/error.interceptor';
import { networkInterceptor } from '@/app/core/interceptors/network/network.interceptor';
import { paginationHeadersInterceptor } from '@/app/core/interceptors/pagination-headers/pagination-headers.interceptor';
import { CoreModule } from './core/core.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([]),
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([
      authInterceptor,
      paginationHeadersInterceptor,
      errorInterceptor,
      networkInterceptor
    ])),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
