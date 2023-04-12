class ContenedorMemoria {
    constructor() {
        this.elementos = []
    }

    listar(id) {
        const objectWithId = this.elementos.find((producto) => producto.id == id)
        return objectWithId
    }

    listarAll() {
        return this.elementos
    }

    guardar(elem) {
        const id = this.elementos.length + 1
        elem = {id: id, ...elem}
        this.elementos.push(elem)
        return id
    }

    actualizar(id, datosProducto) {
        id = parseInt(id)
        const posicionProducto = this.elementos.findIndex((producto) => producto.id === id)
        let productoModificado = {id, ...datosProducto}
        this.elementos[posicionProducto] = productoModificado
    }

    borrar(id) {
        const minusOne = this.elementos.filter((producto) => producto.id != id)
        this.elementos = minusOne
    }

    borrarAll() {
        this.elementos = []
    }
}

export default ContenedorMemoria