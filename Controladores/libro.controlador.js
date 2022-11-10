
const controlador = {};//<----Objeto
const modelo = require('../Modelos/Libro.modelo');//Importo las funciones del archivo Libro.modelo.js

controlador.anadirLibro = (request, response) => {
    //Envio el formulario para añadir un socio
    response.render('./Formularios/AnadirUnLibro',{titulo:"Añadir un libro"})

}
controlador.anadirLibroPost = (request, response) => {
    //Recibe los atributos del socio
    modelo.guardarLibro(request.body);
    response.redirect('/AnadirUnLibro');

}
controlador.darDeBaja = (request, response) => {
    //Envio el html de Dar de baja
    var libros = modelo.enviarLibros();//Traigo el array de libros desde el archivo Modelo
    var striLibrosSelect = "";
    //Empiezo a construir el Select
    for (var i = 0; i < libros.length; i++) {
        if (!libros[i].desactivado) {
            striLibrosSelect += "<option value='" + JSON.stringify(libros[i]) + "'>" + libros[i].titulo + "</option>";
        }
    }
    response.render('Dar de baja/Dar-de-baja-un-Socio', { titulo: 'Dar de baja un libro',libros:striLibrosSelect });
}
controlador.darDeBajaPost = (request, response) => {

    modelo.darDeBajaLibro(request.body.libro);//Envio los atriubtos del libro que se seleciono
    response.redirect('/Dar-de-baja-un-Libro');
}
controlador.verLibros = (request, response) => {
    var libros= modelo.enviarLibros();
    var striTable = "";
    var estadoLibro = "";
    var disponibilidad = "";
    for (var i = 0; i < libros.length; i++) {
        estadoLibro = libros[i].desactivado ? "Desactivado" : "Activado";
        disponibilidad = libros[i].disponible ? "Disponible" : "No Disponible"
        striTable += "<tr class='table-secondary' ><td>" + libros[i].titulo + "</td><td>" + libros[i].nombreAutor + "</td><td>" + libros[i].categoria + "</td><td>" + disponibilidad + "</td><td>" + estadoLibro + "</td></tr>";
    }

    response.render('./Mostrar Datos/VerLibros',{titulo:'Ver libros', libros:striTable})

}




module.exports = controlador;