import ContenedorArchivo from "../../contenedores/ContenedorArchivos.js";

class ProductosDaoArchivo extends ContenedorArchivo {
    constructor() {
        super('productos.json')
    }
}

export default ProductosDaoArchivo