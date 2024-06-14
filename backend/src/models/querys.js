
export const queryLogin = {
  login: `SELECT euser, epassword,concat(nombre,' ',apellidos) As nombre FROM empleado WHERE euser = @usuario AND epassword = @password`,
};

export const queryProductos = {
  productos: `SELECT  idproducto,nombre,pr.descripcion, c.descripcion AS categoria , m.descripcion AS marca, precio, 
    stock FROM producto  pr
INNER JOIN dbo.categoria c ON c.idcategoria = pr.idcategoria
INNER JOIN dbo.marca m ON m.idmarca = pr.idmarca ORDER BY idproducto OFFSET (@PageNumber - 1) * @PageSize ROWS FETCH NEXT @PageSize ROWS ONLY`,

  totalProductos: `SELECT COUNT(*) AS total FROM producto`,

  insertProducto: `INSERT INTO producto (nombre,descripcion,idcategoria,idmarca,precio,stock) VALUES(@nombre,@descripcion,@idcategoria,@idmarca,@precio,@stock)`,

  productoById: `SELECT * FROM producto WHERE idproducto = @idproducto`,

  updateProducto: `UPDATE producto SET nombre = @nombre, descripcion = @descripcion, idcategoria = @idcategoria, idmarca = @idmarca, precio = @precio, stock = @stock WHERE idproducto = @idproducto`,

  deleteProducto: `DELETE FROM producto WHERE idproducto = @idproducto`,
};

export const queryCategorias = {
    categorias: `SELECT idcategoria,descripcion FROM categoria`,
    totalCategorias: `SELECT COUNT(*) AS total FROM categoria`,
    
};

export const queryMarcas = {
    marcas: `SELECT * FROM marca`,
    totalMarcas: `SELECT COUNT(*) AS total FROM marca`,
};

export const queryVentas = {
   ventas: `SELECT v.idventa, 
       v.fechaventa, 
       c.nombre AS nombrecliente, 
       e.nombre AS nombrempleado,  
       v.totalventa, 
       td.descripciontd
FROM ventas v
INNER JOIN cliente c ON v.idcliente = c.idcliente
INNER JOIN tipodocumento td ON v.idtipodocumento = td.idtipodocumento
INNER JOIN dbo.empleado e ON v.idempleado = e.idempleado
ORDER BY v.idventa
OFFSET (@PageNumber - 1) * @PageSize ROWS 
FETCH NEXT @PageSize ROWS ONLY;
 
`,
  totalventas: `SELECT COUNT(*) AS total FROM ventas`,
};

export const queryDetalleVentas = {
  
};