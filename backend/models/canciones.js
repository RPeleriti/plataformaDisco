const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cancionesSchema = new mongoose.Schema({
    disco: String,
    titulo: String,
    duracion: String,
    lanzamiento: Date,
    portada: String
});

module.exports = mongoose.model('Cancion', cancionesSchema);
