import { getConnection, sql, dbconfig } from "../models/db.js";
import { queryVentas } from "../models/querys.js";

export const getVentas = async (req, res) => { 
    try {
        const { page = 1, size = 25 } = req.query;
        const pool = await getConnection(dbconfig);

        const resultadoVentas = await pool
            .request()
            .input("PageNumber", sql.Int, parseInt(page))
            .input("PageSize", sql.Int, parseInt(size))
            .query(queryVentas.ventas);

        const resultado = await pool.request().query(queryVentas.totalventas);

        res.send({
            totalventas: resultado.recordset[0].total,
            ventas: resultadoVentas.recordset,
        });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

