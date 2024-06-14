import { getConnection, sql, dbconfig } from '../models/db.js';
import { queryLogin } from '../models/querys.js';
import jwt from 'jsonwebtoken';

const login = async (req, res) => {
    const { usuario, password } = req.body;
    const consult = queryLogin.login;

    try {
        const pool = await getConnection(dbconfig);
        
        const request = pool.request();
        request.input('usuario', sql.VarChar, usuario);
        request.input('password', sql.VarChar, password);

        const result = await request.query(consult);

        if (result.recordset.length > 0) {
            const user = result.recordset[0];
            const token = jwt.sign({ idusuario: user.idusuario, nombre: user.nombre, usuario: user.usuario }, "Stack", {
                expiresIn: '1h'
            });
            res.json({ token });
        } else {
            console.log('Usuario Incorrecto');
            res.json({ message: 'Usuario Incorrecto' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al realizar la consulta' });
    } finally {
        await sql.close();
    }
};

export default login;

