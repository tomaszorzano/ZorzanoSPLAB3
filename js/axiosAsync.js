const divSpinner = document.getElementById("spinner-container");

function agregarSpinner() {
  let spinner = document.createElement("img");
  spinner.setAttribute("src", "./assets/spinner.gif");
  spinner.setAttribute("alt", "imagen spinner");
  document.getElementById("spinner-container").appendChild(spinner);
}

function eliminarspinner() {
  document.getElementById("spinner-container").innerHTML = "";
}
export const obtenerAnuncios = async (url) => {
  try {
    agregarSpinner();
    
    const { data } = await axios.get(url);
   
    return data;
  } catch (err) {
    return `error: ${err.response.status} - ${err.response.statusText}`;
  } finally {
    eliminarspinner();
  }
};

export const altaAnuncio = async (url, obj) => {
  try {
    agregarSpinner();
    const { data } = await axios.post(url, obj);
    console.log(data);
  } catch (err) {
    console.error(`error: ${err.response.status} - ${err.response.statusText}`);
  } finally {
    eliminarspinner();
  }
};

export const eliminarAnuncio = async (url) => {
  try {
    agregarSpinner();
    const { data } = await axios.delete(url);
    console.log(data);
  } catch (err) {
    console.error(`error: ${err.response.status} - ${err.response.statusText}`);
  } finally {
    eliminarspinner();
  }
};

export const modificarAnuncio = async (url, obj) => {
  try {
    agregarSpinner();
    const { data } = await axios.put(url, obj);
    console.log(data);
  } catch (err) {
    console.error(`error: ${err.response.status} - ${err.response.statusText}`);
  } finally {
    eliminarspinner();
  }
};
