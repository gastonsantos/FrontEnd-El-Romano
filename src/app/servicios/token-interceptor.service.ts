import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { LoginCognito } from './loginCognito.service';

@Injectable({
	providedIn: 'root', 
})

export class TokenInterceptorService implements HttpInterceptor {
	
	constructor(
		private LoginCognito: LoginCognito
	) {}

	intercept(req:any, next:any) {
		const tokenizenReq = req.clone({
			setHeaders: {
				Authorization: `Bearer ${this.LoginCognito.getToken()}`,
				
			}
		});
		return next.handle(tokenizenReq);
	}
}
