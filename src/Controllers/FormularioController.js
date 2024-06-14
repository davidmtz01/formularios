// FormularioController.js

import mongoose from 'mongoose';

const formularioSchema = new mongoose.Schema({
    nombreCompleto: String,
    direccion: String,
    numeroTelefono: String,
    correoElectronico: String,
    edad: Number,
    estadoCivil: String,
    tipoVivienda: String,
    propietarioInquilino: String,
    tamanoVivienda: String,
    patioJardinSeguro: String,
    numeroPersonas: Number,
    edadesPersonas: String,
    otrosAnimales: String,
    alergiasMascotas: String,
    haTenidoMascotas: String,
    detallesMascotasAnteriores: String,
    cuidadoEntrenamiento: String,
    razonesAdopcion: String,
    expectativasMascota: String
}, { versionKey: false });

const FormularioModel = mongoose.model('Formulario', formularioSchema);

export const getFormulario = async (req, res) => {
    try {
        const formularios = await FormularioModel.find().lean();

        // Construir arreglo de objetos con campos en orden específico
        const responseData = formularios.map(formulario => ({
            _id: formulario._id,
            nombreCompleto: formulario.nombreCompleto,
            direccion: formulario.direccion,
            numeroTelefono: formulario.numeroTelefono,
            correoElectronico: formulario.correoElectronico,
            edad: formulario.edad,
            estadoCivil: formulario.estadoCivil,
            tipoVivienda: formulario.tipoVivienda,
            propietarioInquilino: formulario.propietarioInquilino,
            tamanoVivienda: formulario.tamanoVivienda,
            patioJardinSeguro: formulario.patioJardinSeguro,
            numeroPersonas: formulario.numeroPersonas,
            edadesPersonas: formulario.edadesPersonas,
            otrosAnimales: formulario.otrosAnimales,
            alergiasMascotas: formulario.alergiasMascotas,
            haTenidoMascotas: formulario.haTenidoMascotas,
            detallesMascotasAnteriores: formulario.detallesMascotasAnteriores,
            cuidadoEntrenamiento: formulario.cuidadoEntrenamiento,
            razonesAdopcion: formulario.razonesAdopcion,
            expectativasMascota: formulario.expectativasMascota
        }));

        return res.status(200).json({ status: true, data: responseData });
    } catch (error) {
        return res.status(500).json({ status: false, errors: [error.message] });
    }
};


export const saveFormulario = async (req, res) => {
    try {
        const { nombreCompleto, direccion, numeroTelefono, correoElectronico, edad, estadoCivil, tipoVivienda, propietarioInquilino, tamanoVivienda, patioJardinSeguro, numeroPersonas, edadesPersonas, otrosAnimales, alergiasMascotas, haTenidoMascotas, detallesMascotasAnteriores, cuidadoEntrenamiento, razonesAdopcion, expectativasMascota } = req.body;

        const nuevoFormulario = new FormularioModel({
            nombreCompleto,
            direccion,
            numeroTelefono,
            correoElectronico,
            edad,
            estadoCivil,
            tipoVivienda,
            propietarioInquilino,
            tamanoVivienda,
            patioJardinSeguro,
            numeroPersonas,
            edadesPersonas,
            otrosAnimales,
            alergiasMascotas,
            haTenidoMascotas,
            detallesMascotasAnteriores,
            cuidadoEntrenamiento,
            razonesAdopcion,
            expectativasMascota
        });

        await nuevoFormulario.save();
        return res.status(200).json({ status: true, message: 'Datos guardados exitosamente' });
    } catch (error) {
        return res.status(500).json({ status: false, errors: [error.message] });
    }
};

export const updateFormulario = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombreCompleto, direccion, numeroTelefono, correoElectronico, edad, estadoCivil, tipoVivienda, propietarioInquilino, tamanoVivienda, patioJardinSeguro, numeroPersonas, edadesPersonas, otrosAnimales, alergiasMascotas, haTenidoMascotas, detallesMascotasAnteriores, cuidadoEntrenamiento, razonesAdopcion, expectativasMascota } = req.body;

        // Actualiza el documento
        const formulario = await FormularioModel.findByIdAndUpdate(id, {
            nombreCompleto,
            direccion,
            numeroTelefono,
            correoElectronico,
            edad,
            estadoCivil,
            tipoVivienda,
            propietarioInquilino,
            tamanoVivienda,
            patioJardinSeguro,
            numeroPersonas,
            edadesPersonas,
            otrosAnimales,
            alergiasMascotas,
            haTenidoMascotas,
            detallesMascotasAnteriores,
            cuidadoEntrenamiento,
            razonesAdopcion,
            expectativasMascota
        }, { new: true });

        if (!formulario) {
            return res.status(404).json({ status: false, errors: "Formulario no encontrado" });
        }

        // Construir objeto con campos en orden específico
        const responseData = {
            _id: formulario._id,
            nombreCompleto: formulario.nombreCompleto,
            direccion: formulario.direccion,
            numeroTelefono: formulario.numeroTelefono,
            correoElectronico: formulario.correoElectronico,
            edad: formulario.edad,
            estadoCivil: formulario.estadoCivil,
            tipoVivienda: formulario.tipoVivienda,
            propietarioInquilino: formulario.propietarioInquilino,
            tamanoVivienda: formulario.tamanoVivienda,
            patioJardinSeguro: formulario.patioJardinSeguro,
            numeroPersonas: formulario.numeroPersonas,
            edadesPersonas: formulario.edadesPersonas,
            otrosAnimales: formulario.otrosAnimales,
            alergiasMascotas: formulario.alergiasMascotas,
            haTenidoMascotas: formulario.haTenidoMascotas,
            detallesMascotasAnteriores: formulario.detallesMascotasAnteriores,
            cuidadoEntrenamiento: formulario.cuidadoEntrenamiento,
            razonesAdopcion: formulario.razonesAdopcion,
            expectativasMascota: formulario.expectativasMascota
        };

        return res.status(200).json({ status: true, data: responseData, message: 'Datos actualizados exitosamente' });
    } catch (error) {
        return res.status(500).json({ status: false, errors: [error.message] });
    }
};


export const deleteFormulario = async (req, res) => {
    try {
        const { id } = req.params;

        const formulario = await FormularioModel.findByIdAndDelete(id);
        if (!formulario) {
            return res.status(404).json({ status: false, errors: "Formulario no encontrado" });
        }

        return res.status(200).json({ status: true, message: 'Datos eliminados exitosamente' });
    } catch (error) {
        return res.status(500).json({ status: false, errors: [error.message] });
    }
};

const validar = (formData) => {
    const errors = [];
    if (!formData.nombreCompleto) {
        errors.push('El nombre completo es requerido');
    }
    // Aquí puedes agregar más validaciones según sea necesario
    return errors;
};
