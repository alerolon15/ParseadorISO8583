var express = require('express');
var router = express.Router();
var Parseador = require('../models/iso');
var net = require('net');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* POST para el metodo Parsear, toma el mensaje ISO del input, y con la clase Parseador devuelve un JSON con los datos parseados */
router.post('/', function(req, res, next) {
  // recibe valores del Form
  var iso = req.body.ISO;
  var ip = req.body.IP;
  var puerto = req.body.Puerto;

  // si el input esta vacio devuelve error
  if (iso == "") {
    res.render('index', { error: '<div class="card-panel red darken-2" style="color: rgba(255, 255, 255, 0.9);"><span>No ingreso Ninguna ISO</span><i class="material-icons right" onclick="Cerrar()">close</i></div>' })
  }else{
    // convierte la ISO a json y lo devuelve a la vista
    var isoParseado = new Parseador(iso);
    res.render('index', { ISO: isoParseado, body: req.body });
  }
});

/* Llamado por AJAX al metodo Enviar, emula una transaccion hacia un IP y puerto especifico */
router.post('/Enviar', function(req, res, next) {
  var iso = req.body.ISO;
  var ip = req.body.IP;
  var puerto = req.body.Puerto;
  var tcpp = req.body.TCPP;

  // si los datos del form vienen vacios devuelve un error a la vista
  if (!iso || !ip || !puerto) {
    console.log("Entré!");
    res.send({ error: '<div class="card-panel red darken-2" style="color: rgba(255, 255, 255, 0.9);"><span>Faltan datos para la emulacion!</span><i class="material-icons right" onclick="Cerrar()">close</i></div>' });
  }else{
    var isoParseado = new Parseador(iso);

    // Creamos el cliente Socket
    var client = new net.Socket();

    //console.log(ip, puerto)

    // conecta al Socket y envia el mensaje, dependiendo si es TCPP o TCP envia el tamaño del buffer al comienzo del mensaje
    client.connect(puerto, ip, function() {

      if (tcpp) {
        // en caso de hacer una conexion TCPP se envia el tamaño del mensaje como cabecera
        var length = iso.length;
        client.write(length + iso);
      }else{
        // en caso de hacer una conexion TCP
        client.write(iso);
      }
    });

    // En caso de recibir informacion por el socket
    client.on('data', function(data) {
      console.log('Received: ' + data);
      var datos = data.toString('ascii');
      //client.destroy(); // destruye el server despues de la respuesta del Server

      // si recibe otra cosa diferente a una ISO no hace nada, en caso de recibir una ISO retorna el mensaje
      if (datos.substr(0,3) == "ISO") {
        res.send({ ISO: datos });
      }
    });

    // En caso de recibir error
    client.on('error', function(data) {
      console.log(data);
      // si se recibe un codigo de error especifico se devuelve a la vista el codigo con un mensaje de error de falla de conexion
      if (data.code) {
        res.send({ error: '<div class="card-panel red darken-2" style="color: rgba(255, 255, 255, 0.9);"><span>Algo Salió Mal: no se pudo conectar a la ip y puerto establecida. Error: ' + data.code + '</span><i class="material-icons right" onclick="Cerrar()">close</i></div>' })
      }
    });

    // En caso de cierre del socket
    client.on('close', function() {
      console.log('Conexion Cerrada!');
    });
  }
});
module.exports = router;
