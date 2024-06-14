const mongoose = require("mongoose");

const AutorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "El nombre del autor es requerido"]
    }
}, { timestamps: true });

module.exports = mongoose.model("Author", AutorSchema);