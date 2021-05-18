//"Bienvenido a tu tienda ON-LINE";

let eleccion = "";
let encontrado = [];
let carrito = [];
let SELECCIONES = [];





//MUESTRO LOS PRUDUCTOS POR DOM
//elijo el sector del html
let contenedorProduct = document.getElementById("container-productos");
//  AGREGAMOS UN NUEVO ELEMENTO AL HTML POR CADA REGISTRO DE DATO ESTATICO
for (const lente of DATOS) {
    crearElemento(lente);
}
//funcion para crear en elemento del DOM
function crearElemento(dato){
let nuevoElemento = document.createElement("div");
//asigno una clase
nuevoElemento.classList.add("product");
//creo la plantilla del contenido
nuevoElemento.innerHTML = `<img src="img/lente1.jpg" alt="lente 1" class="product__img" />
<div class="product__description">
  <h3 class="product__title">${dato.nombre}</h3>
  <span class="product__price">$ ${dato.precio}</span>
</div>
<button id="${dato.nombre}"><i  class="product__icon fas fa-cart-plus" ></i></button>


`;
//agrego cada nodo creado al padre
contenedorProduct.appendChild(nuevoElemento);
//BUSCAMOS EL BOTON CREADO
let boton = document.getElementById(dato.nombre);
//ASOCIAMOS AL EVENTO CLICK EL MANEJADOR DE EVENTOS
boton.onclick = () => {
    alert("AGREGADO A TU CARRITO LENTE: " + dato.nombre);
    eleccion = dato.nombre;
    console.log(eleccion);

    
};
};


//carrito.push(DATOS.find(x => x.nombre === eleccion));
//console.log(carrito);



//BUSCO EL PRODUCTO SELECCIONADO
//encontrado.push( DATOS.find(x => x.id === eleccion));
//console.log("Producto seleccionado: ");
//console.log(encontrado);

//NOTIFICAR DISPONIBILIDAD POR CONSOLA
for (const iterador of productos) {
    if (iterador === encontrado){
        iterador.estaDisponible();
        console.log("El producto se encuentra vendido (false)? ");
        console.log(iterador);
    }
    
}
/* Inicio carrito */
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
 for (const iterador of productos) {
    if (iterador === encontrado){
        iterador.vender();
        /* console.log("El producto ahora se encuentra vendido (true)");
        console.log(iterador); */
    }
    
}
//NOTIFICAR DISPONIBILIDAD POR CONSOLA
for (const iterador of productos) {
    if (iterador === encontrado){
        iterador.estaDisponible();
        console.log("El producto se encuentra  ahora vendido (true)? ");
        console.log(iterador);
    }
    
}

//alert("GRACIAS POR TU COMPRA");






