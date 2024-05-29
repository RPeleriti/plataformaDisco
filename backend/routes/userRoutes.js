const express = require('express');
const router = express.Router();
const User = require('../models/usuarios');
const hashPassword = require('../utils/hashPassword');
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
    const { name, lastName,email,password } = req.body;
    try {
        const hashed = await hashPassword(password);
        const user = new User({
            name,
            lastName,
            email,
            password: hashed
           
        });
        await user.save();
        res.sendStatus(201);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.post('/login', async (req, res) => {
    const { user, password } = req.body;
    try {
        const existingUser = await User.findOne({ email: user });
        if (!existingUser) {
            return res.status(401).send({ error: 'Usuario no encontrado' });
        }

        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(401).send({ error: 'Contraseña incorrecta' });
        }

        res.sendStatus(200);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = router;
