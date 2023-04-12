import ProductosDaoMemoria from './productos/ProductosDaoMemoria.js';
import CarritosDaoMemoria from './carritos/CarritosDaoMemoria.js';

let productosDao
let carritosDao

switch ('mongo') {
    case 'mongo':
        const {default: ProductosDaoMongoDb} = await import('./productos/ProductosDaoMongoDb.js')
        const {default: CarritosDaoMongoDb} = await import('./carritos/CarritosDaoMongoDb.js')

        productosDao = new ProductosDaoMongoDb()
        carritosDao = new CarritosDaoMongoDb()
        break;
    case 'json':
        const {default: ProductosDaoArchivo} = await import('./productos/ProductosDaoArchivo.js')
        const {default: CarritosDaoArchivo} = await import('./carritos/CarritosDaoArchivo.js')

        productosDao = new ProductosDaoArchivo()
        carritosDao = new CarritosDaoArchivo()
        break;
    case 'memoria':
        productosDao = new ProductosDaoMemoria()
        carritosDao = new CarritosDaoMemoria()
        break;
    default:
        break;
}

export {productosDao, carritosDao}