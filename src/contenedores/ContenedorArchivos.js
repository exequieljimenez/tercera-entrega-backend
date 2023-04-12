import {promises as fs} from 'fs'
import config from '../config.js'
import { logger } from '../loggers/loggers.js';

class ContenedorArchivo {
    constructor(ruta) {
        this.ruta = `${config.fileSystem.path}/${ruta}`;
    }

    async guardar(obj) {
        try {
            const leer = await fs.readFile(this.ruta, 'utf-8')
            const data = JSON.parse(leer)
            let id
            id = data.length + 1
            obj = {id: id, ...obj}
            data.push(obj)
            await fs.writeFile(this.ruta, JSON.stringify(data))
            return id
        } catch (error) {
            logger.error(error);
        }
    }

    async listar(id) {
        try {
            const leer = await fs.readFile(this.ruta, 'utf-8')
            const data = JSON.parse(leer)
            const objectWithId = data.find((producto) => producto.id == id)
            return objectWithId
        } catch (error) {
            logger.error(error);
        }
    }

    async listarAll() {
        try {
            const leer = await fs.readFile(this.ruta, 'utf-8')
            const data = JSON.parse(leer)
            return data
        } catch(error) {
            logger.error(error)
        }
    }

    async borrar(id) {
        try {
            const leer = await fs.readFile(this.ruta, 'utf-8')
            const data = JSON.parse(leer)
            const minusOne = data.filter((producto) => producto.id != id)
            await fs.writeFile(this.ruta, JSON.stringify(minusOne))
        } catch (error) {
            logger.error(error)
        }
    }

    async borrarAll() {
        try {
            const leer = await fs.readFile(this.ruta, 'utf-8')
            let data = JSON.parse(leer)
            data = []
            await fs.writeFile(this.ruta, JSON.stringify(data))
        } catch (error) {
            logger.error(error)
        }
    }

    async actualizar(id, datosProducto) {
        try {
            id = parseInt(id)
            const leer = await fs.readFile(this.ruta, 'utf-8')
            const data = JSON.parse(leer)
            const posicionProducto = data.findIndex((producto) => producto.id === id)
            let productoModificado = {id, ...datosProducto}
            data[posicionProducto] = productoModificado
            await fs.writeFile(this.ruta, JSON.stringify(data))
        } catch (error) {
            logger.error(error)
        }
    }

}

export default ContenedorArchivo