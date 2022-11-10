const modelo = {};//Objeto

var fs = require('fs');
const Clases = require('../Clases');
const LibroModelo = require('./Libro.modelo');//Importo las funciones del archivo Libro.modelo
const GoogleSheet = require('./GoogleSheet/Conexion/GoogleSheet.conexion');
var pedidos = [];//Array de pedidos


//Cargo los pedidos que se encuentran en el archivo txt
const cargarPedidos = async () => {
    const registros = await GoogleSheet.requerirRegistros(2);//El 2 es el numero de la Hoja
    for (let i = 0; i < registros.length; i++) {
        var pedido = JSON.parse(registros[i].pedido);//Recupero el pedido de el Google sheet
        pedidos.push(pedido);
    }

}
cargarPedidos();
/*try {
    var contenidoPedido = fs.readFileSync('./Archivos/Para_Guardar/Pedidos.json', 'utf-8');
    pedidos = JSON.parse(contenidoPedido);
} catch (errorPedido) {
    console.log("No se pudo parcear el contenido del archivo Pedido.json")
    pedidos = [];
}*/

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

    var pedido = new Clases.Pedido(fechaPrestamo, fechaDevolucion, libro.titulo, socio.dNI, fechaReintegro);

    pedidos.push(pedido);//Añado el pedido nuevo al Array

    // guardarDatosEnJson();
    guardarPedidoGoogleSheet(pedido);

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
    var idPedido=0;
    var numeroCeldaFilaPedido=0;
    for (var i = 0; i < pedidos.length; i++) {
        //Poblema-------------------------------
        if (pedidos[i].libro == libroDevuelto.titulo & pedidos[i].fechaReintegro == null) {
            pedidos[i].fechaReintegro = fechaReintegro;
            idPedido=i;//Obtengo la posicion del pedido en el array
            numeroCeldaFilaPedido=i+1;//Obtengo la posicion del pedido en la fila del Google Sheet
        }
    }
    //guardarDatosEnJson();
    actualizarEstado(numeroCeldaFilaPedido, pedidos[idPedido]);
}

/*function guardarDatosEnJson(){
    var pedidosString = JSON.stringify(pedidos);

    fs.writeFileSync('./Archivos/Para_Guardar/Pedidos.json', pedidosString, (error) => {
        if (error) {
            console.log('No se puede escribir en archivos');
        } else {
            console.log('Escritura existosa')
        }
    }); 
} */

//Funciones asincronas
async function guardarPedidoGoogleSheet(objeto) {

    var pedidoG = { "pedido": '' + JSON.stringify(objeto) + '' };//Pongo el formato que necesito para poder guardar el pedido

    var numeroHoja = 2;//Hoja de pedidos en el sheet
    await GoogleSheet.guardarDatos(numeroHoja, pedidoG);
}


async function actualizarEstado(numeroCeldaFilaPedido, pedido) {
    var objeto = '' + JSON.stringify(pedido) + '';//Formato para guardar el pedido en forma de JSON
    var numeroHoja = 2;//Hoja de los pedidos
    await GoogleSheet.modificarDatos(numeroHoja, numeroCeldaFilaPedido, objeto);
}

//-----





module.exports = modelo;