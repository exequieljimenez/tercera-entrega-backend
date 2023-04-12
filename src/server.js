import express from 'express';
import productosRouter from './routes/routeProductos.js';
import carritosRouter from './routes/routeCarritos.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import config from './config.js';
import passport from 'passport';
import { authRouter } from './routes/auth.js';

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(session({
    store: MongoStore.create({
        mongoUrl:  config.mongodb.cnxStr
    }),
    secret: "claveSecreta",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/productos', productosRouter)
app.use('/api/carritos', carritosRouter)
app.use('/api/auth', authRouter);

export default app