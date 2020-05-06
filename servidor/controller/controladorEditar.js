var conexion = require('../lib/conexionbd');


    function editarCompetencia (req,res){
        var idCompetencia = req.params.id;
        var newName = req.body.nombre;

        var edit = "UPDATE competencies SET nombre = '"+ newName +"' WHERE id = "+ idCompetencia +";";
        
        conexion.query(edit,function(error, resultado, fields){
            if(error){
                return res.status(500).send("Error al editar el nombre la competencia")
            }
            if (resultado.length == 0){
                console.log("No se encontro la pelicula buscada con ese id");
                return res.status(404).send("No se encontro ninguna pelicula con ese id");
            } else {
                var response = {
                    'id': resultado
                };
            }
            res.send(JSON.stringify(response));
        });
    };


        
module.exports = {
    editarCompetencia : editarCompetencia
    
};