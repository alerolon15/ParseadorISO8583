var express = require('express');
var router = express.Router();
var Parseador = require('../models/iso');
var net = require('net');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});


router.post('/', function(req, res, next) {
  var iso = req.body.ISO;
  var ip = req.body.IP;
  var puerto = req.body.Puerto;

  if (iso == "") {
    res.render('index', { error: '<div class="card-panel red darken-2" onclick="Cerrar()" style="color: rgba(255, 255, 255, 0.9);"><span>No ingreso Ninguna ISO</span><i class="material-icons right">close</i></div>' })
  }else{
    var isoParseado = new Parseador(iso);

    res.render('index', { ISO: isoParseado, body: req.body });
  }
});

router.post('/Enviar', function(req, res, next) {
  var iso = req.body.ISO;
  var ip = req.body.IP;
  var puerto = req.body.Puerto;
  var tcpp = req.body.TCPP;

  console.log(iso);
  console.log(puerto);
  console.log(ip);
  if (!iso || !ip || !puerto) {
    console.log("Entré!");
    res.send({ error: '<div class="card-panel red darken-2" onclick="Cerrar()" style="color: rgba(255, 255, 255, 0.9);"><span>Faltan datos para la emulacion!</span><i class="material-icons right">close</i></div>' });
  }else{
    var isoParseado = new Parseador(iso);

    var client = new net.Socket();

    console.log(ip, puerto)

    client.connect(puerto, ip, function() {

      if (tcpp) {
        // en caso de hacer una conexion TCPP se envia el tamaño del mensaje como cabecera
        var length = iso.length;
        client.write(length + iso);
      }else{
        // en caso de hacer una conexion TCP descomentar la linea de abajo y comentar la de TCPP
        client.write(iso);
      }
    });

    // En caso de recibir informacion por el socket
    client.on('data', function(data) {
      console.log('Received: ' + data);
      var datos = data.toString('ascii');
      //client.destroy(); // kill client after server's response
      if (datos.substr(0,3) == "ISO") {
        res.send({ ISO: datos });
      }
    });

    // En caso de recibir error
    client.on('error', function(data) {
      console.log(data);
      if (data.code) {
        res.send({ error: '<div class="card-panel red darken-2" onclick="Cerrar()" style="color: rgba(255, 255, 255, 0.9);"><span>Algo Salió Mal: no se pudo conectar a la ip y puerto establecida. Error: ' + data.code + '</span><i class="material-icons right">close</i></div>' })
      }
    });

    // En caso de recibir evento de cierre de socket
    client.on('close', function() {
      console.log('Conexion Cerrada!');
    });
  }
});
module.exports = router;
