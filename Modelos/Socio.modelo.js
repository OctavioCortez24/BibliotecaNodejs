const modelo = {};//Objeto

var fs = require('fs');
const Clases = require('../Clases');


var socios = [];//Array de Socios

try {
    var contenido = fs.readFileSync('./Archivos/Para_Guardar/Socios.json', 'utf-8');
    socios = JSON.parse(contenido);
} catch (erroSocios) {
    console.log("No se pudo cargar a los socios");
    socios = [];
}//Cargo los socios que se encuentran en el archivo txt

modelo.guardarSocio = (atributos) => {

    var nombre = atributos.name;
    var apellido = atributos.surname;
    var dNI = atributos.dni;

    var so1 = new Clases.Socio(nombre, apellido, dNI, false);//Instancio un socio

    //Compruebo si existe un socio igual
    var validacion = socios.reduce((acumulador, SociosItem) => {
        return acumulador=acumulador || (SociosItem.name == so1.getName()  && SociosItem.apellido==so1.getApellido() && SociosItem.dNI==so1.getDNI());
    }, false)

    //Terimina de comprobar

    if (!validacion) {
        
        socios.push(so1);

        guardarDatosEnJson();//Guardo los datos en txt con esta funcion

    } else {
       
        console.log('No se guardo porque hay uno igual');
    }
}

modelo.enviarSocios = () => {
    return socios;
}


modelo.darDeBajaSocio = (socioAtributos) => {

    var socio = JSON.parse(socioAtributos);


    for (var i = 0; i < socios.length; i++) {
        if (socios[i].name == socio.name & socios[i].apellido == socio.apellido & socios[i].dNI == socio.dNI) {
            socios[i].desactivado = true;//Asigno el nuevo valor al atributo desactivado
            break;
        }

    }
    guardarDatosEnJson();
}

function guardarDatosEnJson() {
    //Esta funcion se encarga de guardar el array de socios en txt, 
    //lo hice funcion porque ocupo el mismo codigo varias veces
    

    fs.writeFileSync('./Archivos/Para_Guardar/Socios.json', JSON.stringify(socios), (error) => {
        if (error) {
            console.log('No se puede escribir en archivos');
        } else {
            console.log('Escritura existosa')
        } 
    });
}


module.exports = modelo;

