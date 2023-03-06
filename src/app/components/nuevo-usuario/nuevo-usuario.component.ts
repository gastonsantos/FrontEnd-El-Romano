import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { FirebaseLoginService } from 'src/app/servicios/firebase-login.service.';
import { LoginCognito } from 'src/app/servicios/loginCognito.service';
import { Usuario } from 'src/app/modulos/DataUsuario';
@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styleUrls: ['./nuevo-usuario.component.css'],
})
export class NuevoUsuarioComponent implements OnInit {
  registrarUsuario: FormGroup;
  items: Observable<any>[];
  usuario: Usuario;
  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private router: Router,
    private http: HttpClient,
    private firebaseLogin: FirebaseLoginService,
    private loginCognito: LoginCognito
  ) {
    this.registrarUsuario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)]],
      
      name: ['', [Validators.required]],
      usuario: ['', Validators.required],
      repetirPassword: ['', [Validators.required]],
      apellido: ['', Validators.required],
      domicilio: ['', Validators.required],
    });
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

  ngOnInit(): void {
    const url = environment.firebase + 'usuario.json';
    // this.http.get<any>(url).subscribe((data) => {
    //   console.log(data);
    // });
  }

  registrar() {
    
    const usuario1 = this.registrarUsuario.value.usuario;
    const email = this.registrarUsuario.value.email;
    const password = this.registrarUsuario.value.password;
    const repetirPassword = this.registrarUsuario.value.repetirPassword;
    if(password !== repetirPassword){
      alert("Las contraseñas deben coincidir");
      return;
    }
    const nombre = this.registrarUsuario.value.name;
    const apellido = this.registrarUsuario.value.apellido;
    const domicilio = this.registrarUsuario.value.domicilio;
    

    this.usuario.email = this.registrarUsuario.value.email;
    this.usuario.domicilio = this.registrarUsuario.value.domicilio;
    this.usuario.nombre = this.registrarUsuario.value.name; 
    this.usuario.apellido = this.registrarUsuario.value.apellido;
    this.usuario.userName = this.registrarUsuario.value.usuario;

    // console.log(email, password, repetirPassword, usuario, name, apellido, domicilio);
    this.loginCognito.reciboDatosRegistro(usuario1,
      email,
      password,
      repetirPassword,
      nombre,
      apellido,
      domicilio);
/*
    this.firebaseLogin.signupFirebase(
      usuario1,
      email,
      password,
      repetirPassword,
      nombre,
      apellido,
      domicilio
    );
    */


  }
}
