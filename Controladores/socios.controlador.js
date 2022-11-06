const path = require('path');
const controlador={};//<----Objeto
const modelo = require('../Modelos/Socio.modelo');//Importo las funciones del archivo Socio.modelo.js

controlador.anadirSocio=(request, response) => {
    //Envio el formulario para poder añadir un socio
    response.sendFile(path.join(__dirname, '../Archivos/Forms/AnadirUnSocio.html'))

}

controlador.anadirSocioPost=(request, response) => {
    //Recibe los artibutos del socio

    modelo.guardarSocio(request.body);//Envio los atributos del socio al modelo
    
    response.redirect('/AnadirUnSocio');

}

controlador.verSocios=(request, response) => {

    response.sendFile(path.join(__dirname, '../Archivos/ToShow/VerSocios.html'))


}

controlador.verSociosTabla=(request, response) => {

    var socios = modelo.enviarSocios();

    response.send(socios);


}

controlador.darDeBaja=(request, response) => {
    response.sendFile(path.join(__dirname, '../Archivos/Dar de Baja/Dar-de-baja-un-Socio.html'))
}

controlador.darDeBajaPost=(request, response)=>{

    modelo.darDeBajaSocio(request.body.socio);
    response.redirect('/Dar-de-baja-un-Socio');
    
}


module.exports=controlador;