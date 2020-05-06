var conexion = require('../lib/conexionbd');

function crearNuevaCompetencia(req, res){
    var nombreCompetencia = req.body.nombre
    var genero_id = (req.body.genero == '0') ? null : req.body.genero
    var director_id = (req.body.director == '0') ? null : req.body.director
    var actor_id = (req.body.actor == '0') ? null : req.body.actor

    var sql = "select nombre " +
              "from competencies " +
              "where nombre = '" + nombreCompetencia + "'";

    conexion.query(sql, function(error, resultado, fields) {
        if (error) {
            console.log("Hubo un error en la consulta", error.message);
            return res.status(500).send("Hubo un error en la consulta");
        }
        
        if (resultado.length != 0) {
            console.log("Ya existe una competencia con ese nombre.");
            return res.status(422).send("Ya existe una competencia con ese nombre.");
        }
        
        sql = 'select count(*) as Cantidad ' +
              'from pelicula as P ' +
              'left join director_pelicula as DP on (P.id = DP.pelicula_id) ' +
              'left join actor_pelicula as AP on (P.id = AP.pelicula_id) ';

        var sqlWhere = "";
   
        if ((genero_id) || (director_id) || (actor_id)) {
            sqlWhere = " where ";
            
            if (genero_id)   {sqlWhere = sqlWhere + " P.genero_id = " + genero_id + " and";}
            if (director_id) {sqlWhere = sqlWhere + " DP.director_id = " + director_id + " and";}
            if (actor_id)    {sqlWhere = sqlWhere + " AP.actor_id = " + actor_id + " and";}

            sqlWhere = sqlWhere.substr(0, sqlWhere.length - 3)
        }
        sql = sql + sqlWhere

        conexion.query(sql, function(error, resultado, fields) {
            if (error) {
                console.log("Hubo un error en la consulta", error.message);
                return res.status(500).send("Hubo un error en la consulta");
            }

            if (resultado[0].Cantidad < 2) {
                console.log("No se puede crear la competencia. No exiten al menos 2 películas que cumplan las condiciones");
                return res.status(422).send("No se puede crear la competencia. No exiten al menos 2 películas que cumplan las condiciones");
            }
            
            var sql = "insert into competencies " +
                      "(nombre, genero_id, director_id, actor_id) " +
                      "values " +
                      "('" + nombreCompetencia + "'," +
                      genero_id + "," +
                      director_id + "," +
                      actor_id + ")";

            conexion.query(sql, function(error, resultado, fields) {
                if (error) {
                    console.log("Hubo un error en la consulta", error.message);
                    return res.status(500).send("Hubo un error en la consulta");
                }
                var response = {
                    'nuevoId': resultado.insertId
                };

                res.send(JSON.stringify(response));
              });
            });
        });
}

module.exports = {
    crearNuevaCompetencia : crearNuevaCompetencia
};