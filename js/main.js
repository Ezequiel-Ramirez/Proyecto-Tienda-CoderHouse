
class Lentes {
    constructor(datos) {
        this.id = parseInt(datos.id);
        this.nombre = datos.nombre;
        this.orientacion = datos.orientacion;
        this.tipo = datos.tipo;
        this.precio = parseFloat(datos.precio);
        this.vendido = false;
    }

    // METODO PARA VENDER EL PRODUCTO
    vender() {
        this.vendido = true;
        return this.vendido;
    }
    // METODO PARA VERIFICAR QUE EL PRODUCTO ESTE DISPONIBLE PARA LA VENTA
    estaDisponible() {
        return this.vendido;
    }
}
//ARRAY DE OBJETOS
const productos = [];
for (const objeto of DATOS) {
    productos.push(new Lentes(objeto));
}

//VARIABLES

let sumaParcial = 0;
const PREFIJO = "productoID";

//FUNCIONES MATEMATICAS
const multiplicacion = (a, b) => a * b;
const iva = a => a * 0.21;
const desc = a => a - (a * 0.1);
const rec = a => a + (a * 0.1);

//MUESTRO LOS PRUDUCTOS POR DOM
//elijo el sector del html
let contenedorProduct = document.getElementById("container-productos");
//  AGREGAMOS UN NUEVO ELEMENTO AL HTML POR CADA REGISTRO DE DATO ESTATICO
for (const lente of DATOS) {
    crearElemento(lente);
}
//DETECTAR EVENTOS DE COMPRA
let botones = document.getElementsByClassName("btnCompra");
console.log(botones);
for (const boton of botones) {
    boton.onclick = manejadorCompra;


}

const CARRITO = [];

function manejadorCompra(evento) {
    //determino el id del seleccionado
    let seleccionado = evento.target.id;
    //encuentro la informacion del producto relacionado a ese ID
    let producto = DATOS.find(objeto => objeto.id == seleccionado);
    //Incluyo en el carrito los productos seleccionados
    console.log(seleccionado);
    console.log(producto);
    CARRITO.push(producto);
    console.log(CARRITO);
    generarSalida(CARRITO);
    
    

}
function generarSalida(productos) {
    let body = document.getElementById("tabla").children[1];
    let inner = "";
    let padreUl = document.getElementById("listaImporte");
    let lista = "";
    for (const producto of productos) {
        inner += `<tr><td>${producto.id}</td><td><img src="${producto.img}" alt="lente 1" class="product__imgTabla" /></td><td>${producto.nombre}</td><td>${producto.precio}</td><td><input type="number" id="cantidad" min="1" max="5" value="1"></td><td><button id="${producto.id}" class="btnEliminar">X</button></td></tr>`;
        /* listado en detalle */

        lista += ` <li>Producto -> ${producto.nombre}
    <span>$ ${producto.precio * 1}</span></li>
     `;
     /* suma parcial del total gastado */
     sumaParcial += producto.precio;
        }
    body.innerHTML = inner;
    padreUl.innerHTML = lista;
    
};

//FUNCION PARA SUMA TOTAL DE IMPORTE
//MUESTRO LA SUMA TOTAL EN UL
let padre2Ul = document.getElementById("importeTotal");
function funcionImporteTotal(dato) {
    let nuevoli = document.createElement("li");
    nuevoli.innerHTML =
     `Total=
        <span>$  ${dato}</span>
        `;
        padre2Ul.appendChild(nuevoli);
    }
    
   
funcionImporteTotal(sumaParcial);

/* function generarSalida(productos) {
    
    for (const producto of productos) {
        
       agregarCarroId(producto) +
        agregarCarroFoto(producto)+
        agregarCarroNombre(producto)+
        agregarCarroPrecio(producto)+
        //agregarCarroCantidad(producto); 
       // funcionDeImporte(producto);
        funcionImporteTotal(sumaTotal);
        
    }
    
} */

//funcion para crear en elemento del DOM
function crearElemento(dato) {
    let nuevoElemento = document.createElement("div");
    //asigno un id al div
    nuevoElemento.id = PREFIJO + dato.id;
    //asigno una clase
    nuevoElemento.classList.add("product");
    //creo la plantilla del contenido
    nuevoElemento.innerHTML = `<img src="${dato.img}" alt="lente 1" class="product__img" />
<div class="product__description">
  <h3 class="product__title">${dato.nombre}</h3>
  <span class="product__price">$ ${dato.precio}</span>
</div>
<button id="${dato.id}" class="btnCompra">COMPRAR</button>
`;

    //agrego cada nodo creado al padre
    contenedorProduct.appendChild(nuevoElemento);

}




//NOTIFICAR DISPONIBILIDAD POR CONSOLA
/* for (const iterador of productos) {
    if (iterador === encontrado){
        iterador.estaDisponible();
        console.log("El producto se encuentra vendido (false)? ");
        console.log(iterador);
    }
    
} */
/* Inicio carrito */

