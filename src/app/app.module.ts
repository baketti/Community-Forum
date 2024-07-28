import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SharedModule } from './shared/shared.module';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from '@/app/services/interceptors/auth/auth.interceptor';
import { errorInterceptor } from '@/app/services/interceptors/error/error.interceptor';
import { networkInterceptor } from '@/app/services/interceptors/network/network.interceptor';
import { paginationHeadersInterceptor } from '@/app/services/interceptors/pagination-headers/pagination-headers.interceptor';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    CoreModule
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
