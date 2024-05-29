const express = require('express');
const router = express.Router();
const canciones= require("./models/canciones");
router.post("/agregar",async function(req, res) {
    try { await canciones.create(req.body); 
        res.send("Cancion agregada")
    } 
    
    catch (error) { res.send(error)};

});




module.exports =router