/* let padreSelecciones = document.getElementById("filaDeSeleccionados");
//CREO FUNCION PARA AGREGAR AL CARRITO UN PRODUCTO
function agregarCarroId(prod) {
    let celda1 = document.createElement("th");
    celda1.classList.add('id');
    celda1.innerHTML = `${prod.id}`;
    padreSelecciones.appendChild(celda1);
}
function agregarCarroFoto(prod) {
    let celda2 = document.createElement("th");
    celda2.classList.add('prodFoto');
    celda2.innerHTML = `${prod.img}`;
    padreSelecciones.appendChild(celda2);
}
function agregarCarroNombre(prod) {
    let celda3 = document.createElement("th");
    celda3.classList.add('prodNombre');
    celda3.innerHTML = `${prod.nombre}`;
    padreSelecciones.appendChild(celda3);
}
function agregarCarroPrecio(prod) {
    let celda4 = document.createElement("th");
    celda4.classList.add('prodPrecio');
    celda4.innerHTML = `${prod.precio}`;
    padreSelecciones.appendChild(celda4);
}   */
//function agregarCarroCantidad(prod) {
//  let celda5 = document.createElement("th");
//  celda5.classList.add('prodCantidad');
//  celda5.innerHTML = `${cantidad}`;
//  padreSelecciones.appendChild(celda5);
//} 
//FUNCION PARA MOSTRAR SU IMPORTE A ABONAR
//MUESTRO LA SELECCIÓN POR HTML EN UL
//function funcionDeImporte(dato){
//    let padreUl = document.getElementById("listaImporte");
//   let lista = document.createElement("li");
//   lista.classList.add("lista_importe__detalle");
//   lista.innerHTML = ` Producto -> ${dato.nombre}
//   <span>$ ${dato.precio * cantidad}</span>
//                       `;
//   padreUl.appendChild(lista);
//   sumaTotal += (dato.precio*cantidad);
//  }   



//MUESTRO LA SELECCIÓN POR HTML
//agregarCarroId(encontrado);
//agregarCarroFoto(encontrado);
//agregarCarroNombre(encontrado);
//agregarCarroPrecio(encontrado);
/* let padreSelecciones = document.getElementById("filaDeSeleccionados");
let contenedor2 = document.createElement("th");
contenedor2.classList.add("col-6");
contenedor2.classList.add("container_product");
contenedor2.classList.add("p3");
contenedor2.classList.add("container_product__select");
contenedor2.innerHTML = ` <h2>Lente: ${encontrado.id} </h2>
                        <h3>Descripción: </h3>
                        <p> Sexo: ${encontrado.orientacion}</br>
                            Uso: ${encontrado.tipo}</br>
                            Precio: ${encontrado.precio}</br></p>
`;
padreSelecciones.appendChild(contenedor2); */



//agregarCarroCantidad(cantidad); 
 //OPERACIONES
/* operaciones */
/* let efectivo = multiplicacion(desc((encontrado.precio) + iva(encontrado.precio)),  cantidad);
console.log("Costo en efectivo:");
console.log(efectivo);
let unPago = multiplicacion((encontrado.precio + iva(encontrado.precio)) , cantidad);
console.log("Costo en un pago:");
console.log(unPago);
let recargo = multiplicacion(rec((encontrado.precio) + iva(encontrado.precio)),  cantidad);
console.log("Costo con tarjeta:");
console.log(recargo);
*/





/* Fin Carrito */

/* function funcionDeImporteUnpago(dato){
let padreSelecciones = document.getElementById("filaDeSeleccionados");
let contenedor2 = document.createElement("div");
contenedor2.classList.add("col-6");
contenedor2.classList.add("container_product");
contenedor2.classList.add("p3");
contenedor2.classList.add("container_product__select");
contenedor2.innerHTML = ` <h2>Importe a abonar en Un Pago:</h2>
                        <h3>$ ${dato}</h3></br>
                        <p> "Gracias por tu compra".!!!</p>
`;
padreSelecciones.appendChild(contenedor2);
} */
/* function funcionDeImporteRecargo(dato){
let padreSelecciones = document.getElementById("filaDeSeleccionados");
let contenedor2 = document.createElement("div");
contenedor2.classList.add("col-6");
contenedor2.classList.add("container_product");
contenedor2.classList.add("p3");
contenedor2.classList.add("container_product__select");
contenedor2.innerHTML = ` <h2>Importe a abonar en Cuotas:</h2>
                        <h3>$ ${dato}</h3></br>
                        <p> "Gracias por tu compra".!!!</p>
`;
padreSelecciones.appendChild(contenedor2);
} */
//MEDIO DE PAGO
//let metodoPago = parseInt(prompt("Ingrese la forma de pago (DIGITE SU NUMERO): \n 1 - Efectivo \n 2 - Tarjeta un pago \n 3 - Tarjeta en cuotas"));


//MODIFICAR PRODUCTO A VENDIDO= TRUE
/* for (const iterador of productos) {
   if (iterador === producto){
       iterador.vender(); */
/* console.log("El producto ahora se encuentra vendido (true)");
console.log(iterador); */
  //  }

//}
//NOTIFICAR DISPONIBILIDAD POR CONSOLA
/* for (const iterador of productos) {
    if (iterador === encontrado){
        iterador.estaDisponible();
        console.log("El producto se encuentra  ahora vendido (true)? ");
        console.log(iterador);
    }

}
 */
//alert("GRACIAS POR TU COMPRA");
