import { getConnection,sql,dbconfig } from "../models/db.js";
import{queryCategorias} from "../models/querys.js";

export const getCategorias = async (req, res) => {
    try{ const{page = 1, size = 10} = req.query;
        const pool = await getConnection(dbconfig);

        const resultadoCategorias = await pool.request()
        .input('PageNumber', sql.Int, parseInt(page))
        .input('PageSize', sql.Int, parseInt(size))
        .query(queryCategorias.categorias);

        const resultado = await pool.request().query(queryCategorias.totalCategorias);

        res.send({
            total: resultado.recordset[0].total,
            categorias: resultadoCategorias.recordset
        })
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
};

