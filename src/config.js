import dotenv from 'dotenv'

dotenv.config()

export default {
    fileSystem: {
        path: './DB'
    },
    mongodb: {
        cnxStr: process.env.DB_MONGO_URL,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    },
}