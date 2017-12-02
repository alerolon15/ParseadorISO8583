/* Modelo de la Clase ISO8583 Release 4 */
/* Este modelo fue hecho para parsear Mensajes tipo ISO8583 para la red financiera LINK */

module.exports = function ParsearISO(iso) {
	// recibe una ISO y devuelve un JSON con todos los campos presentes en la ISO y sus valores con sus longitudes
	var ISO = iso;
	var strCamposISO = ISO.substring(32);

	// diccionario de longitudes (pueden ser variables o fijos) con una descripcion de algunos campos.
	var _CamposISO = {
			"ISO" : [
					{ "Campo" : "F1", "longitud" : 16, "variable" : false, "Descripcion" : "Secondary Bitmap" },
					{ "Campo" : "F2", "longitud" : 2,  "variable" : true, "Descripcion" : "" },
					{ "Campo" : "F3", "longitud" : 6,  "variable" : false, "Descripcion" : "Tipo de Transaccion"  },
					{ "Campo" : "F4", "longitud" : 12, "variable" : false, "Descripcion" : "Importe"  },
					{ "Campo" : "F5", "longitud" : 12, "variable" : false, "Descripcion" : ""  },
					{ "Campo" : "F6", "longitud" : 12, "variable" : false, "Descripcion" : ""  },
					{ "Campo" : "F7", "longitud" : 10, "variable" : false, "Descripcion" : "MMDDHHMMSS"  },
					{ "Campo" : "F8", "longitud" : 8,  "variable" : false, "Descripcion" : ""  },
					{ "Campo" : "F9", "longitud" : 8,  "variable" : false, "Descripcion" : ""  },
					{ "Campo" : "F10", "longitud" : 8, "variable" : false, "Descripcion" : ""  },
					{ "Campo" : "F11", "longitud" : 6, "variable" : false, "Descripcion" : ""  },
					{ "Campo" : "F12", "longitud" : 6, "variable" : false, "Descripcion" : "HORA"  },
					{ "Campo" : "F13", "longitud" : 4, "variable" : false, "Descripcion" : "YYMM"  },
					{ "Campo" : "F14", "longitud" : 4, "variable" : false, "Descripcion" : ""  },
					{ "Campo" : "F15", "longitud" : 4, "variable" : false, "Descripcion" : ""  },
					{ "Campo" : "F16", "longitud" : 4, "variable" : false, "Descripcion" : ""  },
					{ "Campo" : "F17", "longitud" : 4, "variable" : false, "Descripcion" : "MMDD"  },
					{ "Campo" : "F18", "longitud" : 4, "variable" : false, "Descripcion" : ""  },
					{ "Campo" : "F19", "longitud" : 3, "variable" : false, "Descripcion" : ""  },
					{ "Campo" : "F20", "longitud" : 3, "variable" : false, "Descripcion" : ""  },
					{ "Campo" : "F21", "longitud" : 3, "variable" : false, "Descripcion" : ""  },
					{ "Campo" : "F22", "longitud" : 3, "variable" : false, "Descripcion" : ""  },
					{ "Campo" : "F23", "longitud" : 3, "variable" : false, "Descripcion" : ""  },
					{ "Campo" : "F24", "longitud" : 3, "variable" : false, "Descripcion" : ""  },
					{ "Campo" : "F25", "longitud" : 2, "variable" : false, "Descripcion" : ""  },
					{ "Campo" : "F26", "longitud" : 2, "variable" : false, "Descripcion" : ""  },
					{ "Campo" : "F27", "longitud" : 1, "variable" : false, "Descripcion" : ""  },
					{ "Campo" : "F28", "longitud" : 9, "variable" : false, "Descripcion" : ""  },
					{ "Campo" : "F29", "longitud" : 9, "variable" : false, "Descripcion" : ""  },
					{ "Campo" : "F30", "longitud" : 9, "variable" : false, "Descripcion" : ""  },
					{ "Campo" : "F31", "longitud" : 9, "variable" : false, "Descripcion" : ""  },
					{ "Campo" : "F32", "longitud" : 2, "variable" : true, "Descripcion" : ""  },
					{ "Campo" : "F33", "longitud" : 2, "variable" : true, "Descripcion" : ""  },
					{ "Campo" : "F34", "longitud" : 2, "variable" : true, "Descripcion" : ""  },
					{ "Campo" : "F35", "longitud" : 2, "variable" : true, "Descripcion" : "Numero de Tarjeta"  },
					{ "Campo" : "F36", "longitud" : 3, "variable" : true, "Descripcion" : ""  },
					{ "Campo" : "F37", "longitud" : 12, "variable" : false, "Descripcion" : "Numero de Secuencia"  },
					{ "Campo" : "F38", "longitud" : 6, "variable" : false, "Descripcion" : ""  },
					{ "Campo" : "F39", "longitud" : 2, "variable" : false, "Descripcion" : "Codigo Respuesta"  },
					{ "Campo" : "F40", "longitud" : 3, "variable" : false, "Descripcion" : ""  },
					{ "Campo" : "F41", "longitud" : 16, "variable" : false, "Descripcion" : "Terminal"  },
					{ "Campo" : "F42", "longitud" : 15, "variable" : false, "Descripcion" : ""  },
					{ "Campo" : "F43", "longitud" : 40, "variable" : false, "Descripcion" : ""  },
					{ "Campo" : "F44", "longitud" : 2, "variable" : true, "Descripcion" : ""  },
					{ "Campo" : "F45", "longitud" : 2, "variable" : true, "Descripcion" : ""  },
					{ "Campo" : "F46", "longitud" : 3, "variable" : true, "Descripcion" : ""  },
					{ "Campo" : "F47", "longitud" : 3, "variable" : true, "Descripcion" : ""  },
					{ "Campo" : "F48", "longitud" : 3, "variable" : true, "Descripcion" : ""  },
					{ "Campo" : "F49", "longitud" : 3, "variable" : false, "Descripcion" : "Tipo de Moneda"  },
					{ "Campo" : "F50", "longitud" : 3, "variable" : false, "Descripcion" : ""  },
					{ "Campo" : "F51", "longitud" : 3, "variable" : false, "Descripcion" : ""  },
					{ "Campo" : "F52", "longitud" : 16, "variable" : false, "Descripcion" : ""  },
					{ "Campo" : "F53", "longitud" : 16, "variable" : false, "Descripcion" : ""  },
					{ "Campo" : "F54", "longitud" : 3, "variable" : true, "Descripcion" : "Datos"  },
					{ "Campo" : "F55", "longitud" : 3, "variable" : true, "Descripcion" : "Datos"  },
					{ "Campo" : "F56", "longitud" : 3, "variable" : true, "Descripcion" : ""  },
					{ "Campo" : "F57", "longitud" : 3, "variable" : true, "Descripcion" : ""  },
					{ "Campo" : "F58", "longitud" : 3, "variable" : true, "Descripcion" : ""  },
					{ "Campo" : "F59", "longitud" : 3, "variable" : true, "Descripcion" : ""  },
					{ "Campo" : "F60", "longitud" : 3, "variable" : true, "Descripcion" : "RED ATM"  },
					{ "Campo" : "F61", "longitud" : 3, "variable" : true, "Descripcion" : ""  },
					{ "Campo" : "F62", "longitud" : 3, "variable" : true, "Descripcion" : "Terminal"  },
					{ "Campo" : "F63", "longitud" : 3, "variable" : true, "Descripcion" : ""  },
					{ "Campo" : "F64", "longitud" : 16, "variable" : false, "Descripcion" : ""  },
					{ "Campo" : "F65", "longitud" : 8, "variable" : false, "Descripcion" : ""  },
					{ "Campo" : "F66", "longitud" : 1, "variable" : false, "Descripcion" : ""  },
					{ "Campo" : "F67", "longitud" : 2, "variable" : false, "Descripcion" : ""  },
					{ "Campo" : "F68", "longitud" : 3, "variable" : false, "Descripcion" : ""  },
					{ "Campo" : "F69", "longitud" : 3, "variable" : false, "Descripcion" : ""  },
					{ "Campo" : "F70", "longitud" : 3, "variable" : false, "Descripcion" : ""  },
					{ "Campo" : "F71", "longitud" : 4, "variable" : false, "Descripcion" : ""  },
					{ "Campo" : "F72", "longitud" : 4, "variable" : false, "Descripcion" : ""  },
					{ "Campo" : "F73", "longitud" : 6, "variable" : false, "Descripcion" : ""  },
					{ "Campo" : "F74", "longitud" : 10, "variable" : false, "Descripcion" : ""  },
					{ "Campo" : "F75", "longitud" : 10, "variable" : false, "Descripcion" : ""  },
					{ "Campo" : "F76", "longitud" : 10, "variable" : false, "Descripcion" : ""  },
					{ "Campo" : "F77", "longitud" : 10, "variable" : false, "Descripcion" : ""  },
					{ "Campo" : "F78", "longitud" : 10, "variable" : false, "Descripcion" : ""  },
					{ "Campo" : "F79", "longitud" : 10, "variable" : false, "Descripcion" : ""  },
					{ "Campo" : "F80", "longitud" : 10, "variable" : false, "Descripcion" : ""  },
					{ "Campo" : "F81", "longitud" : 10, "variable" : false, "Descripcion" : ""  },
					{ "Campo" : "F82", "longitud" : 12, "variable" : false, "Descripcion" : ""  },
					{ "Campo" : "F83", "longitud" : 12, "variable" : false, "Descripcion" : ""  },
					{ "Campo" : "F84", "longitud" : 12, "variable" : false, "Descripcion" : ""  },
					{ "Campo" : "F85", "longitud" : 12, "variable" : false, "Descripcion" : ""  },
					{ "Campo" : "F86", "longitud" : 16, "variable" : false, "Descripcion" : ""  },
					{ "Campo" : "F87", "longitud" : 16, "variable" : false, "Descripcion" : ""  },
					{ "Campo" : "F88", "longitud" : 16, "variable" : false, "Descripcion" : ""  },
					{ "Campo" : "F89", "longitud" : 16, "variable" : false, "Descripcion" : ""  },
					{ "Campo" : "F90", "longitud" : 42, "variable" : false, "Descripcion" : ""  },
					{ "Campo" : "F91", "longitud" : 1, "variable" : false, "Descripcion" : ""   },
					{ "Campo" : "F92", "longitud" : 2, "variable" : false, "Descripcion" : ""   },
					{ "Campo" : "F93", "longitud" : 5, "variable" : false, "Descripcion" : ""   },
					{ "Campo" : "F94", "longitud" : 7, "variable" : false, "Descripcion" : ""   },
					{ "Campo" : "F95", "longitud" : 42, "variable" : false, "Descripcion" : ""  },
					{ "Campo" : "F96", "longitud" : 16, "variable" : false, "Descripcion" : ""  },
					{ "Campo" : "F97", "longitud" : 17, "variable" : false, "Descripcion" : ""  },
					{ "Campo" : "F98", "longitud" : 25, "variable" : false, "Descripcion" : ""  },
					{ "Campo" : "F99", "longitud" : 2, "variable" : true, "Descripcion" : ""  },
					{ "Campo" : "F100", "longitud" : 2,  "variable" : true, "Descripcion" : ""  },
					{ "Campo" : "F101", "longitud" : 2,  "variable" : true, "Descripcion" : ""  },
					{ "Campo" : "F102", "longitud" : 2,  "variable" : true, "Descripcion" : "Cuenta Debito"  },
					{ "Campo" : "F103", "longitud" : 2,  "variable" : true, "Descripcion" : "Cuenta Credito"  },
					{ "Campo" : "F104", "longitud" : 3,  "variable" : true, "Descripcion" : ""  },
					{ "Campo" : "F105", "longitud" : 3,  "variable" : true, "Descripcion" : ""  },
					{ "Campo" : "F106", "longitud" : 3,  "variable" : true, "Descripcion" : ""  },
					{ "Campo" : "F107", "longitud" : 3,  "variable" : true, "Descripcion" : ""  },
					{ "Campo" : "F108", "longitud" : 3,  "variable" : true, "Descripcion" : ""  },
					{ "Campo" : "F109", "longitud" : 3,  "variable" : true, "Descripcion" : ""  },
					{ "Campo" : "F110", "longitud" : 3,  "variable" : true, "Descripcion" : ""  },
					{ "Campo" : "F111", "longitud" : 3,  "variable" : true, "Descripcion" : ""  },
					{ "Campo" : "F112", "longitud" : 3,  "variable" : true, "Descripcion" : ""  },
					{ "Campo" : "F113", "longitud" : 3,  "variable" : true, "Descripcion" : ""  },
					{ "Campo" : "F114", "longitud" : 3,  "variable" : true, "Descripcion" : ""  },
					{ "Campo" : "F115", "longitud" : 3,  "variable" : true, "Descripcion" : ""  },
					{ "Campo" : "F116", "longitud" : 3,  "variable" : true, "Descripcion" : ""  },
					{ "Campo" : "F117", "longitud" : 3,  "variable" : true, "Descripcion" : ""  },
					{ "Campo" : "F118", "longitud" : 3,  "variable" : true, "Descripcion" : ""  },
					{ "Campo" : "F119", "longitud" : 3,  "variable" : true, "Descripcion" : ""  },
					{ "Campo" : "F120", "longitud" : 3,  "variable" : true, "Descripcion" : "Sucursal y region del Cajero"  },
					{ "Campo" : "F121", "longitud" : 3,  "variable" : true, "Descripcion" : ""  },
					{ "Campo" : "F122", "longitud" : 3,  "variable" : true, "Descripcion" : ""  },
					{ "Campo" : "F123", "longitud" : 3,  "variable" : true, "Descripcion" : ""  },
					{ "Campo" : "F124", "longitud" : 3,  "variable" : true, "Descripcion" : ""  },
					{ "Campo" : "F125", "longitud" : 3,  "variable" : true, "Descripcion" : ""  },
					{ "Campo" : "F126", "longitud" : 3,  "variable" : true, "Descripcion" : ""  },
					{ "Campo" : "F127", "longitud" : 3,  "variable" : true, "Descripcion" : "Region ATM y cambio USD"  }
				]
		};

	var Campos = [];

	// Toma los valores del Header del Mensaje y los agrega al JSON
  // Estos campos siempre son de longitud fija
	var H1 = ISO.substr(0,3);
	var H2 = ISO.substr(3,9);
	var H3 = ISO.substr(12,4);
	var H4 = ISO.substr(16,16);

	var BitMap = ISO.substr(16,32);

	Campos.push({ Campo: "H1", Valor : H1 , Longitud : 3, tipo : "F", "Descripcion" : "Header" });
	Campos.push({ Campo: "H2", Valor : H2 , Longitud : 9, tipo : "F", "Descripcion" : "Origen del Req" });
	Campos.push({ Campo: "H3", Valor : H3 , Longitud : 4, tipo : "F", "Descripcion" : "Tipo de Mensaje" });
	Campos.push({ Campo: "H4", Valor : H4 , Longitud : 16, tipo : "F", "Descripcion" : "PrimaryBitmap" });

	// tomamos ambos bitmaps Primario y secundario y buscamos cuales son los campos presentes en el mensaje recibido
	var Bitmaps = parsearHexa(BitMap, 0);

	var index = 0;

	// rellenamos campos con los valores de la ISO
	Bitmaps.forEach( function(campo) {
		_CamposISO.ISO.forEach(function(dicCampo) {
			if(campo == dicCampo.Campo) {
				if(dicCampo.variable) {
					var long = strCamposISO.substr(index, dicCampo.longitud);
					long = parseInt(long);
					index = index + dicCampo.longitud;
					var valorCampo = strCamposISO.substr(index, long);
					index = index + long;
					var Descripcion = dicCampo.Descripcion;

					var campito = '{ "Campo" : ' + '"' + campo + '" , ' + '"Valor" : "' + valorCampo + '" , "Longitud" : "' + long + '" , "tipo" : "V", "Descripcion" : "' + Descripcion + '" }';
					campito = JSON.parse(campito);
					Campos.push(campito);
				}else{
					var valorCampo = strCamposISO.substr(index, dicCampo.longitud);
					index = index + dicCampo.longitud;
					var longi = dicCampo.longitud;
					var Descripcion = dicCampo.Descripcion;

					//var campito = '{' + '"' + campo + '"' + ' : "' + valorCampo + '" }';
					var campito = '{ "Campo" : ' + '"' + campo + '" , ' + '"Valor" : "' + valorCampo + '" , "Longitud" : "' + longi + '" , "tipo" : "F", "Descripcion" : "' + Descripcion + '" }';

					campito = JSON.parse(campito);
					Campos.push(campito);
				};
			};
		});
	});
	var ISOJson = new Object();
			ISOJson.Campos = Campos;

	return ISOJson;

};

// funcion para rellenar con 0 valores HEXA de los bitmaps
function pad(n, width, z) {
        z = z || '0';
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
};

// funcion que recibe los bitmaps en HEXA y retorna una array con los campos presentes
function parsearHexa(bitmap, indexBit) {
  var inner = [];
  var CampoSi = "";
  var bitMapVal = bitmap;
  var aux3 = "";
  var index = indexBit;
  for(i=0; i<bitMapVal.length; i++) {
      var aux = bitMapVal[i];
      var aux1 = parseInt(aux, 16).toString(2);
          aux1 = pad(aux1, 4);
      var aux3 = aux3 + aux1;
  };


  var result = aux3;
  for(i=0; i<result.length; i++) {
    index = index + 1;
    if (result.charAt(i) == "1") {
      inner.push("F" + index);
    }
  };
  return inner;
};
