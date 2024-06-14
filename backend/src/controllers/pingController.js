import { getConnection, dbconfig } from '../models/db.js';

export const getPing = async (req, res, useSecondDB = false) => {
    try {
        const config =  dbconfig;
        const pool = await getConnection(config);
        const result = await pool.request().query('SELECT * FROM empleado');
        console.log(result);
        res.send(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
    
};
