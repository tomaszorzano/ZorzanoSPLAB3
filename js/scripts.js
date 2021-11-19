import Anuncio_auto from "./Anuncio_auto.js";
//const anuncios = JSON.parse(localStorage.getItem("listaAnuncios")) || [];

import {
  obtenerAnuncios,
  altaAnuncio,
  eliminarAnuncio,
  modificarAnuncio,
} from "./axiosAsync.js";

const url = "http://localhost:3000/anuncios";
let anuncios;
let listaActual;
const checks = document.querySelectorAll(".cb");

const btnTodos = document.getElementById("btnTodos");
const btnAlquiler = document.getElementById("btnAlquiler");
const btnVenta = document.getElementById("btnVenta");

window.addEventListener("DOMContentLoaded", inicializarManejadores);

/*
window.addEventListener("DOMContentLoaded", () => {
  inicializarManejadores();
  console.log(anuncios);

  handlerLoadList(listaActual);
});
*/
async function inicializarManejadores() {
  anuncios = await obtenerAnuncios(url);
  listaActual = anuncios;
  handlerLoadList(listaActual);
  document.forms[0].addEventListener("submit", handlerSubmit);
  document.addEventListener("click", handlerClick);
  checks.forEach((item) => {
    item.addEventListener("click", handlerCheck);
  });
  btnAlquiler.addEventListener("click", handlerFilterAlquiler);
  btnVenta.addEventListener("click", handlerFilterVenta);
  btnTodos.addEventListener("click", handlerFilterTodos);
}
async function handlerSubmit(e) {
  e.preventDefault();
  const frm = e.target;
  var transaccion;
  var idA;

  if (frm.id.value) {
    idA = frm.id.value;
    if (document.getElementById("cboxVenta").checked == true) {
      transaccion = "Venta";
    }
    if (document.getElementById("cboxAlquiler").checked == true) {
      transaccion = "Alquiler";
    }
    const anuncioEditado = new Anuncio_auto(
      idA,
      document.getElementById("titulo").value,
      transaccion,
      document.getElementById("descripcion").value,
      document.getElementById("precio").value,
      document.getElementById("puertas").value,
      document.getElementById("kilometros").value,
      document.getElementById("potencia").value
    );
    if (confirm("Confirma modificacion?")) {
      //agregarSpinner();

      await modificarAnuncio(`${url}/${idA}`, anuncioEditado);
      handlerLoadList();
      //eliminarspinner();
    }
  } else {
    if (confirm("Confirma alta?")) {
      console.log("Dando de alta");
      if (document.getElementById("cboxVenta").checked == true) {
        transaccion = "Venta";
      }
      if (document.getElementById("cboxAlquiler").checked == true) {
        transaccion = "Alquiler";
      }
      const nuevoAnuncio = new Anuncio_auto(
        Date.now(),
        document.getElementById("titulo").value,
        transaccion,
        document.getElementById("descripcion").value,
        document.getElementById("precio").value,
        document.getElementById("puertas").value,
        document.getElementById("kilometros").value,
        document.getElementById("potencia").value
      );
      //agregarSpinner();

      await altaAnuncio(url, nuevoAnuncio);
      handlerLoadList();
      //eliminarspinner();
    }
  }

  limpiarForm(e.target);
}

async function handlerClick(e) {
  if (e.target.matches("td")) {
    const id = e.target.parentNode.dataset.id;
    console.log(id);
    cargarFrm(id);
  } else if (e.target.matches("#btnEliminar")) {
    let id = parseInt(document.forms[0].id.value);

    if (confirm("Confirma baja?")) {
      //agregarSpinner();
      //let index = anuncios.findIndex((el) => el.id == id);
      await eliminarAnuncio(`${url}/${id}`);
      anuncios = await obtenerAnuncios(url);
      handlerLoadList();
      //anuncios.splice(index, 1);
      //almacenaDatos(anuncios);
      //eliminarspinner();
    }
    limpiarForm(document.forms[0]);
  } else if (e.target.matches("#btnCancelar")) {
    limpiarForm(document.forms[0]);
  }
}

/*
function altaAnuncio(a) {
  anuncios.push(a);
  almacenaDatos(anuncios);
}
function modificarAnuncio(a) {
  let index = anuncios.findIndex((anun) => {
    return anun.id == a.id;
  });
  anuncios.splice(index, 1, a);
  almacenaDatos(anuncios);
}
function almacenaDatos(data) {
  localStorage.setItem("listaAnuncios", JSON.stringify(data));
  handlerLoadList();
}*/

