import { Router } from 'express';
export const router = Router();

import { obtenerTareas, 
    obtenerTareaPorId, 
    insertarTarea, 
    actualizarTarea, 
    eliminarTarea 
}   from '../controllers/controllers.js';

router.get('/', obtenerTareas);
router.get('/:id', obtenerTareaPorId);
router.post('/', insertarTarea);
router.put('/:id', actualizarTarea);
router.delete('/:id', eliminarTarea);