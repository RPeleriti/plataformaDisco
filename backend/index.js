const express = require('express');
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const conexion= require('./conexion');
const Cancion = require('./models/canciones');

const app = express();
const PORT = 3000;
app.use("/health", (req, res) => res.sendStatus(200));

// Configuración de multer para subir archivos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Importar rutas de usuario
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// Rutas de canciones
app.get("/canciones", async (req, res) => {
    try {
        const canciones = await Cancion.find();
        res.status(200).json(canciones);
    } catch (error) {
        console.error("Error al obtener las canciones:", error);
        res.status(500).json({ message: "Error al obtener las canciones" });
    }
});

app.post("/cancion", upload.single('portada'), async (req, res) => {
    try {
        const { disco, titulo, duracion, lanzamiento } = req.body;
        const portada = req.file ? req.file.path : null;
        const nuevaCancion = new Cancion({ disco, titulo, duracion, lanzamiento, portada });
        await nuevaCancion.save();
        res.status(200).json({ message: "¡Canción agregada correctamente!" });
    } catch (error) {
        console.error("Error al agregar la canción:", error);
        res.status(500).json({ message: "Error al agregar la canción" });
    }
});

app.put("/cancion/:id", upload.single('portada'), async (req, res) => {
    try {
        const { id } = req.params;
        const { disco, titulo, duracion, lanzamiento } = req.body;
        const portada = req.file ? req.file.path : null;
        await Cancion.findByIdAndUpdate(id, { disco, titulo, duracion, lanzamiento, portada });
        res.status(200).json({ message: "¡Canción actualizada correctamente!" });
    } catch (error) {
        console.error("Error al actualizar la canción:", error);
        res.status(500).json({ message: "Error al actualizar la canción" });
    }
});

app.delete("/cancion/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await Cancion.findByIdAndDelete(id);
        res.status(200).json({ message: "¡Canción eliminada correctamente!" });
    } catch (error) {
        console.error("Error al eliminar la canción:", error);
        res.status(500).json({ message: "Error al eliminar la canción" });
    }
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
