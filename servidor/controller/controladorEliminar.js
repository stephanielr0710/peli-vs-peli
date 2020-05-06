var conexion = require('../lib/conexionbd');


function eliminarVotos (req,res){
    var idCompetencia = req.params.id;

    let sql = "SELECT * FROM competencies WHERE id = " + idCompetencia;
    
    conexion.query(sql, function(error, resultado, fields) {
        if (error) {
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta");
        }

        if (resultado.length === 0) {
            console.log("No se encontro ninguna competencia con este id");
            return res.status(404).send("No se encontro ninguna competencia con este id");
        }

        var borrar = "DELETE FROM voto WHERE competencies_id = " + idCompetencia;
        conexion.query(borrar, function (error, resultado){
            if (error) {
                console.log("Error al eliminar votos", error.message);
                return res.status(500).send(error);
            }
            console.log("Competencia reiniciada id: " + idCompetencia);
            res.send(JSON.stringify(resultado));
        });
    });

    };

function eliminarCompetencias (req,res){
    
    const idCompetencia = req.params.idCompetencia; 
    let sql = "SELECT * FROM competencies WHERE id = " + idCompetencia;
    
    conexion.query(sql, function(error, resultado, fields) {
        if (error) {
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta");
        }

        if (resultado.length === 0) {
            console.log("No se encontro ninguna competencia con este id");
            return res.status(404).send("No se encontro ninguna competencia con este id");
        }

        let sql = "DELETE FROM voto WHERE voto.competencies_id = " + idCompetencia;

        conexion.query(sql, function(error, resultado, fields) {
            if (error) {
                console.log("Hubo un error en la eliminacion de los votos", error.message);
                return res.status(500).send("Hubo un error en la eliminacion de los votos");
            }

            let sql = "DELETE FROM competencies WHERE id = " + idCompetencia;

            conexion.query(sql, function(error, resultado, fields) {
                if (error) {
                    console.log("Hubo un error al intentar eliminar la competencia", error.message);
                    return res.status(500).send("Hubo un error al intentar eliminar la competencia");
                }
    
                res.status(200).send();    
            });                
        });             
    });
}
        
module.exports = {
    eliminarVotos : eliminarVotos,
    eliminarCompetencias : eliminarCompetencias
};