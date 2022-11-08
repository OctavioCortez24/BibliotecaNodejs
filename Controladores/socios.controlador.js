
const controlador = {};//<----Objeto
const modelo = require('../Modelos/Socio.modelo');//Importo las funciones del archivo Socio.modelo.js


controlador.anadirSocio = (request, response) => {
    //Envio el formulario para poder añadir un socio
    response.render('Formularios/anadirSocio',{ titulo: 'Añadir un socio' });

}

controlador.anadirSocioPost = (request, response) => {
    //Recibe los artibutos del socio

    modelo.guardarSocio(request.body);//Envio los atributos del socio al modelo

    response.redirect('/AnadirUnSocio');

}

controlador.verSocios = (request, response) => {
    var socios = modelo.enviarSocios();

    var striTable = "";
    var estadoSocio = "";
    for (var i = 0; i < socios.length; i++) {
        estadoSocio = socios[i].desactivado ? "Desactivado" : "Activado";
        striTable += "<tr class='table-secondary' ><td>" + socios[i].name + "</td><td>" + socios[i].apellido + "</td><td>" + socios[i].dNI + "</td><td>" + estadoSocio + "</td></tr>";
    }

    response.render('Mostrar Datos/VerSocios',{titulo:'Mostrar Socios', socios:striTable});

}


controlador.darDeBaja = (request, response) => {
    var socios = modelo.enviarSocios();
    var striSelectSocio = "";
    for (var i = 0; i < socios.length; i++) {
       
        if(!socios[i].desactivado){
            striSelectSocio += "<option value='"+JSON.stringify(socios[i])+"''>"+socios[i].name+" "+ socios[i].apellido+"</option>";
        }
    }

    response.render('Dar de baja/Dar-de-baja-un-Socio', { titulo: "Dar de baja un socio", socios:striSelectSocio })
}

controlador.darDeBajaPost = (request, response) => {

    modelo.darDeBajaSocio(request.body.socio);
    response.redirect('/Dar-de-baja-un-Socio');

}


module.exports = controlador;