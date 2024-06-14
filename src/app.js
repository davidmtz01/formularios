// app.js

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import { URL } from './config.js'; // Asegúrate de tener la URL de conexión correctamente importada
import rutasFormulario from './Routes/Formulario.routes.js';

mongoose.connect(URL, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Conectado a la base de datos'))
.catch(err => console.error('Error al conectar a la base de datos', err));

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Middleware para parsear application/x-www-form-urlencoded

app.use('/api', rutasFormulario); // Prefijo '/api' para las rutas

app.use((req, res) => {
    res.status(404).json({ status: false, errors: 'Not found' });
});

export default app;
