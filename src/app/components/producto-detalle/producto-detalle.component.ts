import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Producto } from 'src/app/modulos/DataProductos';
import { ProductosService } from 'src/app/servicios/productos.service';
import { ListaProductos } from './../../modulos/DataProductos';
import { CarritoService } from 'src/app/servicios/carrito.service';
import { LoginCognito } from 'src/app/servicios/loginCognito.service';
@Component({
  selector: 'app-producto-detalle',
  templateUrl: './producto-detalle.component.html',
  styleUrls: ['./producto-detalle.component.css'],
})
export class ProductoDetalleComponent implements OnInit {
  productoDetalle: Producto = new Producto();
  cantidad: number[] = [];
  numValue: number = 1;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: RouterModule,
    private productoService: ProductosService,
    public carritoService: CarritoService,
    private loginCognito: LoginCognito
  ) {}
 

  ngOnInit(): void {

    

   this.productoDetalle.nombre= "asd";
    
    const id = this.activatedRoute.snapshot.params.id;
    this.productoService.getProductoById(id).subscribe(
      (data) => {
        const datas = JSON.stringify(data); //convertir a string
        const datos = JSON.parse(datas); //convertir a objeto
        //this.productoDetalle.nombre = <string>data[0].nombre;
        //console.log(datas);
        //console.log(data);
        console.log(datos);
        console.log("los datos", data);
        //***PARA MONGODB */
        this.productoDetalle.nombre = data.nombre;
        this.productoDetalle.id = data.id; //asignar el id
        this.productoDetalle.autor = data.autor;
        this.productoDetalle.calificacion = data.calificacion;
        this.productoDetalle.descripcion = data.descripcion; //asignar la altura
        this.productoDetalle.precio = data.precio; //asignar el peso
        this.productoDetalle.imagen = data.imagen; //la imagen
        this.productoDetalle.categoria = data.categoria;
        this.productoDetalle.stock = data.stock;
        this.productoDetalle.cantidad = data.cantidad;
        this.productoDetalle.cantidad = 1;

        //**********para SQL */
        /*
        this.productoDetalle.nombre = <string>datos[0].nombre;
        this.productoDetalle.id = <string>datos[0].id; //asignar el id
        this.productoDetalle.autor = <string>datos[0].autor;
        this.productoDetalle.calificacion = <number>datos[0].calificacion;
        this.productoDetalle.descripcion = <string>datos[0].descripcion; //asignar la altura
        this.productoDetalle.precio = <number>datos[0].precio; //asignar el peso
        this.productoDetalle.imagen = <string>datos[0].imagen; //la imagen
        this.productoDetalle.categoria = <string>datos[0].categoria;
        this.productoDetalle.stock = <number>datos[0].stock;
        this.productoDetalle = <any>data;
        this.productoDetalle.cantidad = <number>datos[0].cantidad;
        this.productoDetalle.cantidad = 1;
         */
      },
      (err) => {
        console.log('Error al traer los detalles del producto');
      }
    );
  }

  numSequence(n: number): Array<number> {
    return Array(n);
  }

  setCantidad(producto: any) {
    if (producto.cantidad > producto.stock) {
      producto.cantidad = 1;
    }
  }

  upProductQuantity(product: ListaProductos): void {
    if (product.stock > product.cantidad) product.cantidad++;
  }

  downProductQuantity(product: ListaProductos): void {
    if (product.cantidad > 1) {
      product.cantidad--;
    }
  }

  verificarCantidad(product: ListaProductos): void {
    if (
      product.stock < product.cantidad ||
      product.cantidad < 0 ||
      product.cantidad === null
    ) {
      product.cantidad = 1;
    }
  }

  //carrito
  addToCart(producto: Producto) {
    this.carritoService.addToCart(producto);
  }
}