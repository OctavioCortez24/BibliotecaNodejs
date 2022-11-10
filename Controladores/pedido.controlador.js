const path = require('path');
const controlador = {};//<----Objeto
const modelo = require('../Modelos/Pedido.modelo');//Importo las funciones del archivo Pedido.modelo.js
const modeloSocios = require('../Modelos/Socio.modelo')//Importo a los socios
const modeloLibros = require('../Modelos/Libro.modelo')//Importo los libros


controlador.mostrarPedidos = (request, response) => {
    var pedidos=modelo.enviarPedidos();
    var striTable = "";
    var reitegroLibro="";
    for (var i = 0; i < pedidos.length; i++) {
        reitegroLibro=(pedidos[i].fechaReintegro==null)?"No Devuelto":""+pedidos[i].fechaReintegro;
        striTable += "<tr class='table-secondary' ><td>" + pedidos[i].prestamo + "</td><td>" + pedidos[i].fechaDevolucion+ "</td><td>" + pedidos[i].libro + "</td><td>" + pedidos[i].socio+ "</td><td>" + reitegroLibro+ "</td></tr>";
    }

    response.render('./Mostrar Datos/Mostrar-Pedidos',{titulo:'Mostrar Pedidos', pedidos:striTable})
}

controlador.pedirUnLibro = (request, response) => {
    //-----------Select de los socios-------------
    var socios = modeloSocios.enviarSocios();
    var striSelectSocio = "";
    for (var i = 0; i < socios.length; i++) {

        if (!socios[i].desactivado) {
            striSelectSocio += "<option value='" + JSON.stringify(socios[i]) + "''>" + socios[i].name + " " + socios[i].apellido + "</option>";
        }//Con este if solo mando a mostrar aquellos socios que no esten dados de baja
    }

    //-----------Select de los libros--------------
    var libros = modeloLibros.enviarLibros();
    var striLibrosSelect = "";
    for (var i = 0; i < libros.length; i++) {
        if (!libros[i].desactivado & libros[i].disponible) {
            striLibrosSelect += "<option value='" + JSON.stringify(libros[i]) + "'>" + libros[i].titulo + "</option>";
        }
    }
    response.render('./Formularios/Pedir-un-libro', { titulo: 'Pedir un libro', socios: striSelectSocio, libros: striLibrosSelect })
}

controlador.pedirUnLibroPost = (req, res) => {

    modelo.guardarPedido(req.body);
    res.redirect("/Pedir-un-libro");
}
controlador.devolverLibro = (request, response) => {
    var libros= modeloLibros.enviarLibros();
    var striLibrosSelect = "";
    for (var i = 0; i < libros.length; i++) {
        if (!libros[i].desactivado & !libros[i].disponible) {
            striLibrosSelect += "<option value='" + JSON.stringify(libros[i]) + "'>" + libros[i].titulo + "</option>";
        }//Con este if lo que hago es solamente mostrar aquellos libros que no esten desactivados y esten pedidos
    }

    response.render('./Formularios/Devolver-un-libro',{titulo:'Devolver un libro',libros: striLibrosSelect});
}
controlador.devolverLibroPost = (request, response) => {

    modelo.devolverLibro(request.body.libro);
    response.redirect('/Devolver-un-libro');

}

module.exports = controlador;