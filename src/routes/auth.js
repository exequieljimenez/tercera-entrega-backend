import express from "express";
import passport from "passport";
import { Strategy } from "passport-local";
import * as model from "../models/user.model.js";
import bcrypt from 'bcrypt';
import { transporter, adminEmail } from "../messages/gmail.js";
import { logger } from '../loggers/loggers.js';

const LocalStrategy = Strategy;

const authRouter = express.Router();

authRouter.use(express.json());
authRouter.use(express.urlencoded({extended: true}))

async function addUser(usuario) {
    try {
        const user = usuario
        const userSave = new model.users(user);
        const savedUser = await userSave.save();
    } catch (error) {
    }
}

async function readUser(usuario) {
    try {
        const userRead = await model.users.findOne({email: usuario})
        return userRead
    } catch (error) {
        
    }
}

passport.use(new LocalStrategy(
    async function (username, password, done)
    {
        const existeUsuario = await readUser(username)
        if(!existeUsuario) {
            return done(null, false)
        } else {
            const match = await verifyPass(existeUsuario, password)

            if(!match) {
                return done(null, false)
            }
            return done(null, existeUsuario)
        }
    }
))

passport.serializeUser((usuario, done) => {
    done(null, usuario.email)
})

passport.deserializeUser(async (email, done) => {
    const existeUsuario = await readUser(email);
    done(null, existeUsuario)
})

function isAuth(req, res, next) {
    if(req.isAuthenticated()) {
        next()
    } else {
        res.redirect('/login')
    }
}

authRouter.use(passport.initialize());
authRouter.use(passport.session())

async function generateHashPassword(password) {
    const hashPassword = await bcrypt.hash(password, 10)
    return hashPassword
}

async function verifyPass(usuario, password) {
    const match = await bcrypt.compare(password, usuario.password)
    return match
}

authRouter.get('/', (req, res) => {
    res.redirect('destino')
})


authRouter.get('/register', (req, res) => {
    res.send('Escriba sus datos para registrarse')
})

authRouter.post('/register', async (req, res) => {
    const { email, password, nombre, direccion, edad, celular, avatar } = req.body;
    const newUsuario = await readUser(email)
    if (newUsuario) {
        res.send('Usuario ya existente')
    } else {
        const newUser = { email, password: await generateHashPassword(password), nombre, direccion, edad, celular, avatar }
        addUser(newUser)
        const emailTemplate = `<div>
            <h1>Datos del usuario</h1>
            <p>Email: ${newUser.email}</p>
            <p>Nombre: ${newUser.nombre}</p>
            <p>Dirección: ${newUser.direccion}</p>
            <p>Edad: ${newUser.edad}</p>
            <p>Teléfono: ${newUser.celular}</p>
            <p>Avatar: ${newUser.avatar}</p>
            </div>`;
        const mailOptions = {
            from: 'servidor node',
            to: adminEmail,
            subject: 'Nuevo usuario registrado',
            html: emailTemplate
        };
        res.send('usuario agregado')
        try {
            await transporter.sendMail(mailOptions)
        } catch (error) {
            logger.error(error)
        }
    }
})

authRouter.get('/login', async (req, res) => {
    res.send('Escriba username y password')
})

authRouter.post('/login', passport.authenticate('local', {successRedirect: 'destino', failureRedirect: 'login-error'}))

authRouter.get('/destino', (req, res) => {
    const user = {
        nombre: req.user.nombre,
        telefono: req.user.celular,
        avatar: req.user.avatar
    }
    res.send(`Usted inicio sesion ${JSON.stringify(user)}`)
})

authRouter.get('/login-error', (req, res) => {
    res.send('Error al loguearse')
})

authRouter.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if(err) {
            throw err
        }
        res.send('Sesion finalizada')
    })
})



export {authRouter};