
//OBJETOS PARA UNA TIENDA ONLINE
//alert("Bienvenido a tu tienda ON-LINE");

const multiplicacion = (a,b) => a * b;
const iva = a => a * 0.21;
const desc = a => a -(a * 0.1);
const rec = a => a + (a * 0.1);
/* datos */
const DATOS = [{
    "id": 1,
    "nombre": "Stady",
    "orientacion": "Masculino",
    "tipo": "Descanso",
    "precio": 514
  }, {
    "id": 2,
    "nombre": "Kelvin",
    "orientacion": "Masculino",
    "tipo": "Descanso",
    "precio": 720
  }, {
    "id": 3,
    "nombre": "Intelectual",
    "orientacion": "Femenino",
    "tipo": "Lectura",
    "precio": 787
  }, {
    "id": 4,
    "nombre": "Lady Secret",
    "orientacion": "Femenino",
    "tipo": "Sol",
    "precio": 572
  }, {
    "id": 5,
    "nombre": "Boy",
    "orientacion": "Infantil",
    "tipo": "Lectura",
    "precio": 819
  }
];

class Lentes{
    constructor(datos){
        this.id = parseInt(datos.id);
        this.nombre = datos.nombre;
        this.orientacion = datos.orientacion;
        this.tipo = datos.tipo;
        this.precio = parseFloat(datos.precio);
        this.vendido = false;
    }
    
    // METODO PARA VENDER EL PRODUCTO
    vender(){
        this.vendido = true;
        return this.vendido;
    }
    // METODO PARA VERIFICAR QUE EL PRODUCTO ESTE DISPONIBLE PARA LA VENTA
    estaDisponible(){
        return this.vendido;
    }
}



//ARRAY
const productos = [];
for (const objeto of DATOS) {
    productos.push(new Lentes(objeto));
}
/* productos.push(new Lentes(1, "Masculino", "Sol", 500));
productos.push(new Lentes(2, "Femenino", "Descanso", 500));
productos.push(new Lentes(3, "Infantil", "Lectura", 400)); */
console.log(productos);

//MUESTRO LOS PRODUCTOS
/*  for (const prod of productos) {
     alert("Lentes diponibles: \n"+"Codigo: " +(prod.id) +" \nSexo: "+ (prod.orientacion)+"\nUso: "+ (prod.tipo)); 
    
}  */
//MUESTRO LOS PRUDUCTOS POR DOM
//elijo el sector del html
/* let padre = document.getElementById("filaDeProductos");

for (const lente of productos) {
//agrego el div
let contenedor = document.createElement("div");
//asigno una clase
contenedor.classList.add("col-6");
contenedor.classList.add("container_product");
contenedor.classList.add("p3");
//creo la plantilla del contenido
contenedor.innerHTML = ` <h2>Lente: ${lente.id} </h2>
                        <h3>Descripción: </h3>
                        <p> Sexo: ${lente.orientacion}</br>
                            Uso: ${lente.tipo}</br>
                            Precio: ${lente.precio}</br></p>
`;
//agrego cada nodo creado al padre
padre.appendChild(contenedor);
}; */

//SELECCIONO ELEMENTO
let eleccion = parseInt(prompt("SELECCIONAR UN TIPO DE ANTEOJO A COMPRAR: (1, 2 o 3)"));

while (eleccion !=1 && eleccion !=2 && eleccion !=3) {
   producto = parseInt(prompt("SELECCIONAR UN TIPO DE ANTEOJO A COMPRAR: "));
}
//BUSCO EL PRODUCTO SELECCIONADO
let encontrado = productos.find(x => x.id === eleccion);
console.log("Producto seleccionado: ");
console.log(encontrado);

//NOTIFICAR DISPONIBILIDAD POR CONSOLA
for (const iterador of productos) {
    if (iterador === encontrado){
        iterador.estaDisponible();
        console.log("El producto se encuentra vendido (false)? ");
        console.log(iterador);
    }
    
}

let padreSelecciones = document.getElementById("filaDeSeleccionados");
//CREO FUNCION PARA AGREGAR AL CARRITO UN PRODUCTO
function agregarCarroId(prod) {
    let contenedor2 = document.createElement("th");
    contenedor2.classList.add('id');
    contenedor2.innerHTML = `${prod.id}`;
    padreSelecciones.appendChild(contenedor2);
}
function agregarCarroFoto(prod) {
    let contenedor3 = document.createElement("th");
    contenedor3.classList.add('prodFoto');
    contenedor3.innerHTML = `${prod.foto}`;
    padreSelecciones.appendChild(contenedor3);
}
function agregarCarroNombre(prod) {
    let contenedor4 = document.createElement("th");
    contenedor4.classList.add('prodNombre');
    contenedor4.innerHTML = `${prod.nombre}`;
    padreSelecciones.appendChild(contenedor4);
}
function agregarCarroPrecio(prod) {
    let contenedor5 = document.createElement("th");
    contenedor5.classList.add('prodPrecio');
    contenedor5.innerHTML = `${prod.precio}`;
    padreSelecciones.appendChild(contenedor5);
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
    let contenedor6 = document.createElement("th");
    contenedor6.classList.add('prodCantidad');
    contenedor6.innerHTML = `${cantidad}`;
    padreSelecciones.appendChild(contenedor6);
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
//MUESTRO LA SELECCIÓN POR HTML
function funcionDeImporteEfectivo(dato){
let padreSelecciones = document.getElementById("filaDeSeleccionados");
let contenedor2 = document.createElement("div");
contenedor2.classList.add("col-6");
contenedor2.classList.add("container_product");
contenedor2.classList.add("p3");
contenedor2.classList.add("container_product__select");
contenedor2.innerHTML = ` <h2>Importe a abonar en Efectivo:</h2>
                        <h3>$ ${dato}</h3></br>
                        <p> "Gracias por tu compra".!!!</p>
`;
padreSelecciones.appendChild(contenedor2);
}
function funcionDeImporteUnpago(dato){
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
}
function funcionDeImporteRecargo(dato){
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
}
//MEDIO DE PAGO
let metodoPago = parseInt(prompt("Ingrese la forma de pago (DIGITE SU NUMERO): \n 1 - Efectivo \n 2 - Tarjeta un pago \n 3 - Tarjeta en cuotas"));

if (metodoPago ==1 || metodoPago ==2 || metodoPago ==3) {
    switch (metodoPago) {
        case 1:
            //funcionDeImporteEfectivo(efectivo);
           /*  alert("En efectivo tenes 10% de descuento!!! \n" +"Costo total: $" + efectivo ); */
            break;
        case 2:
            //funcionDeImporteUnpago(unPago);
            /* alert("Tarjeta en un pago sólo pagas el IVA!!! \n" + "Costo total: $" + unPago ); */
            break;
        case 3:
            //funcionDeImporteRecargo(recargo);
            /* alert("Tarjeta en cuotas tenes un recargo!!!\n" + "Costo total: $" + recargo ); */
            break;
        default:
            alert("GRACIAS POR TU COMPRA");
            break;
    }
} else {
    metodoPago = parseInt(prompt("Ingrese la forma de pago (DIGITE SU NUMERO): \n 1 - Efectivo \n 2 - Tarjeta un pago \n 3 - Tarjeta en cuotas"));
}
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






