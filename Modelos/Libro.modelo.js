const modelo = {};//Objeto

var fs = require('fs');
const Clases = require('../Clases');
var libros = [];//Array de Libros


//Cargo los libros que se encuentran en el archivo txt
try {
    var contenidoLibro = fs.readFileSync('./Archivos/Para_Guardar/Libros.txt', 'utf-8');
    libros = JSON.parse(contenidoLibro);
} catch (error) {
    console.log("No se pudo parcear el contenido de Libros.txt")
    libros = [];
}


modelo.guardarLibro = (atributosLibro) => {
    var tituloLibro = atributosLibro.titulo;
    var autorLibro = atributosLibro.nombreAutor;
    var categoriaLibro = atributosLibro.categoria;

    var libro = new Clases.Libro(tituloLibro, autorLibro, categoriaLibro, true, false);

    //Compruebo si existe un libro igual
    var validacion = libros.reduce((acumulador, librosItem) => {
        return acumulador=acumulador || (librosItem.titulo == libro.getTitulo()  && librosItem.nombreAutor==libro.getNombreAutor() && librosItem.categoria== libro.getCategoria());
    }, false)
    
    if(!validacion){
        libros.push(libro);//Añado el libro al array de libros
        guardarDatosEnTxt();
    }else{
        console.log("Ya existe uno Igual")
    }
}

modelo.enviarLibros = () => {
    return libros;
}


modelo.darDeBajaLibro = (libroAtributos) => {

    var libro = JSON.parse(libroAtributos);

    for (var i = 0; i < libros.length; i++) {
        if (libros[i].titulo == libro.titulo & libros[i].nombreAutor == libro.nombreAutor & libros[i].categoria == libro.categoria) {

            libros[i].desactivado = true;
            libros[i].disponible = false;
            break;
        }
    }
    guardarDatosEnTxt();
}


modelo.actualizarDisponibilidadLibro=(libro)=> {
   
    for (var i = 0; i < libros.length; i++) {
        if (libros[i].titulo == libro.titulo & libros[i].nombreAutor == libro.nombreAutor & libros[i].categoria == libro.categoria) {

            libros[i].disponible = false;
            break;
        }
    }

   guardarDatosEnTxt();
}

modelo.actualizarDisponibilidadLibroDevuelto= (libroDevuelto) => {
    for (var i = 0; i < libros.length; i++) {
        if (libros[i].titulo == libroDevuelto.titulo & libros[i].nombreAutor == libroDevuelto.nombreAutor & libros[i].categoria == libroDevuelto.categoria) {

            libros[i].disponible = true;//Actualizo la disponibilidad del libro a disponible
            break;
        }
    }
    guardarDatosEnTxt();
}

function guardarDatosEnTxt(){
    var librosString = JSON.stringify(libros);
    fs.writeFile('./Archivos/Para_Guardar/Libros.txt', librosString, (error) => {

        if (error) {
            console.log('No se puede escribir en archivos');
        } else {
            console.log('Escritura existosa')
        }
    });//Guardo el nuevo estado
}

module.exports = modelo;