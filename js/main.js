
class Lentes {
    constructor(datos) {
        this.id = parseInt(datos.id);
        this.img = datos.img;
        this.nombre = datos.nombre;
        this.orientacion = datos.orientacion;
        this.tipo = datos.tipo;
        this.cantidad = 1;
        this.precio = parseFloat(datos.precio);
        this.vendido = false;
        this.stock = datos.stock;
    }
    // METODO PARA VENDER EL PRODUCTO Y DESCONTAR STOCK
    vender() {
        if(this.stock > 0){
            this.stock = this.stock - 1;
            console.log(this.stock);
        }else{
            alert("SIN STOCK LO SIENTO");
        }
        /* this.vendido = true;
        return this.vendido; */
    }
    // METODO PARA VERIFICAR QUE EL PRODUCTO ESTE DISPONIBLE PARA LA VENTA
    estaDisponible() {
        return this.vendido;
    }
}

//VARIABLES

let total = 0;
const PREFIJO = "productoID";
const CARRITO = [];
const carritoStorage = [];
let listaDatos = [];
let almacenados = "";
let cantidades = 0;
let totalcantidad = 0;
//FUNCIONES MATEMATICAS
const multiplicacion = (a, b) => a * b;
const iva = a => a * 0.21;
const desc = a => a - (a * 0.1);
const rec = a => a + (a * 0.1);

//MUESTRO LOS PRUDUCTOS POR DOM
//elijo el sector del html
let contenedorProduct = document.getElementById("container-productos");

//OBTENGO DATOS DESDE JSON - PETISION ASINCRONICA
$.getJSON("data/data.json", function (respuesta, estado) {
        console.log(respuesta);
        listaDatos = respuesta;

//ARRAY DE OBJETOS INSTANCIADOS
const productos = [];
for (const objeto of listaDatos) {
    productos.push(new Lentes(objeto));
}

//AGREGAMOS UN NUEVO ELEMENTO AL HTML POR CADA REGISTRO DE DATO ESTATICO
for (const lente of listaDatos) {
    $("container-productos").append(crearElemento(lente));
    
}
//DETECTAR EVENTOS DE COMPRA
let botones = document.getElementsByClassName("btnCompra");
console.log(botones);
for (const boton of botones) {
    boton.onclick = manejadorCompra;
}
//OCULTO EL UL CON EL BOTON
$("#btnMostrar").click(function(){
    $("#listaImporte").slideToggle("normal")
                    .css("background", "#ccc");
})

//CAMBIO DE TEXTO EN BOTON AL COMPRAR Y ANIMACION
$(".btnCompra").click(function (e){
    console.log(e.target.id);
    $(this).text("EN CARRITO")
            .css("background", "#ccc");

            $(this).prev(".product__notification").fadeIn("slow")
                .animate({top: "80px"},"slow")
                .animate({left: "1300px"},"fast",function () { $(this).removeAttr('style'); });
});

}
);

//EVENTO AL HACER CLICK A COMPRAR
function manejadorCompra(evento) {
    //determino el id del seleccionado
    //let seleccionado = evento.target.id;
    //Chequeo que no este en el carrito sino lo agrego al carrito
    let seleccionado =CARRITO.find(objeto => objeto.id == evento.target.id);
    if (seleccionado != undefined) {
        seleccionado.vender();
    } else {
        //encuentro la informacion del producto relacionado a ese ID
    let producto = new Lentes(listaDatos.find(objeto => objeto.id == evento.target.id));
    producto.vender();
    console.log(producto);
    //Incluyo en el carrito los productos seleccionados
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
    calcularTotalCantidad();
    ImporteTotalDom(total, totalcantidad);

    //ENVIO PETICION ASINCRONICA AL SERVIDOR
    /* $.post("https://jsonplaceholder.typicode.com/posts", producto,(data, status) => {
        console.log(data);
        console.log(status);
        }
    ); */
    //envioAjax(carritoStorage);
    //puedo usar los metodos de la clase ya una vez hecho el new Lentes:
    //CARRITO[0].estaDisponible();
    //console.log(CARRITO[0].vendido);
    }
    
};


function manejadorEliminar(evento) {
   
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
    // Calculamos  el precio
    calcularTotal();
    calcularTotalCantidad();
    ImporteTotalDom(total, totalcantidad);
};

