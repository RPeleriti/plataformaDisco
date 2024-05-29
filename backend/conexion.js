let mongoose = require("mongoose");
 let conexionBd=mongoose
.connect("mongodb+srv://proyectoromi1:ZIwf4rUFgJthW645@cluster0.zkd4hu8.mongodb.net/album?retryWrites=true&w=majority&appName=Cluster0")
.then(function(db) {
    console.log("Conectado a la base de datos")
})
.catch(function (error) {
    console.log("error");

  
});
module.exports=conexionBd;