function crearTabla(items) {
  const tabla = document.createElement("table");
  tabla.appendChild(crearThead(items[0]));
  tabla.appendChild(crearTbody(items));
  return tabla;
}
function renderizarLista(lista, contenedor) {
  while (contenedor.hasChildNodes()) {
    contenedor.removeChild(contenedor.firstChild);
  }
  if (lista) {
    contenedor.appendChild(lista);
  }
}
function handlerLoadList(e) {
  renderizarLista(crearTabla(e), document.getElementById("divLista"));
}

function crearThead(item) {
  const thead = document.createElement("thead");
  const tr = document.createElement("tr");

  for (const key in item) {
    if (key !== "id") {
      const th = document.createElement("th");
      th.style.backgroundColor = "orange";
      th.textContent = key;
      tr.appendChild(th);
    }
  }
  thead.appendChild(tr);
  return thead;
}

function crearTbody(items) {
  const tbody = document.createElement("tbody");
  items.forEach((item) => {
    const tr = document.createElement("tr");
    for (const key in item) {
      if (key === "id") {
        tr.setAttribute("data-id", item[key]);
      } else {
        const td = document.createElement("td");
        const texto = document.createTextNode(item[key]);
        td.appendChild(texto);
        tr.appendChild(td);
      }
    }
    tbody.appendChild(tr);
  });
  return tbody;
}
/*
function agregarSpinner() {
  let spinner = document.createElement("img");
  spinner.setAttribute("src", "./assets/spinner.gif");
  spinner.setAttribute("alt", "imagen spinner");
  document.getElementById("spinner-container").appendChild(spinner);
}
function eliminarspinner() {
  document.getElementById("spinner-container").innerHTML = "";
}*/
function limpiarForm(frm) {
  frm.reset();
  document.getElementById("btnEliminar").classList.add("oculto");
  document.getElementById("btnCancelar").classList.add("oculto");
  document.getElementById("btnSubmit").value = "Save";
  document.forms[0].id.value = "";
}
function cargarFrm(id) {
  const {
    titulo,
    descripcion,
    precio,
    transaccion,
    kilometros,
    puertas,
    potencia,
  } = anuncios.filter((a) => a.id === parseInt(id))[0];
  const form = document.forms[0];
  document.getElementById("titulo").value = titulo;
  document.getElementById("descripcion").value = descripcion;
  document.getElementById("precio").value = precio;
  if (transaccion == "Venta") {
    document.getElementById("cboxVenta").checked = true;
    document.getElementById("cboxAlquiler").checked = false;
  }
  if (transaccion == "Alquiler") {
    document.getElementById("cboxAlquiler").checked = true;
    document.getElementById("cboxVenta").checked = false;
  }
  document.getElementById("kilometros").value = kilometros;
  document.getElementById("puertas").value = puertas;
  document.getElementById("potencia").value = potencia;

  form.id.value = id;
  document.getElementById("btnSubmit").value = "Modificar";
  document.getElementById("btnEliminar").classList.remove("oculto");
  document.getElementById("btnCancelar").classList.remove("oculto");
}

function handlerCheck() {
  const c = {};
  checks.forEach((item) => {
    c[item.name] = item.checked;
  });

  const listaMap = listaActual.map((item) => {
    const f = {};
    for (const key in item) {
      if (c[key] || key == "id") {
        f[key] = item[key];
      }
    }
    return f;
  });

  handlerLoadList(listaMap);
}

function calcularPromedio(lista) {
  if (lista.length > 0) {
    return parseFloat(
      (
        lista.reduce((acum, item) => acum + parseInt(item.precio), 0) /
        lista.length
      ).toFixed(2)
    );
  }
  return "N/A";
}

function handlerFilterAlquiler() {
  const listaAlquileres = anuncios.filter(
    (item) => item.transaccion == "Alquiler"
  );
  listaActual = listaAlquileres;

  handlerLoadList(listaAlquileres);

  inputProm.value = calcularPromedio(listaAlquileres);
}
function handlerFilterVenta() {
  const listaVentas = anuncios.filter((item) => item.transaccion == "Venta");
  listaActual = listaVentas;
  handlerLoadList(listaVentas);

  inputProm.value = calcularPromedio(listaVentas);
}
function handlerFilterTodos() {
  listaActual = anuncios;
  handlerLoadList(anuncios);
  inputProm.value = "N/A";
}
