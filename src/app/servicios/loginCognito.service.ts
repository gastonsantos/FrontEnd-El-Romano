import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Usuario } from '../modulos/DataUsuario';

@Injectable({
	providedIn: 'root',
})

export class LoginCognito {
	usuario: Usuario;
	constructor(
		private http: HttpClient,
		private router: Router
	) {
		this.usuario ={
			userName: "",
			email: "",
			contraseña: "",
			nombre: "",
			apellido: "",
			domicilio: "",
			id: "",
			rol: "user",
			activo: false,

		  }
	 }
	 reciboDatosRegistro(userName: string,
		email: string,
		password: string,
		repetirPassword: string,
		nombre: string,
		apellido: string,
		domicilio: string){
			this.usuario.userName = userName;
   			this.usuario.email = email;
   	 		this.usuario.contraseña = password;
    		this.usuario.nombre = nombre;
    		this.usuario.apellido = apellido;
    		this.usuario.domicilio = domicilio;
			this.registrarUsuario(this.usuario).subscribe(
				res =>{
					console.log("Usuario Registrado Correctamente");

				});
		}
	


	registrarUsuario( usuario: Usuario){
			
		return this.http.post(environment.api + '/registroCognito', usuario);
	}

	loggearUsuario(email: any, contraseña: any): Observable<any>{
  
		return this.http.post(environment.api + '/loginCognito',{email, contraseña});
	  }

	  traerAtributos(token: string):Observable<any>{
		return this.http.post(environment.api + '/loginCognito',{token});
	  }

	loggedIn() {
		return !!localStorage.getItem('token');
	}

	getToken() {
		return localStorage.getItem('token');
	}

	logout() {
		localStorage.removeItem('token');
		this.router.navigate(['/login']);
	}
}
