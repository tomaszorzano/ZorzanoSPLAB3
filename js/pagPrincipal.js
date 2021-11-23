
import {
  obtenerAnuncios,
} from "./axiosAsync.js";

const url = "http://localhost:3000/anuncios";
let listaArticulos = [];

const getAnuncios = () => {
  
  //Instanciar obj xmlHTTP
  const xhr = new XMLHttpRequest();
  //Asignar un handler a la peticion
  xhr.onreadystatechange = () => {
    
      if (xhr.readyState == 4) {
          if (xhr.status >= 200 && xhr.status < 299) {
              listaArticulos = JSON.parse(xhr.responseText);
              if (listaArticulos.length > 0) {
                crearAnuncio(listaArticulos);
                console.log(listaArticulos);
            }
          } else {
              const statusText = xhr.statusText || "ocurrio un error";
              console.error(`Error: ${xhr.status} : ${statusText}`);
              
          }
      }
  };
  //abrir la peticion
  xhr.open("GET", "http://localhost:3000/anuncios");
  //enviar peticion
  xhr.send();
  
  
}

window.addEventListener("DOMContentLoaded",getAnuncios);



//const listaAnuncios = JSON.parse(localStorage.getItem("listaAnuncios")) || [];



const crearAnuncio = (data) => {
  const $anuncios = document.getElementById("anuncios");

    data.forEach((element, index) => {
    const $anuncio = document.createElement("anunciox");
    $anuncio.classList.add("container");
    $anuncio.classList.add("bg-light");
    $anuncio.classList.add("border");
    const $titulo = document.createElement("h3");
    $titulo.classList.add("h3");
    $titulo.textContent = element.titulo;
    $anuncio.appendChild($titulo);
    const $transaccion = document.createElement("p");
    $transaccion.classList.add("anuncioTextoTransaccion");
    $transaccion.textContent = element.transaccion;
    $anuncio.appendChild($transaccion);
    const $descripcion = document.createElement("p");
    $descripcion.classList.add("anuncioTexto");
    $descripcion.textContent = element.descripcion;
    $anuncio.appendChild($descripcion);
    const $precio = document.createElement("p");
    $precio.classList.add("anuncioPrecio");
    $precio.textContent = "$" + element.precio + ".-";
    $anuncio.appendChild($precio);



    const $ul = document.createElement("ul");
    const $li1 = document.createElement("li");
    const $img1 = document.createElement("img");
    $img1.setAttribute("src", "../images/puertaAnuncio.png");
    $img1.setAttribute("width", "20px");
    $img1.setAttribute("alt", "puertas");
    $img1.classList.add("iconos");
    $li1.appendChild($img1);
    const $span1 = document.createElement("span");
    $span1.classList.add("anuncioIconos");
    $span1.textContent = element.puertas;
    $span1.classList.add("anuncioTextoIcono");
    $li1.appendChild($span1);
    $ul.appendChild($li1);

    const $li2 = document.createElement("li");
    const $img2 = document.createElement("img");
    $img2.setAttribute("src", "../images/kmsAnuncio.png");
    $img2.setAttribute("width", "20px");
    $img2.setAttribute("alt", "km");
    $img2.classList.add("anuncioIconos");
    $li2.appendChild($img2);
    const $span2 = document.createElement("span");
    $span2.classList.add("anuncioIconos");
    $span2.textContent = element.kilometros;
    $span2.classList.add("anuncioTextoIcono");
    $li2.appendChild($span2);
    $ul.appendChild($li2);

    const $li3 = document.createElement("li");
    const $img3 = document.createElement("img");
    $img3.setAttribute("src", "../images/potenciaAnuncio.png");
    $img3.setAttribute("width", "40px");
    $img3.setAttribute("alt", "potencia");
    $img3.classList.add("anuncioIconos");
    $li3.appendChild($img3);
    const $span3 = document.createElement("span");
    $span3.classList.add("anuncioIconos");
    $span3.textContent = element.potencia;
    $span3.classList.add("anuncioTextoIcono");
    $li3.appendChild($span3);
    $ul.appendChild($li3);

    $anuncio.appendChild($ul);
    
    const $img4 = document.createElement("img");
    $img4.setAttribute("src", "../images/fondoAnuncio.png");
    $img4.setAttribute("width", "200px");
    $img4.setAttribute("alt", "auto");
    $anuncio.appendChild($img4);

    const $img5 = document.createElement("img");
    $img5.setAttribute("src", "../images/car2.png");
    $img5.setAttribute("width", "200px");
    $img5.setAttribute("alt", "auto");
    $anuncio.appendChild($img5);

    const btnVer = document.createElement("button");
    btnVer.type = 'button';
    btnVer.innerText = 'Ver Vehiculo'; 
    btnVer.classList.add("btn");
    btnVer.classList.add("btn-primary");
    

    $anuncio.appendChild(btnVer);

    $anuncios.appendChild($anuncio);
  });
};

