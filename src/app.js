const express = require("express");

const app = express();

const Routes = require('./routes/routes');

app.use(express.json());
app.use(Routes);

app.listen(3000, console.log('Servidor corriendo en el puerto 3000'));