const path = require('path');
const controlador = {};//<----Objeto
const modelo = require('../Modelos/Pedido.modelo');//Importo las funciones del archivo Pedido.modelo.js


controlador.mostrarPedidos = (request, response) => {
    response.sendFile(path.join(__dirname, '../Archivos/ToShow/Mostrar-Pedidos.html'))
}

controlador.mostrarPedidosTabla = (request, response) => {
    var pedidos = modelo.enviarPedidos();
    response.send(pedidos);
}

controlador.pedirUnLibro = (request, response) => {
    response.sendFile(path.join(__dirname, '../Archivos/Forms/Pedir-un-libro.html'))
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