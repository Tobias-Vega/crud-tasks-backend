import express, { json } from "express";

const app = express();

import { router } from './routes/routes.js';

app.use(json());
app.use('/tasks/', router);

app.listen(3000, console.log('Servidor corriendo en el puerto 3000'));