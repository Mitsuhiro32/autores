const Autor = require("../models/autor.model");

module.exports = {
    // Crear un autor nuevo
    createAutor: (req, res) => {
        const { name } = req.body;

        if (!name) {
            res.statusMessage = "El nombre del autor es requerido";
            return res.status(400).send(res.statusMessage);
        } else if (name.length < 3) {
            res.statusMessage = "El nombre del autor debe tener al menos 3 caracteres";
            return res.status(400).send(res.statusMessage);
        }

        const autorNuevo = {
            name: req.body.name
        };

        Autor.create(autorNuevo)
            .then((autor) => res.json(autor))
            .catch((err) => res.json(err));
    },

    // Obtener todos los autores
    getAllAutores: (req, res) => {
        Autor.find()
            .then((autores) => res.json(autores))
            .catch((err) => res.json(err));
    },

    // Obtener un autor por ID
    getAutorById: (req, res) => {
        Autor.findOne({ _id: req.params.id })
            .then((autor) => res.json(autor))
            .catch((err) => res.json(err));
    },

    // Actualizar un autor por ID
    updateAutor: (req, res) => {
        Autor.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
            .then((autor) => res.json(autor))
            .catch((err) => res.json(err));
    },

    // Borrar un autor por ID
    deleteAutor: (req, res) => {
        Autor.deleteOne({ _id: req.params.id })
            .then((autor) => res.json(autor))
            .catch((err) => res.json(err));
    }
};