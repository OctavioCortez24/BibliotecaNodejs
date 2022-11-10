const modelo = {};//Objeto

var fs = require('fs');
const Clases = require('../Clases');
const GoogleSheet = require('./GoogleSheet/Conexion/GoogleSheet.conexion');
var libros = [];//Array de Libros


//Cargo los libros
const cargarLibros = async () => {
   
    const registros = await GoogleSheet.requerirRegistros(1);//El 1 es el numero de la hoja
    for (let i = 0; i < registros.length; i++) {
        var libro = JSON.parse(registros[i].libros);
        libros.push(libro);
    }
  

}

cargarLibros();//Activo la funcion
/*try {
    var contenidoLibro = fs.readFileSync('./Archivos/Para_Guardar/Libros.json', 'utf-8');
    libros = JSON.parse(contenidoLibro);
} catch (error) {
    console.log("No se pudo parcear el contenido de Libros.json")
    libros = [];
}*/


modelo.guardarLibro = (atributosLibro) => {
    var tituloLibro = atributosLibro.titulo;
    var autorLibro = atributosLibro.nombreAutor;
    var categoriaLibro = atributosLibro.categoria;

    var libro = new Clases.Libro(tituloLibro, autorLibro, categoriaLibro, true, false);

    //Compruebo si existe un libro igual
    var validacion = libros.reduce((acumulador, librosItem) => {
        return acumulador = acumulador || (librosItem.titulo == libro.getTitulo() && librosItem.nombreAutor == libro.getNombreAutor() && librosItem.categoria == libro.getCategoria());
    }, false)

    if (!validacion) {
        libros.push(libro);//Añado el libro al array de libros
        //guardarDatosEnJson();
        guardarLibroGoogleSheet(libro)
    } else {
        console.log("Ya existe uno Igual")
    }
}

modelo.enviarLibros = () => {
    return libros;
}


modelo.darDeBajaLibro = (libroAtributos) => {

    var libro = JSON.parse(libroAtributos);
    var numeroCeldaFilaLibro=0;
    for (var i = 0; i < libros.length; i++) {
        if (libros[i].titulo == libro.titulo & libros[i].nombreAutor == libro.nombreAutor & libros[i].categoria == libro.categoria) {
            libro.desactivado=true;
            libro.disponible=false;
            numeroCeldaFilaLibro=i+1;//Obtengo el numero de la fila en la cual se encuentra
            libros[i]=libro;
            break;
        }
    }


    //guardarDatosEnJson();
    actualizarEstado(numeroCeldaFilaLibro, libro);//Funcion asincrona
}


modelo.actualizarDisponibilidadLibro = (libro) => {
    var numeroCeldaFilaLibro=0;
    for (var i = 0; i < libros.length; i++) {
        if (libros[i].titulo == libro.titulo & libros[i].nombreAutor == libro.nombreAutor & libros[i].categoria == libro.categoria) {

            libro.disponible= false;
            libros[i]=libro;
            numeroCeldaFilaLibro=i+1;//Obtengo el numero de la fila en la cual se encuentra
            break;
        }
    }

   // guardarDatosEnJson();
   actualizarEstado(numeroCeldaFilaLibro, libro);//Funcion asincrona

}

modelo.actualizarDisponibilidadLibroDevuelto = (libroDevuelto) => {
    var numeroCeldaFilaLibro=0;
    for (var i = 0; i < libros.length; i++) {
        if (libros[i].titulo == libroDevuelto.titulo & libros[i].nombreAutor == libroDevuelto.nombreAutor & libros[i].categoria == libroDevuelto.categoria) {

            libroDevuelto.disponible=true;//Actualizo la disponibilidad del libro a disponible
            libros[i]=libroDevuelto;
            numeroCeldaFilaLibro=i+1;//Obtengo el numero de la fila en la cual se encuentra
            break;
        }
    }
   // guardarDatosEnJson();
   actualizarEstado(numeroCeldaFilaLibro, libroDevuelto);//Funcion asincrona
}

/*function guardarDatosEnJson() {
    var librosString = JSON.stringify(libros);
    fs.writeFileSync('./Archivos/Para_Guardar/Libros.json', librosString, (error) => {

        if (error) {
            console.log('No se puede escribir en archivos');
        } else {
            console.log('Escritura existosa')
        }
    });//Guardo el nuevo estado
}*/


//Funciones asincronas para poder guardar en el exel de Google
async function guardarLibroGoogleSheet(libro){
    var objeto={"libros":''+JSON.stringify(libro)+''}//Pongo el formato para poder guardar el libro
    var numeroHoja=1;//Es la hoja en la cual se van a guardar los datos
    await GoogleSheet.guardarDatos(numeroHoja, objeto);
}


async function actualizarEstado(numeroCeldaFilaLibro, libro) {
    var objeto=''+JSON.stringify(libro)+'';
    var numeroHoja=1;//Hoja de los libros
    await GoogleSheet.modificarDatos(numeroHoja, numeroCeldaFilaLibro, objeto);
}
//------------------------------------------------

module.exports = modelo;