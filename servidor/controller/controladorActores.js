var conexion = require('../lib/conexionbd');

function cargarActores (req,res){
    var get = "SELECT * FROM actor"
    conexion.query(get, function (error, resultado, fields){
        if (error) {
            console.log("Error al cargar actores", error.message);
            return res.status(500).send(error);
        }
        res.send(JSON.stringify(resultado));
    });
}

module.exports = {
    cargarActores : cargarActores
};