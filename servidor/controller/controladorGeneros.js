var conexion = require('../lib/conexionbd');


function cargarGeneros (req,res){
    var get = "SELECT * FROM genero"
    conexion.query(get, function (error, resultado, fields){
        if (error) {
            console.log("Error al cargar géneros", error.message);
            return res.status(500).send(error);
        }
        res.send(JSON.stringify(resultado));
    });
}

module.exports = {
    cargarGeneros : cargarGeneros
};