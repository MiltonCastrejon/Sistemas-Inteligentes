import { getConnection, sql, dbconfig } from '../models/db.js';
import { queryProductos } from '../models/querys.js';

export const getProductos = async (req, res) => {
  try {
    const { page = 1, size = 10 } = req.query;
    const pool = await getConnection(dbconfig);

    const resultadoProductos = await pool
      .request()
      .input('PageNumber', sql.Int, parseInt(page))
      .input('PageSize', sql.Int, parseInt(size))
      .query(queryProductos.productos);

    const resultado = await pool.request().query(queryProductos.totalProductos);

    res.send({
      total: resultado.recordset[0].total,
      productos: resultadoProductos.recordset,
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const createProducto = async (req, res) => {
  const { nombre, descripcion, idcategoria, idmarca, precio, stock } = req.body;
  console.log('datos recibidos', req.body);

  if (
    nombre == null ||
    descripcion == null ||
    idcategoria == null ||
    idmarca == null ||
    precio == null ||
    stock == null
  ) {
    return res.status(400).send({ message: 'Faltan campos por llenar...' });
  }

  try {
    const pool = await getConnection(dbconfig);
    await pool
      .request()
      .input('nombre', sql.VarChar, nombre)
      .input('descripcion', sql.VarChar, descripcion)
      .input('idcategoria', sql.Int, idcategoria)
      .input('idmarca', sql.Int, idmarca)
      .input('precio', sql.Decimal(10,2), precio)
      .input('stock', sql.Int, stock)
      .query(queryProductos.insertProducto);

    res.json({ nombre, descripcion, idcategoria, idmarca, precio, stock });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getProductoById = async (req, res) => {
  try {
    const pool = await getConnection(dbconfig);
    const result = await pool
      .request()
      .input('idproducto', req.params.idproducto)
      .query(queryProductos.productoById);

    res.json(result.recordset[0]);
  } catch (error) {
    res.status(500);
    console.log(error.message);
  }
};

export const updateProducto = async (req, res) => {
  const { nombre, descripcion, idcategoria, idmarca, precio, stock } = req.body;

  if (
    nombre == null ||
    descripcion == null ||
    idcategoria == null ||
    idmarca == null ||
    precio == null ||
    stock == null
  ) {
    return res.status(400).json({ message: 'Faltan campos por llenar' });
  }

  try {
    const pool = await getConnection(dbconfig);

    await pool
      .request()
      .input('nombre', sql.VarChar, nombre)
      .input('descripcion', sql.VarChar, descripcion)
      .input('idcategoria', sql.Int, idcategoria)
      .input('idmarca', sql.Int, idmarca)
      .input('precio', sql.Decimal, precio)
      .input('stock', sql.Int, stock)
      .input('idproducto', req.params.idproducto)
      .query(queryProductos.updateProducto);
    res.json({ nombre, descripcion, idcategoria, idmarca, precio, stock });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const deleteProducto = async (req, res) => {
  try {
    const pool = await getConnection(dbconfig);

    const result = await pool
      .request()
      .input('idproducto', req.params.idproducto)
      .query(queryProductos.deleteProducto);

    if (result.rowsAffected[0] === 0) return res.sendStatus(404);

    return res.sendStatus(204);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
