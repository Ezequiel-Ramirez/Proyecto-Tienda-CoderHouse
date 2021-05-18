//"Bienvenido a tu tienda ON-LINE";

const multiplicacion = (a,b) => a * b;
const iva = a => a * 0.21;
const desc = a => a -(a * 0.1);
const rec = a => a + (a * 0.1);
let sumaTotal = 0;




let padreSelecciones = document.getElementById("filaDeSeleccionados");
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
}  
    
    

//MUESTRO LA SELECCIÓN POR HTML
agregarCarroId(encontrado);
agregarCarroFoto(encontrado);
agregarCarroNombre(encontrado);
agregarCarroPrecio(encontrado);
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

/* alert("PRODUCTO SELECCIONADO: \n" +"Sexo: " +  encontrado.orientacion + "\nUso: "+ encontrado.tipo); */
    
//SELECCIONO CANTIDAD
let cantidad = parseInt(prompt("Ingrese la cantidad a comprar (de 1 a 5): "));

while (cantidad < 1 || cantidad > 5){
    cantidad = parseInt(prompt("Ingrese la cantidad a comprar (de 1 a 5): "));
}

function agregarCarroCantidad(prod) {
    let celda5 = document.createElement("th");
    celda5.classList.add('prodCantidad');
    celda5.innerHTML = `${cantidad}`;
    padreSelecciones.appendChild(celda5);
} 
agregarCarroCantidad(cantidad); 
 //OPERACIONES
 /* operaciones */
let efectivo = multiplicacion(desc((encontrado.precio) + iva(encontrado.precio)),  cantidad);
console.log("Costo en efectivo:");
console.log(efectivo);
let unPago = multiplicacion((encontrado.precio + iva(encontrado.precio)) , cantidad);
console.log("Costo en un pago:");
console.log(unPago);
let recargo = multiplicacion(rec((encontrado.precio) + iva(encontrado.precio)),  cantidad);
console.log("Costo con tarjeta:");
console.log(recargo);

//FUNCION PARA MOSTRAR SU IMPORTE A ABONAR
//MUESTRO LA SELECCIÓN POR HTML EN UL
function funcionDeImporte(dato){
let padreUl = document.getElementById("listaImporte");
let lista = document.createElement("li");
lista.classList.add("lista_importe__detalle");
lista.innerHTML = ` Producto -> ${dato.nombre}
<span>$ ${dato.precio * cantidad}</span>
                    `;
padreUl.appendChild(lista);
sumaTotal += (dato.precio*cantidad);
}
funcionDeImporte(encontrado);

//FUNCION PARA SUMA TOTAL DE IMPORTE
//MUESTRO LA SUMA TOTAL EN UL
function funcionImporteTotal(dato){
    let padreUl = document.getElementById("listaImporte");
    let lista = document.createElement("li");
    lista.classList.add("lista_importe__total");
    lista.innerHTML = ` Total=
    <span>$ ${dato}</span>
                        `;
    padreUl.appendChild(lista);
    }
    funcionImporteTotal(sumaTotal);