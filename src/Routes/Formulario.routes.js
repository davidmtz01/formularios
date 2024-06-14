// Formulario.routes.js

import { Router } from 'express';
import multer from 'multer'; // Importa multer
import { getFormulario, saveFormulario, updateFormulario, deleteFormulario } from '../Controllers/FormularioController.js';

const rutas = Router();
const upload = multer(); // Configura multer sin opciones para manejar form-data

rutas.get('/formulario', getFormulario);
rutas.get('/formulario/:id', getFormulario);
rutas.post('/formulario', upload.none(), saveFormulario); // Usa upload.none() para manejar form-data sin archivos
rutas.put('/formulario/:id', upload.none(), updateFormulario); // También para la actualización
rutas.delete('/formulario/:id', deleteFormulario);

export default rutas;
