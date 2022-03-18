//Varaibles
const agregarCarrito = document.querySelectorAll(".agregar-carrito");
const listaCarrito = document.querySelector("#lista-carrito tbody");
const carrito = document.querySelector("#carrito");
const vaciarCarrito = document.querySelector("#vaciar-carrito");
//Arreglo para la info
let arrayCarrito = [];

//Evetn Listeners

activarEvents();

function activarEvents() {
  //Traer local storage
  document.addEventListener("DOMContentLoaded", () => {
    arrayCarrito = JSON.parse(localStorage.getItem("Carrito"));
    mostrarHtml();
    
  });

  //Recorre mi arreglo con todos los a con class agregar-carrito
  //y les añade un evento
  agregarCarrito.forEach((carrito) => {
    carrito.addEventListener("click", agregaInfo);
  });

  //Añadir evento para borrar un obj

  carrito.addEventListener("click", borrarCarrito);

  //Añadir evento al vaciar carrito
  vaciarCarrito.addEventListener("click", () => {
    limpiarHtml();
    arrayCarrito = [];
  });
}

//Funciones

//Crea un objeto y lo añade a un arreglo
function agregaInfo(e) {
  e.preventDefault();

  //Creo el objeto haciendo travesing DOOM
  const objCarrito = {
    id: Date.now(),
    imagen: e.target.parentElement.parentElement.children[0].src,
    nombre: e.target.parentElement.children[0].textContent,
    precio: e.target.parentElement.children[3].children[0].textContent,
    cantidad: 1,
  };

  //Creo una variable para saber si existe ese objeto en mi carrito
  const existe = arrayCarrito.some((obj) => obj.nombre === objCarrito.nombre);
  if (existe) {
    //Recorro mi arreglo para hacer un cambio
    arrayCarrito.forEach((obj) => {
      if (obj.nombre === objCarrito.nombre) {
        obj.cantidad++;
      }
    });
  } else {
    //Añado el obj al array
    arrayCarrito = [...arrayCarrito, objCarrito];
  }

  //Muestra mi arrayCarrito en el html

  mostrarHtml();
}

function mostrarHtml() {
  //Limpio el html anterior porque el array es más grande

  limpiarHtml();
  //Creo el html
  arrayCarrito.forEach((obj) => {
    const { imagen, nombre, precio, cantidad, id } = obj;
    const tableRow = document.createElement("tr");
    tableRow.innerHTML = `
        <td>
        <img src="${imagen}" width="100">
        </td>
        <td>
        ${nombre}
        </td>
        <td>
        ${precio}
        </td>
        <td>
        ${cantidad}
        </td>
        <td>
        <a class="borrar-curso" href="#"  data-id="${id}">X<a>
        </td>
       `;

    listaCarrito.appendChild(tableRow);
  });

  localStorage.setItem("Carrito", JSON.stringify(arrayCarrito));
}

//Añadir la funcion borrar

function borrarCarrito(e) {
  e.preventDefault();
  //console.log(e.target);
  if (e.target.classList.contains("borrar-curso")) {
    const id = e.target.getAttribute("data-id");
    //Recorro mi array para saber si la cantidad es mayor que 1
    const mayor = arrayCarrito.some((obj) => {
      if (obj.id == id) {
        return obj.cantidad > 1;
      }
    });

    if (mayor) {
      arrayCarrito.forEach((obj) => {
        if (obj.id == id) {
          obj.cantidad--;
        }
      });
    } else {
      arrayCarrito = arrayCarrito.filter(
        (carrito) => carrito.id !== parseInt(id)
      );
    }

    mostrarHtml();
  }
}

//Limpia el html

function limpiarHtml() {
  while (listaCarrito.firstChild) {
    listaCarrito.removeChild(listaCarrito.firstChild);
  }
}
