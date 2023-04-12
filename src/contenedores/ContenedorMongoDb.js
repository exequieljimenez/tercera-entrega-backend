import mongoose, { mongo } from "mongoose";
mongoose.set('strictQuery', true)
import config from "../config.js";
import { logger } from "../loggers/loggers.js";

mongoose.connect(config.mongodb.cnxStr, config.mongodb.options, (error) => {
    if(error) return logger.error(`Hubo un error al conectar la base datos ${error}`);
    logger.info('Base de datos conectada')
})

class ContenedorMongoDb {
    constructor(nombreColeccion, esquema) {
        this.coleccion = mongoose.model(nombreColeccion, esquema)
    }

    async guardar(producto) {
        try {
            const largoArray = await this.coleccion.find({})
            let id
            if (largoArray == 0) {
                id = 1
            }
            else {
                id = largoArray.length + 1
            }
            const nuevoProducto = {id: id, ...producto}
            await this.coleccion.create(nuevoProducto)
            return id
        } catch (error) {
            logger.error(error);
        } 
    }

    async listarAll() {
        try {
            const listaTodos = await this.coleccion.find({})
            return listaTodos;
            
        } catch (error) {
            logger.error(error);
        }
    }

    async listar(id) {
        try {
            const productoPorId = await this.coleccion.findOne({id: id})
            return productoPorId
        } catch (error) {
            logger.error(error);
        }
    }

    async actualizar(id, data) {
        try {
            await this.coleccion.updateOne({ id: id }, { $set: data})
        } catch (error) {
            logger.error(error)
        }
    }

    async borrar(id) {
        try {
            await this.coleccion.deleteOne({id: id})
        } catch (error) {
            logger.error(error);
        }
    }

    async borrarAll() {
        try {
            await this.coleccion.deleteMany({})
        } catch (error) {
            logger.error(error);
        }
    }

    async crearCarrito(email) {
        try {
            await this.coleccion.create({email: email})
        } catch (error) {
            logger.error(error)
        }
    }

    async agregarProducto(email, carrito) {
        try {
            await this.coleccion.updateOne({ email: email }, { $set: carrito})
        } catch (error) {
            logger.error(error)
        }
    }

    async listarCarrito(email) {
        try {
            const carrito = await this.coleccion.findOne({email: email})
            return carrito
        } catch (error) {
            logger.error(error)
        }
    }

    async borrarCarrito(email) {
        try {
            await this.coleccion.deleteOne({email: email})
        } catch (error) {
            logger.error(error)
        }
    }

    async filtrarProductos(id) {
        try {
            const productosFiltrados = await this.coleccion.find({}).sort({nombre: 1}).limit(id)
            return productosFiltrados
        } catch (error) {
            logger.error(error)
        }
    }
  
}

export default ContenedorMongoDb