//IMPRIMO EN EL SECTOR CARRITO LOS PRODUCTOS SELECCIONADOS
function generarSalida(productos) {
    let body = document.getElementById("tabla").children[1];

    let inner = "";
    let padreUl = document.getElementById("listaImporte");
   
//vacio todo el contenedor
    padreUl.textContent = "";
    let lista = "";

    for (const producto of productos) {
        inner += `<tr><td>${producto.id}</td><td><img src="${producto.img}" alt="lente 1" class="product__imgTabla" /></td><td>${producto.nombre}</td><td>${producto.precio}</td><td><input type="number" id="${producto.id}" class="inputCantidad"  value="${producto.cantidad}" min="1" max="5"></td><td><button id="${producto.id}" class="btnEliminar">X</button></td></tr>`;
        /* listado en detalle */
        lista += ` <li id="${producto.id}" class="lista">Producto -> ${producto.nombre}
       <span id="${producto.id}">$ ${producto.precio * producto.cantidad }</span></li>
        `;
    }
        body.innerHTML = inner;
        padreUl.innerHTML = lista;
        //calculo la cantidad en el carrito segun cantidad inicial
        cantidadDOM();

//DETECTA EVENTO DE BORRAR COMPRA
let botonesx = document.getElementsByClassName("btnEliminar");
console.log(botonesx);
for (const boton of botonesx) {
        boton.onclick = manejadorEliminar;
}
};

//FUNCION PARA MOSTRAR LA CANTIDAD DE CADA UNO
function cantidadDOM(){
    $(".inputCantidad").change(function (e) { 
        //obtengo el id
        let id =(e.target.id);
        //obtengo el valor que cambió
        cantidades = $(this).val();
        //busco el producto en el carrito y le cambio la cantidad en el array para usarlo como dato a mostrar
        let producto = carritoStorage.find(objeto => objeto.id == id);
        producto.cantidad = cantidades;
        //reemplazo definitivamente los datos en el carrito para obtener totales despues
        CARRITO.map(function(dato){
            if(dato.id == id){
                dato.cantidad = cantidades;
            }
        })
        //busco el li en el DOM y le cambio el texto por el nuevo valor
        let totalxproducto = producto.precio * producto.cantidad;
        $(".lista span").each(function () { 
            if (this.id == id){
                $(this).text("$ " + totalxproducto);
            }
        });
        //vuelvo a hacer los calculos con el nuevo carrito mapeado
        saveToLocal("productoCarro", CARRITO);
        calcularTotal();
        calcularTotalCantidad();
        ImporteTotalDom(total, totalcantidad);
});
}

//FUNCION PARA GUARDAR EN LOCALSTORAGE
function saveToLocal(key, data) {
    //localStorage.clear();
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
//FUNCION PARA ENVIAR DATOS ASINCRONICOS AL SERVIDOR
function envioAjax(dato) {
    for (const iterator of dato) {
        $.post("https://jsonplaceholder.typicode.com/posts", iterator,(data, status) => {
        console.log(data);
        console.log(status);
        }
    );
    }
    
}
//FUNCION PARA SUMA TOTAL DE IMPORTE
function calcularTotal(){
    total = 0;
carritoStorage.forEach((dato) => {
    total += dato.precio * dato.cantidad;
});
};
function calcularTotalCantidad(){
    totalcantidad = 0;
carritoStorage.forEach((dato) => {
    totalcantidad += parseInt(dato.cantidad);
    console.log(totalcantidad);
});
};

//MUESTRO LA SUMA TOTAL EN UL
let padre2Ul = document.getElementById("importeTotal");
function ImporteTotalDom(dato,datos) {
    //vacio todo el contenedor
    padre2Ul.innerHTML= "";
    let nuevoli = document.createElement("li");
    nuevoli.innerHTML =
        `Total= ${datos}  Productos ->
        <span>$  ${dato}</span>
        `;
    padre2Ul.appendChild(nuevoli);
}

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
  <div class="product__notification id=${dato.id}"><h6>EN CARRITO</h6></div>
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
//declaro variable con datos a enviar al servidor con peticion
var usuario = {
            nombre: $("input[name='name']").val(),
            apellido: $("input[name='apell']").val(),
            telefono: $("input[name='tel']").val(),
            direccion: $("input[name='place']").val(),
}
//envio datos al servidor - peticion asincronica
$.post("https://jsonplaceholder.typicode.com/posts", usuario, function (response, status) {
        console.log(response);
        console.log(status);
        //muestro confirmacion de envio en el formulario
    }).done(showDatos("input[name='name'].val()"));

    let campos = miFormulario.elements;
    console.log(evento);
    console.log(evento.timeStamp);
    console.log(campos);
    //envio peticion  asincronica al servidor de mi carrito
    envioAjax(carritoStorage);
    
    console.log("for of");
        for(const campo of campos){
        if(campo.value.length > 0 ){
        console.log("id:" + campo.id, "Valor: " + campo.value);
        saveToLocal(campo.id, campo.value);
        
    }else
        console.error(campo.id,"vacío")
    }
};
//NOTIFICACION DE ENVIO DE DATOS EN EL PIE DE FORMULARIO
function showDatos (dato) { 
    $(".divDatos").empty();
    $(".divDatos").append(`<h5>Sr/Sra ${dato}- Datos de envío Guardados!!!</h5>`).fadeOut(4000)
                        .css("border", "2px dashed orange");
}

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
