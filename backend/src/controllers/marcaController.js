import { getConnection,sql,dbconfig } from "../models/db.js";
import{queryMarcas} from "../models/querys.js";

export const getMarcas = async (req, res) => {
    try{ const{page = 1, size = 10} = req.query;
        const pool = await getConnection(dbconfig);

        const resultadoMarcas = await pool.request()
        .input('PageNumber', sql.Int, parseInt(page))
        .input('PageSize', sql.Int, parseInt(size))
        .query(queryMarcas.marcas);

        const resultado = await pool.request().query(queryMarcas.totalMarcas);

        res.send({
            total: resultado.recordset[0].total,
            marcas: resultadoMarcas.recordset
        })
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
};