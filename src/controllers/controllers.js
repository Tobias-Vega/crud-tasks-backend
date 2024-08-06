const db = require('../database/db');

const ctrl = {};

ctrl.obtenerTareas = async (req,res) => {

    const connection = await newConnection();

    const sql = 'SELECT * FROM tasks';

    const [tasks] = await connection.query(sql);

    res.json({ tasks });

    connection.end();
};

ctrl.obtenerTareaPorId = async (req,res) => {

    const { id } = parseInt(req.params.id);

    const connection = await newConnection();

    const sql = 'SELECT * FROM tasks WHERE id = ?';

    const [tasks] = await connection.query(sql, [id]);

    res.json({ id: id[0] });

    connection.end();
};

module.exports = {
    ctrl
};