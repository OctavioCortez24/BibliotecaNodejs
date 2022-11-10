const modelo = {};//Objeto

var fs = require('fs');
const Clases = require('../Clases');
const GoogleSheet = require('./GoogleSheet/Conexion/GoogleSheet.conexion');



var socios = [];//Array de Socios


const cargarSocios = async () => {
    const registros = await GoogleSheet.requerirRegistros(0);

    for (let i = 0; i < registros.length; i++) {
        var socioJSON = JSON.parse(registros[i].socio)//Recupero el socio desde la hoja de calculo

        socios.push(socioJSON);

    }
}
cargarSocios();//Activo la funcion
/*try {

    var contenido = fs.readFileSync('./Archivos/Para_Guardar/Socios.json', 'utf-8');
    socios = JSON.parse(contenido);
} catch (erroSocios) {
    console.log("No se pudo cargar a los socios");
    socios = [];
}//Cargo los socios que se encuentran en el archivo txt*/

modelo.guardarSocio = (atributos) => {

    var nombre = atributos.name;
    var apellido = atributos.surname;
    var dNI = atributos.dni;

    var so1 = new Clases.Socio(nombre, apellido, dNI, false);//Instancio un socio

    //Compruebo si existe un socio igual
    var validacion = socios.reduce((acumulador, SociosItem) => {
        return acumulador = acumulador || (SociosItem.name == so1.getName() && SociosItem.apellido == so1.getApellido() && SociosItem.dNI == so1.getDNI());
    }, false)

    //Terimina de comprobar

    if (!validacion) {

        socios.push(so1);
        guardarSocio(so1);//Funcion asincrona para guardar el socio en el Exel de google
        //guardarDatosEnJson();//Guardo los datos en txt con esta funcion

    } else {

        console.log('No se guardo porque hay uno igual');
    }
}



modelo.enviarSocios = () => {
    return socios;
}


modelo.darDeBajaSocio = (socioAtributos) => {

    var socio = JSON.parse(socioAtributos);
    var numeroCeldaFilaSocio=0;

    for (var i = 0; i < socios.length; i++) {
        if (socios[i].name == socio.name & socios[i].apellido == socio.apellido & socios[i].dNI == socio.dNI) {
            
            socio.desactivado=true;//Asigno el nuevo valor al atributo desactivado
            socios[i]=socio;

            numeroCeldaFilaSocio=i+1;//Obtengo el numero de la fila en la cual se encuentra
            break;
        }

    }
   // guardarDatosEnJson();
   actualizarEstado(numeroCeldaFilaSocio, socio);//Funcion asincrona que va a actualizar el sheet de google
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


async function guardarSocio(objeto) {

    var socioG={"socio":''+JSON.stringify(objeto)+''};//Pongo el formato que necesito para poder guardar el socio

    var numeroHoja=0;//Hoja de socios en el sheet
   await GoogleSheet.guardarDatos(numeroHoja,socioG);
}


async function actualizarEstado(numeroCeldaFilaSocio, socio){
    var objeto=''+JSON.stringify(socio)+'';
    var numeroHoja=0;//Hoja de los socios
    await GoogleSheet.modificarDatos(numeroHoja, numeroCeldaFilaSocio, objeto);
}




module.exports = modelo;

