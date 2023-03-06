import { Component, OnInit, ViewChild,Output, EventEmitter } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { LoginCognito }  from 'src/app/servicios/loginCognito.service';
import { FirebaseLoginService } from 'src/app/servicios/firebase-login.service.';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Usuario } from 'src/app/modulos/DataUsuario';
import jwt_decode from "jwt-decode";



@Component({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.component.html',
  styleUrls: ['./login-usuario.component.css'],
})
export class LoginUsuarioComponent implements OnInit {
  loginUsuario: FormGroup;
  recuperoClave:FormGroup;
  @ViewChild('closeLogin') closeLogin: any;
  @ViewChild('closeRecuperarClave') closeRecuperarClave: any;

  userName: string;

  constructor(
    private fb: FormBuilder,
    private firebaseLogin: FirebaseLoginService,
    private router: Router,
    private usuarioService: UsuarioService,
    private loginCognito: LoginCognito
  ) {
    this.loginUsuario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,Validators.minLength(6)]],
    });

    this.recuperoClave = this.fb.group({
      emailRecuperar: ['', [Validators.required, Validators.email]]
    });
  }
 
  
 

  ngOnInit(): void {
   

  }



  login() {
  
    const email = this.loginUsuario.value.email;
    const password = this.loginUsuario.value.password;
     //this.firebaseLogin.loginFirebase(email, password);
     

     this.loginCognito.loggearUsuario(email, password).subscribe(res => {
      
      console.log(res.token);
      console.log(res.atributos[8].Value);
      this.userName = res.atributos[8].Value;
      //this.traerAtributos(JSON.stringify(res.token));
      localStorage.setItem('token', JSON.stringify(res.token));
      localStorage.setItem('atributos', JSON.stringify(this.userName));
      localStorage.setItem('uid',res.atributos[0].Value);
     
    });
    
    
    this.closeLogin.nativeElement.click();

    

    this.router.navigate(["/"]);

       }
  cambiarModal():void{
    this.closeLogin.nativeElement.click();
  }
  enviarClave(){
    const email = this.recuperoClave.value.emailRecuperar;
    console.log(email);
    this.firebaseLogin.recuperarClave(email);
    this.closeRecuperarClave.nativeElement.click();
  } 


  
  

  

}
