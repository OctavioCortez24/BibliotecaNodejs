const modelo = {};//Objeto

var fs = require('fs');
const Clases = require('../Clases');
const LibroModelo=require('./Libro.modelo');//Importo las funciones del archivo Libro.modelo
var pedidos = [];//Array de pedidos


//Cargo los pedidos que se encuentran en el archivo txt
try {
    var contenidoPedido = fs.readFileSync('./Archivos/Para_Guardar/Pedidos.json', 'utf-8');
    pedidos = JSON.parse(contenidoPedido);
} catch (errorPedido) {
    console.log("No se pudo parcear el contenido del archivo Pedido.json")
    pedidos = [];
}




//Pedidos

modelo.guardarPedido = (atributosPedido) => {
    const fechaActual = new Date();

    var fechaPrestamo = fechaActual.toLocaleDateString();

    fechaActual.setDate(fechaActual.getDate() + 15);//Sumo 15 dias a la fecha actual

    var fechaDevolucion = fechaActual.toLocaleDateString();//A la fecha actual se le sumaron 15 dias

    var fechaReintegro = null;

    var libro;
    var socio;


    try {
        libro = JSON.parse(atributosPedido.libro);
       //--------------Aqui
       LibroModelo.actualizarDisponibilidadLibro(libro);

    } catch (errorJSON) {
        console.log("Erorr al libro convertir en JSON")
        libro = null;
    }

    try {
        socio = JSON.parse(atributosPedido.socio);
    } catch (errorSocioJSON) {
        console.log("Erorr al convertir socio en JSON")
        socio = null;
    }

    

    var pedido = new Clases.Pedido(fechaPrestamo, fechaDevolucion, libro, socio, fechaReintegro);

    pedidos.push(pedido);//Añado el pedido nuevo al Array
   
    guardarDatosEnJson();
}

modelo.enviarPedidos = () => {
    return pedidos;
}


modelo.devolverLibro = (atributosLibro) => {

    var libroDevuelto = JSON.parse(atributosLibro);

    LibroModelo.actualizarDisponibilidadLibroDevuelto(libroDevuelto);//Actualizo el estado del libro a true para que se pueda volver a pedir

    //Actualizo la fecha en  la cual fue devuelto el libro
    const fechaActual = new Date();
    var fechaReintegro = fechaActual.toLocaleDateString();//Fecha en la cual se devolvio el libro

    for (var i = 0; i < pedidos.length; i++) {

        if (pedidos[i].Libro.titulo == libroDevuelto.titulo & pedidos[i].fechaReintegro == null) {
            pedidos[i].fechaReintegro=fechaReintegro; 
        }
    }   
    guardarDatosEnJson();
}

function guardarDatosEnJson(){
    var pedidosString = JSON.stringify(pedidos);

    fs.writeFileSync('./Archivos/Para_Guardar/Pedidos.json', pedidosString, (error) => {
        if (error) {
            console.log('No se puede escribir en archivos');
        } else {
            console.log('Escritura existosa')
        }
    });
}
 

//-----





module.exports = modelo;