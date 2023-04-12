import ContenedorMemoria from "../../contenedores/ContenedorMemoria.js";

class CarritosDaoMemoria extends ContenedorMemoria {

    async guardar(carrito = {productos: []}) {
        return super.guardar(carrito)
    }

}

export default CarritosDaoMemoria