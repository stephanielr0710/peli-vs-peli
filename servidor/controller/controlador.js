var conexion = require('../lib/conexionbd');


function buscarCompetencias(req, res){
    conexion.query('SELECT * FROM competencies', (error, results, fields) => {
if (error) console.error(error);
 

res.send(JSON.stringify(results));
}
)
};

function obtenerPeliculas(req, res){
    
const idCompetencia = req.params.id; 
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

        const competencia = resultado[0];

        let sql = "SELECT pelicula.id,pelicula.poster,pelicula.titulo FROM pelicula", join = "", where = "";
            
        if (competencia.actor_id){
            join += " INNER JOIN actor_pelicula ON pelicula.id = actor_pelicula.pelicula_id" ;
            where += " WHERE actor_pelicula.actor_id = " + competencia.actor_id;
        } 
        
        if (competencia.director_id){
            join += " INNER JOIN director_pelicula ON pelicula.id = director_pelicula.pelicula_id" ;

            if (where.length > 0){
                where += " and ";
            } else {
                where += " WHERE ";
            }

            where +=  "director_pelicula.director_id = " + competencia.director_id;
        } 
        
        if (competencia.genero_id){
            if (where.length > 0){
                where += " and ";
            } else {
                where += " WHERE ";
            }

            where += "pelicula.genero_id = " + competencia.genero_id;
        }

    
        sql += join + where + " ORDER BY RAND() LIMIT 2";
        
        conexion.query(sql, function(error, resultado, fields) {
            if (error) {
                console.log("Hubo un error en la consulta", error.message);
                return res.status(404).send("Hubo un error en la consulta");
            }

            const response = {
                'competencia': competencia.nombre,
                'peliculas': resultado
            };
            
            res.send(JSON.stringify(response));    
        });             
    });
}


function obtenerResultados(req, res){
   
    const idCompetencia = req.params.id; 
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

        const competencia = resultado[0];

        let sql = "SELECT voto.pelicula_id, pelicula.poster,pelicula.titulo,COUNT(pelicula_id) As votos FROM voto INNER JOIN pelicula ON voto.pelicula_id = pelicula.id WHERE voto.competencies_id = " + idCompetencia + " GROUP BY voto.pelicula_id ORDER BY COUNT(pelicula_id) DESC LIMIT 3";
        
        
        conexion.query(sql, function(error, resultado, fields) {
            if (error) {
                console.log("Hubo un error en la consulta", error.message);
                return res.status(404).send("Hubo un error en la consulta");
            }

            const response = {
                'competencia': competencia.nombre,
                'resultados': resultado
            };
            
            res.send(JSON.stringify(response));    
        });             
    });
}

 function nombreCompetencia (req, res){
    var nombreCompetencia = req.params.id;
    var query = "SELECT competencies.id, competencies.nombre, genero.nombre genero, director.nombre director, actor.nombre actor FROM competencies LEFT JOIN genero ON genero_id = genero.id LEFT JOIN director ON director_id= director.id LEFT JOIN actor ON actor_id= actor.id WHERE competencies.id = " + nombreCompetencia;
    conexion.query(query, function(error, resultado){
        if (error) {
            console.log("Hubo un error en la consulta", error.message);
            return res.status(500).send("Hubo un error en la consulta");
        }       

        var response = {
            'id': resultado,
            'nombre': resultado[0].nombre,
            'genero_nombre': resultado[0].genero,
            'actor_nombre': resultado[0].actor,
            'director_nombre': resultado[0].director
        }
        res.send(JSON.stringify(response));
    });
}


module.exports = {
    buscarCompetencias : buscarCompetencias,
    obtenerPeliculas : obtenerPeliculas,
    obtenerResultados : obtenerResultados,
    nombreCompetencia : nombreCompetencia
};

