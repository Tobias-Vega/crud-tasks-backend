const { newConnection } = require("../database/db")

const obtenerTareas = async (req, res) => {

    const connection = await newConnection()

    const [result] = await connection.query(`SELECT * FROM tasks`)

    console.log(result)

    res.json(result[0])

    connection.end()
};

const obtenerTareaPorId = async (req,res) => {
    const id = parseInt(req.params.id);

    const connection = await newConnection();

    const [result] = await connection.query(`SELECT * FROM tasks WHERE id = ?`, [id]);

    if(result.length === 0) {
        res.status(404).json({ msg: "Tarea no encontrada" })
    } else {
        res.json(result[0])
    }

    connection.end()

}

const insertarTarea = async (req,res) => {


    const { title, description, isCompleted } = req.body;

    const connection = await newConnection();

    if(typeof title !== 'string' || typeof description !== 'string' || typeof isCompleted !== 'boolean') {
        return res.status(400).json({msg: 'Datos incorrectos'})
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
    })

    connection.end()
};

const actualizarTarea = async (req,res) => {
    const id = parseInt(req.params.id);

    const { title, description, isCompleted } = req.body;

    const connection = await newConnection();

    const [result] = await connection.query('SELECT * FROM tasks WHERE id = ?', [id]);
    
    if (result.length === 0) {
        return res.status(404).json( { msg: 'Tarea no encontrada' });
    }

    await connection.query(`
        UPDATE tasks SET title = ?, description = ?, isCompleted = ? WHERE id = ?`, [title, description, isCompleted, id]
    )

    res.status(201).json({
        id: id,
        title,
        description,
        isCompleted
    })

    connection.end()
};

const eliminarTarea = async (req,res) => {
    const id = parseInt(req.params.id);

    const connection = await newConnection();

    const [result] = await connection.query(`
        DELETE FROM tasks WHERE id = ?`, [id]
    );

    res.status(201).json({ msg: 'Tarea eliminada' })
};

module.exports = {
    obtenerTareas,
    obtenerTareaPorId,
    insertarTarea,
    actualizarTarea,
    eliminarTarea
}