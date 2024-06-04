import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { errorInterceptor} from './_interceptors/error.interceptor';
import { jwtInterceptor } from './_interceptors/jwt.interceptor';
import { loadingInterceptor } from './_interceptors/loading.interceptor';

 
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    provideHttpClient(withFetch()),
    provideAnimations(),
    provideToastr(),
    provideHttpClient(withInterceptors([errorInterceptor, jwtInterceptor, loadingInterceptor]) )
  ]
 
};