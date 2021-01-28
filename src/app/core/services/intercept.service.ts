import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InterceptService implements HttpInterceptor {
	// intercept request and add token
	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
    const reqUrl = request.clone({
      url:`${request.url}?${environment.MARVEL_AUTHORIZATION_API}`
    })
		return next.handle(reqUrl).pipe(
			tap(
				event => {
					 if (event instanceof HttpResponse) {
					}
				},
				error => {
				}
			)
		);
	}
}
