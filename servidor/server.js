var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');


var controlador = require('./controller/controlador');
var controladorVoto = require('./controller/controladorVoto');
var controladorCrear = require('./controller/controladorCrear');
var controladorGeneros = require('./controller/controladorGeneros');
var controladorDirectores = require('./controller/controladorDirectores');
var controladorActores = require('./controller/controladorActores');
var controladorEliminar = require('./controller/controladorEliminar');
var controladorEditar = require('./controller/controladorEditar');


var app = express();

app.use(express.urlencoded({
  extended: true
}));

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.use(express.json());

//setting//
app.set('appName','Proyecto Aplicacion Stephanie');


app.get('/generos', controladorGeneros.cargarGeneros);
app.get('/directores', controladorDirectores.cargarDirectores);
app.get('/actores', controladorActores.cargarActores);

app.get('/competencias/:id/peliculas', controlador.obtenerPeliculas);
app.post('/competencias/:id/voto', controladorVoto.agregarVoto);

app.get('/competencias/:id/resultados', controlador.obtenerResultados);
app.get('/competencias/:id', controlador.nombreCompetencia);

app.get('/competencias', controlador.buscarCompetencias);
app.put('/competencias/:id', controladorEditar.editarCompetencia);

app.post('/competencias', controladorCrear.crearNuevaCompetencia);

app.delete('/competencias/:id/votos', controladorEliminar.eliminarVotos);
app.delete('/competencias/:idCompetencia', controladorEliminar.eliminarCompetencias);

//seteamos el puerto en el cual va a escuchar los pedidos la aplicación
var puerto = '8080';

app.listen(puerto, function () {
  console.log( "Escuchando en el puerto " + puerto );
  console.log( app.get('appName') );
});

