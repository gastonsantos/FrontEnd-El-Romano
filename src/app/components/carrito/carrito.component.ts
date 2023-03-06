import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ListaProductos } from 'src/app/modulos/DataProductos';
import { CarritoService } from 'src/app/servicios/carrito.service';
//import { Form, FormGroup} from '@angular/forms';
import { Producto } from './../../modulos/DataProductos';
import { FirebaseLoginService } from 'src/app/servicios/firebase-login.service.';
import { LoginCognito } from 'src/app/servicios/loginCognito.service';
@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
})
export class CarritoComponent implements OnInit {
  cantidadCarrito: number;
  productos: ListaProductos[] = [];

  constructor(public carritoService: CarritoService, private router: Router,
    private firebaseLogin: FirebaseLoginService,
    private loginCognito: LoginCognito) {}

  ngOnInit() {
    this.productos = this.carritoService.getProductos();
  }

  total(): number {
    let sum = 0;
    this.productos.forEach((producto) => {
      sum += producto.cantidad * producto.precio;
    });
    return sum;
  }

  //carrito storage
  addToCart(producto: Producto) {
    console.log('carrito component', producto);
    this.carritoService.addToCart(producto);
  }
  estaLogueado() {
    return this.loginCognito.loggedIn();
    //return this.firebaseLogin.isLogin();
  }
  /*
  procesarCompra(){
    this.carritoService.procesarCompra;
      
  }
  */
}