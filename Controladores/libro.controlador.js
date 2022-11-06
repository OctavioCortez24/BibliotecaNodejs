const path = require('path');
const controlador={};//<----Objeto
const modelo = require('../Modelos/Libro.modelo');//Importo las funciones del archivo Libro.modelo.js

controlador.anadirLibro= (request, response) => {
    //Envio el formulario para añadir un socio
    response.sendFile(path.join(__dirname, '../Archivos/Forms/AnadirUnLibro.html'))

}
controlador.anadirLibroPost=(request, response) => {
    //Recibe los atributos del socio
    modelo.guardarLibro(request.body);
    response.redirect('/AnadirUnLibro');

}
controlador.darDeBaja=(request, response) => {
    //Envio el html de Dar de baja
    response.sendFile(path.join(__dirname, '../Archivos/Dar de Baja/Dar-de-baja-un-Libro.html'))
}
controlador.darDeBajaPost=(request, response) => {

    modelo.darDeBajaLibro(request.body.libro);//Envio los atriubtos del libro que se seleciono
    response.redirect('/Dar-de-baja-un-Libro');
}
controlador.verLibros=(request, response) => {

    response.sendFile(path.join(__dirname, '../Archivos/ToShow/VerLibros.html'))

}

controlador.verLibrosTabla=(request, response) => {

    var libros=modelo.enviarLibros();//Traigo el array de libros desde el archivo Modelo
    response.send(libros);

}



module.exports = controlador;