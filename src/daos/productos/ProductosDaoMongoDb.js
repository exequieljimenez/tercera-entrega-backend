import ContenedorMongoDb from "../../contenedores/ContenedorMongoDb.js";

class ProductosDaoMongoDb extends ContenedorMongoDb {
    constructor() {
        super('productos', {
            id: {type: Number, require: true},
            nombre: {type: String, require: true},
            precio: {type: Number, require: true},
            imagen: {type: String, require: true}
        })
    }
}

export default ProductosDaoMongoDb