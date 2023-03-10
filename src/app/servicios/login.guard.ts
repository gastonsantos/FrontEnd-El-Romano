import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

import { LoginCognito } from '../servicios/loginCognito.service';

@Injectable({
	providedIn: 'root',
})

export class LoginGuard implements CanActivate {

	constructor(
		private loginCognito: LoginCognito,
		private router: Router 
	) {}

	canActivate(): boolean {
		if(this.loginCognito.loggedIn())
			return true;

		this.router.navigate(['/login']);
		return false;
	}
}
