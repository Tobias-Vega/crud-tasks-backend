const { newConnection } = require("../database/db");

const obtenerTareas = async (req, res) => {

    try {
        const connection = await newConnection();

        const [result] = await connection.query(`SELECT * FROM tasks`);

        if(result.length === 0) {
            res.status(400);
        }

        res.json(result);

        connection.end();
    } catch(error) {
        console.error('Ocurrió un error', error);
        res.status(500).json({ msg: 'Internal server error', error: error.msg})
    }

    
};

const obtenerTareaPorId = async (req,res) => {

    try {
        const id = parseInt(req.params.id);

        const connection = await newConnection();

        const [result] = await connection.query(`SELECT * FROM tasks WHERE id = ?`, [id]);

        if(result.length === 0) {
            res.status(404).json({ msg: "Tarea no encontrada" })
        } else {
            res.status(200).json(result[0]);
        };

        connection.end();

    } catch(error) {
        console.error('Ocurrió un error', error);
        res.status(500).json({ msg: 'Internal server error', error: error.msg})
    };
};

const insertarTarea = async (req,res) => {

    try {
        const { title, description, isCompleted } = req.body;

        const connection = await newConnection();
    
        if(typeof title !== 'string' || title.trim() === '') {
            return res.status(400).json({msg: 'El campo title es obligatorio'});
        }
    
        if(typeof description !== 'string' || description.trim() === '') {
            return res.status(400).json({ msg: 'El campo description es obligatorio'  });
        };
    
        if(typeof isCompleted !== "boolean") {
            return res.status(400).json({ msg: 'El campo isCompleted debe ser un valor booleano' });
        };
    
        if(title.length > 255) {
            return res.status(400).json({ msg: 'El título supera el límite de caracteres posibles' });
        }
    
        const [result] = await connection.query(`
            INSERT INTO tasks
            (title, description, isCompleted)
            VALUES (?,?,?)
            `, [title, description,isCompleted]);
    
        res.status(201).json({
            id: result.insertId,
            title,
            description,
            isCompleted
        });
    
        connection.end();
    
    } catch(error) {
        console.error('Ocurrió un error', error);
        res.status(500).json({ msg: 'Internal server error', error: error.msg})
    };
};

const actualizarTarea = async (req,res) => {

    try {
        const id = parseInt(req.params.id);

        const { title, description, isCompleted } = req.body;

        const connection = await newConnection();

        const [result] = await connection.query('SELECT * FROM tasks WHERE id = ?', [id]);
        
        if (result.length === 0) {
            return res.status(404).json( { msg: 'Tarea no encontrada' });
        };

        if(typeof description !== 'string' || description.trim() === '') {
            return res.status(400).json({ msg: 'El campo description es obligatorio'  });
        };

        if(typeof isCompleted !== "boolean") {
            return res.status(400).json({ msg: 'El campo isCompleted debe ser un valor booleano' });
        };

        if(title.length > 255) {
            return res.status(400).json({ msg: 'El título supera el límite de caracteres posibles' });
        }

        await connection.query(`
            UPDATE tasks SET title = ?, description = ?, isCompleted = ? WHERE id = ?`, [title, description, isCompleted, id]
        );

        res.status(201).json({
            id: id,
            title,
            description,
            isCompleted
        });

        connection.end();
    } catch(error) {
        console.error('Ocurrió un error', error);
        res.status(500).json({ msg: 'Internal server error', error: error.msg})
    };
};

const eliminarTarea = async (req,res) => {
    try {
        const id = parseInt(req.params.id);

        const connection = await newConnection();

        const [result] = await connection.query('SELECT * FROM tasks WHERE id = ?', [id]);
        
        if (result.length === 0) {
            return res.status(404).json( { msg: 'Tarea no encontrada' });
        };

        await connection.query(`
            DELETE FROM tasks WHERE id = ?`, [id]
        );

        res.status(200).json({ msg: 'Tarea eliminada' })

        connection.end();

    } catch(error) {
        console.error('Ocurrió un error', error);
        res.status(500).json({ msg: 'Internal server error', error: error.msg})
    };
};

module.exports = {
    obtenerTareas,
    obtenerTareaPorId,
    insertarTarea,
    actualizarTarea,
    eliminarTarea
};