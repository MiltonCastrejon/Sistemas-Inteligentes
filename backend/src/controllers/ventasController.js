import { getConnection, sql, dbconfig } from "../models/db.js";
import { queryVentas } from "../models/querys.js";

// Obtener ventas con paginación
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

// Añadir nueva venta
export const addVentas = async (req, res) => {
    const { idcliente, idempleado, idtipodocumento, detalles } = req.body;

    let pool;
    let transaction;

    try {
        pool = await getConnection(dbconfig);
        transaction = new sql.Transaction(pool);

        await transaction.begin();

        const request = new sql.Request(transaction);
        request.input('idcliente', sql.Int, idcliente);
        request.input('idempleado', sql.Int, idempleado || 1);
        request.input('idtipodocumento', sql.Int, idtipodocumento);
        request.input('detalles', sql.NVarChar(sql.MAX), JSON.stringify(detalles));

        await request.execute('sp_addVenta');

        await transaction.commit();

        res.status(201).json({ message: 'Venta añadida exitosamente' });
    } catch (error) {
        if (transaction) {
            await transaction.rollback();
        }
        res.status(500).json({ error: error.message });
    } finally {
        if (pool) {
            await pool.close();
        }
    }
};
