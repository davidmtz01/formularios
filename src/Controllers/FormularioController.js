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

    if (!formData.direccion) {
        errors.push('La dirección es requerida');
    }

    if (!formData.numeroTelefono) {
        errors.push('El número de teléfono es requerido');
    } else if (!/^\d{10}$/.test(formData.numeroTelefono)) {
        errors.push('El número de teléfono debe tener 10 dígitos numéricos');
    }

    if (!formData.correoElectronico) {
        errors.push('El correo electrónico es requerido');
    } else if (!/\S+@\S+\.\S+/.test(formData.correoElectronico)) {
        errors.push('Ingrese un correo electrónico válido');
    }

    if (!formData.edad) {
        errors.push('La edad es requerida');
    } else if (formData.edad < 18 || formData.edad > 100) {
        errors.push('La edad debe estar entre 18 y 100 años');
    }

    if (!formData.estadoCivil) {
        errors.push('El estado civil es requerido');
    }

    if (!formData.tipoVivienda) {
        errors.push('El tipo de vivienda es requerido');
    }

    if (!formData.propietarioInquilino) {
        errors.push('Debe especificar si es propietario o inquilino');
    }

    if (!formData.tamanoVivienda) {
        errors.push('El tamaño de la vivienda es requerido');
    }

    if (!formData.patioJardinSeguro) {
        errors.push('Debe especificar si cuenta con patio o jardín seguro');
    }

    if (!formData.numeroPersonas) {
        errors.push('El número de personas es requerido');
    } else if (formData.numeroPersonas <= 0) {
        errors.push('El número de personas debe ser mayor que cero');
    }

    if (!formData.edadesPersonas) {
        errors.push('Debe especificar las edades de las personas en el hogar');
    }

    if (!formData.otrosAnimales) {
        errors.push('Debe especificar si tiene otros animales');
    }

    if (!formData.alergiasMascotas) {
        errors.push('Debe especificar si tiene alergias a las mascotas');
    }

    if (!formData.haTenidoMascotas) {
        errors.push('Debe especificar si ha tenido mascotas anteriormente');
    }

    if (!formData.detallesMascotasAnteriores) {
        errors.push('Debe proporcionar detalles de las mascotas anteriores');
    }

    if (!formData.cuidadoEntrenamiento) {
        errors.push('Debe especificar el cuidado y entrenamiento planeado para la mascota');
    }

    if (!formData.razonesAdopcion) {
        errors.push('Debe especificar las razones para la adopción');
    }

    if (!formData.expectativasMascota) {
        errors.push('Debe especificar las expectativas respecto a la nueva mascota');
    }

    return errors;
};
