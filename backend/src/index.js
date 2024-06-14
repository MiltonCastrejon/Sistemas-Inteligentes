import express from 'express';
import cors from 'cors';
import routes from './routes/endPoints.routes.js';

const PORT =3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/', routes);

 app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
 });

export default app;