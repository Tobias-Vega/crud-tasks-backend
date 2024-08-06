const express = require('express');
const router = express.Router();
const controller = require('../controllers/controllers');

router.get('/tasks', controller.obtenerTareas);
router.get('/tasks/:id', controller.obtenerTareaPorId);
router.post('/tasks', controller.insertarTarea);
router.put('/tasks/:id', controller.actualizarTarea);
router.delete('/tasks/:id', controller.eliminarTarea);

module.exports = router;