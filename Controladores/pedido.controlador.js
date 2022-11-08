const path = require('path');
const controlador = {};//<----Objeto
const modelo = require('../Modelos/Pedido.modelo');//Importo las funciones del archivo Pedido.modelo.js
const modeloSocios= require('../Modelos/Socio.modelo')//Importo a los socios
const modeloLibros= require('../Modelos/Libro.modelo')//Importo los libros


controlador.mostrarPedidos = (request, response) => {
    response.sendFile(path.join(__dirname, '../Archivos/ToShow/Mostrar-Pedidos.html'))
}

controlador.mostrarPedidosTabla = (request, response) => {
    var pedidos = modelo.enviarPedidos();
    response.send(pedidos);
}

controlador.pedirUnLibro = (request, response) => {
    //-----------Select de los socios-------------
    var socios= modeloSocios.enviarSocios();
    var striSelectSocio = "";
    for (var i = 0; i < socios.length; i++) {
       
        if(!socios[i].desactivado){
            striSelectSocio += "<option value='"+JSON.stringify(socios[i])+"''>"+socios[i].name+" "+ socios[i].apellido+"</option>";
        }//Con este if solo mando a mostrar aquellos socios que no esten dados de baja
    }

    //-----------Select de los libros--------------
    var libros= modeloLibros.enviarLibros();
    var striLibrosSelect= "";
    for (var i = 0; i < libros.length; i++) {
      if(!libros[i].desactivado & libros[i].disponible){
        striLibrosSelect += "<option value='"+JSON.stringify(libros[i])+"'>"+libros[i].titulo+"</option>";
      }
    }
    response.render('./Formularios/Pedir-un-libro',{titulo:'Pedir un libro',socios:striSelectSocio, libros:striLibrosSelect})
}

controlador.pedirUnLibroPost = (req, res) => {

    modelo.guardarPedido(req.body);
    res.redirect("/Pedir-un-libro");
}
controlador.devolverLibro = (request, response) => {
    response.sendFile(path.join(__dirname, '../Archivos/Devolver-un-libro.html'))
}
controlador.devolverLibroPost = (request, response) => {

    //Terminar
    modelo.devolverLibro(request.body.libro);
    response.redirect('/Devolver-un-libro');

}

module.exports = controlador;