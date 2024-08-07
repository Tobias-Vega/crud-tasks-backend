const express = require('express');
const router = express.Router();

const { eliminarTarea } = require('../controllers/controllers');
const { obtenerTareas } = require('../controllers/controllers');
const { obtenerTareaPorId } = require('../controllers/controllers');
const { actualizarTarea } = require('../controllers/controllers');
const { insertarTarea } = require('../controllers/controllers');


router.get('/tasks', obtenerTareas);
router.get('/tasks/:id', obtenerTareaPorId);
router.post('/tasks', insertarTarea);
router.put('/tasks/:id', actualizarTarea);
router.delete('/tasks/:id', eliminarTarea);

module.exports = router;