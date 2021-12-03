import Anuncio from "./Anuncio.js";

export default class Anuncio_auto extends Anuncio
{
    constructor(id,titulo, transaccion, descripcion, precio, puertas, kilometros, potencia,combustible)
    {
        super(id,titulo, transaccion, descripcion,precio);
        this.puertas=puertas;
        this.kilometros=kilometros;
        this.potencia=potencia;
        this.combustible=combustible;
        
    }
}