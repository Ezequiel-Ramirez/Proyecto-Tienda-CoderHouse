
class Lentes {
    constructor(datos) {
        this.id = parseInt(datos.id);
        this.img = datos.img;
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
const carritoStorage = [];
let almacenados = "";

function manejadorCompra(evento) {
    //determino el id del seleccionado
    let seleccionado = evento.target.id;
    //encuentro la informacion del producto relacionado a ese ID
    let producto = new Lentes(DATOS.find(objeto => objeto.id == seleccionado));
    //Incluyo en el carrito los productos seleccionados
    //console.log(seleccionado);
    //console.log(producto);
    CARRITO.push(producto);
    console.log(CARRITO);
    //guardarLocal(CARRITO);
    saveToLocal("productoCarro", CARRITO);
    getFromLocal("productoCarro");
    console.log(carritoStorage);
    //genero salida a traves del localStorage
    generarSalida(carritoStorage);
    // Calculamos  el precio
    calcularTotal();
    
    //puedo usar los metodos de la clase ya una vez hecho el new Lentes:
    //CARRITO[0].estaDisponible();
    //console.log(CARRITO[0].vendido);
}


function manejadorEliminar(evento) {//a revisar
   
    //determino el id del seleccionado
    seleccionadox = evento.target.id;
    console.log(seleccionadox);
    //encuentro el producto relacionado a ese id
    let productox = carritoStorage.find(objeto => objeto.id == seleccionadox);
    let producto = CARRITO.find(objeto => objeto.id == seleccionadox);
    //busco la posicion de ese id en el array
    let posicion = carritoStorage.findIndex(numero => numero == productox);
    console.log(posicion);
    let posicionx = CARRITO.findIndex(numero => numero == producto);
    console.log(posicionx);
    //lo borro del array
    carritoStorage.splice(posicion, 1);
    CARRITO.splice(posicionx, 1);
    //vuelvo a recargar el localStorage
    saveToLocal("productoCarro", CARRITO);
    //vuelvo a cargar carrito
    generarSalida(carritoStorage);
    // Calculamos de nuevo el precio
    calcularTotal();
    
};

// Eliminar los productos
function limpiarHTML(contenedor) {
    contenedor = '';
};

//IMPRIMO EN EL SECTOR CARRITO LOS PRODUCTOS SELECCIONADOS
function generarSalida(productos) {
    let body = document.getElementById("tabla").children[1];
    //vacio todo el contenedor
    limpiarHTML(body);
  
    let inner = "";

    let padreUl = document.getElementById("listaImporte");
//vacio todo el contenedor
    padreUl.textContent = "";
    let lista = "";

    for (const producto of productos) {
        inner += `<tr><td>${producto.id}</td><td><img src="${producto.img}" alt="lente 1" class="product__imgTabla" /></td><td>${producto.nombre}</td><td>${producto.precio}</td><td><input type="number" id="cantidad" min="1" max="5" value="1"></td><td><button id="${producto.id}" class="btnEliminar">X</button></td></tr>`;
        /* listado en detalle */
        lista += ` <li>Producto -> ${producto.nombre}
       <span>$ ${producto.precio * 1}</span></li>
       `;
    }
    body.innerHTML = inner;
    padreUl.innerHTML = lista;

//DETECTA EVENTO DE BORRAR COMPRA
let botonesx = document.getElementsByClassName("btnEliminar");
console.log(botonesx);
for (const boton of botonesx) {
        boton.onclick = manejadorEliminar;
}
};

//FUNCION PARA GUARDAR EN LOCALSTORAGE
function saveToLocal(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

//FUNCION PARA RECUPERAR DATOS DE LOCALSTORAGE
function getFromLocal(key) {
    almacenados = JSON.parse(localStorage.getItem(key));
    console.log(almacenados);
    carritoStorage.length = 0;
    for (const objetos of almacenados) {
        carritoStorage.push(new Lentes(objetos));
    }
}

//FUNCION PARA SUMA TOTAL DE IMPORTE
function calcularTotal(){
//limpio el precio
sumaParcial = 0;
carritoStorage.forEach((dato) => {
  sumaParcial += dato.precio;
})
};

//MUESTRO LA SUMA TOTAL EN UL
let padre2Ul = document.getElementById("importeTotal");

function ImporteTotalDom(dato) {
    
    let nuevoli = document.createElement("li");
    nuevoli.innerHTML =
        `Total=
        <span>$  ${dato}</span>
        `;
    padre2Ul.appendChild(nuevoli);
}
ImporteTotalDom(sumaParcial);
console.log(sumaParcial);


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

/* GUARDO EN LOCALSTORAGE DATOS DEL FORMULARIO */
let miFormulario = document.getElementById("form");
miFormulario.addEventListener("submit", validarFormulario);

function validarFormulario(evento) {
    evento.preventDefault();
    let campos = miFormulario.elements;
    console.log(evento);
    console.log(evento.timeStamp);
    console.log(campos);

    console.log("for of");
        for(const campo of campos){
        if(campo.value.length > 0){
        console.log("id:" + campo.id, "Valor: " + campo.value);
        saveToLocal(campo.id, campo.value)
    }else
        console.error(campo.id,"vacío")
    }
};


//NOTIFICAR DISPONIBILIDAD POR CONSOLA
/* for (const iterador of productos) {
    if (iterador === encontrado){
        iterador.estaDisponible();
        console.log("El producto se encuentra vendido (false)? ");
        console.log(iterador);
    }

} */








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
