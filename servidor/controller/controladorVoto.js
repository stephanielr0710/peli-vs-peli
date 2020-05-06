var conexion = require('../lib/conexionbd');

function agregarVoto(req, res){
   
    var idCompetencia= req.params.id;
    var idPelicula = req.body.idPelicula;
    var sql = "INSERT INTO voto (competencies_id, pelicula_id) values (" + idCompetencia + ", " + idPelicula + ")";
    
    conexion.query(sql, function(error, resultado, fields) {
        if (error) {
            console.log("Hubo un error en la consulta", error.message);
            return res.status(500).send("Hubo un error en la consulta");
        }
        var response = {
            'voto': resultado.insertId,
        };
        res.status(200).send(response);    
    });
};


module.exports = {
    agregarVoto : agregarVoto
};