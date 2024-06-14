import { Router } from 'express';
import login from '../controllers/loginController.js';
import { getPing } from '../controllers/pingController.js';
import {
  getProductos,
  createProducto,
  updateProducto,
  deleteProducto,
  getProductoById,
} from '../controllers/productoController.js';
import { getCategorias } from '../controllers/categoriaController.js';
import { getMarcas } from '../controllers/marcaController.js';
import { getVentas } from '../controllers/ventasController.js';
import { spawn } from 'child_process';

const router = Router();

router.get('/ping', getPing);

router.post('/login', login);

router.get('/productos', getProductos);

router.post('/productos', createProducto);

router.get('/productos/:idproducto', getProductoById);

router.delete('/productos/:idproducto', deleteProducto);

router.put('/productos/:idproducto', updateProducto);

router.get('/categorias', getCategorias);

router.get('/marcas', getMarcas);

router.get('/ventas', getVentas);

router.get('/predict-ventas', (req, res) => {
  
  const pythonProcess = spawn('C:/Users/Aldair/AppData/Local/Programs/Python/Python312/Python.exe', ['D:/Milton/Mass/backend/src/models/script.py']);


  let resultData = '';
  let errorData = '';

  pythonProcess.stdout.on('data', (data) => {
    resultData += data.toString();
  });

  pythonProcess.stderr.on('data', (data) => {
    errorData += data.toString();
  });

  pythonProcess.on('close', (code) => {
    if (code !== 0 || errorData) {
      console.error(`stderr: ${errorData}`);
      return res.status(500).json({ error: errorData });
    }

    if (!resultData) {
      return res.status(500).json({ error: 'No data returned from Python script' });
    }

    try {
      const result = JSON.parse(resultData);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: 'Error parsing Python output' });
    }
  });
});


export default router;
