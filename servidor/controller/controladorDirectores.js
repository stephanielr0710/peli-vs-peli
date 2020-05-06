var conexion = require('../lib/conexionbd');

function cargarDirectores (req,res){
    var get = "SELECT * FROM director"
    conexion.query(get, function (error, resultado, fields){
        if (error) {
            console.log("Error al cargar directores", error.message);
            return res.status(500).send(error);
        }
        res.send(JSON.stringify(resultado));
    });
}

module.exports = {
    cargarDirectores : cargarDirectores
};