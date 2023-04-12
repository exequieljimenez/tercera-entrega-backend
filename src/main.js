import app from './server.js'
import { logger } from './loggers/loggers.js';
import minimist from 'minimist';
import cluster from 'cluster';
import os from 'os'
const numCores = os.cpus().length

const argOptions = {alias: {m: 'modo', p: 'port'}, default: {modo: 'FORK', port: 8080}};
const objArguments = minimist(process.argv.slice(2), argOptions);

const options = {
    server: {
        MODO:objArguments.modo,
        PORT:objArguments.port
    }
}

const PORT = options.server.PORT

if(options.server.MODO === "CLUSTER" && cluster.isPrimary) {
    for(let i = 0; i < numCores; i++) {
        cluster.fork();
    };
    cluster.on("exit", (worker) => {
        logger.info(`Proceso ${worker.process.pid} dejó de funcionar`);
        cluster.fork();
    });
} else {
    const server = app.listen(PORT, () => {
        logger.info(`Servidor escuchando en puerto ${JSON.stringify(PORT)} con el proceso ${process.pid}`);
    })
    server.on('error', error => {
        logger.error(`Error en el servidor ${error}`);
    });
}