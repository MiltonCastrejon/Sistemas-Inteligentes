import express from 'express';
import cors from 'cors';
import routes from './routes/endPoints.routes.js';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const PORT = 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'build')));

// Coloca tus rutas API antes de la ruta que devuelve index.html
app.use('/', routes);

// Para cualquier ruta que no coincida con las anteriores, devuelve index.html
app.get('*', (req, res) => { 
      res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

export default app;