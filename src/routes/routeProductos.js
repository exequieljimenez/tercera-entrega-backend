import express from 'express';
const {Router} = express
import { isAuth } from '../middlewares/auth.js';
import { productosDao } from '../daos/index.js';

const productosRouter = new Router()

productosRouter.post('/', isAuth, async (req, res) => {
    const data = req.body;
    const productId = await productosDao.guardar(data)
    res.send(`Producto guardado con id ${productId}`)
})

productosRouter.get('/', isAuth, async (req, res) => {
    const productos = await productosDao.listarAll()
    res.send({productos})
})

productosRouter.get('/:id', isAuth, async (req, res) => {
    const id = req.params.id
    const producto = await productosDao.listar(id)
    res.send({producto})
})

productosRouter.get('/filtro/alfa/:id', isAuth, async (req, res) => {
    const limite = req.params.id
    const productos = await productosDao.filtrarProductos(limite)
    res.send(`Productos ordenados alfabéticamente:\n${productos}`)
})

productosRouter.put('/:id', isAuth, async (req, res) => {
    const id = req.params.id
    const data = req.body
    await productosDao.actualizar(id, data)
    res.send("producto actualizado")
})

productosRouter.delete('/:id', isAuth, async (req, res) => {
    const id = req.params.id
    await productosDao.borrar(id)
    res.send("Producto eliminado")
})

productosRouter.delete('/', isAuth, async (req, res) => {
    await productosDao.borrarAll()
    res.send("Colección borrada")
})

export default productosRouter

