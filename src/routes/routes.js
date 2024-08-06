const express = require('express');
const router = express.Router();
const { ctrl } = require('../controllers/controllers');

router.get('/tasks', ctrl.obtenerTareas);
router.get('/tasks/:id', ctrl.obtenerTareaPorId);

module.exports = router;