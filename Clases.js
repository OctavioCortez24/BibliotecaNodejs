 class Socio {
    constructor(name, apellido, dNI, desactivado = false) {
        this.name = name;
        this.apellido = apellido;
        this.dNI = dNI;
        this.desactivado = desactivado;
    }
    setName(name) { this.name = name; }
    getName() {
        return this.name;
    }

    getApellido() { return this.apellido; }
    setApellido(apellido) { this.apellido = apellido; }
    setDNI(dNI) { this.dNI = dNI; }
    getDNI() { return this.dNI; }
    setDesactivado(desactivado) { this.desactivado = desactivado; }
    getDesactivado() { return this.desactivado; }



}

class Pedido{
    constructor(prestamo, fechaDevolucion, libro, socio, fechaReintegro){
        this.prestamo = prestamo;
        this.fechaDevolucion= fechaDevolucion;
        this.libro=libro;
        this.socio=socio;
        this.fechaReintegro= fechaReintegro;
    }

    setPrestamo(prestamo){this.prestamo =prestamo;}
    getPrestamo(){return this.prestamo;}
    setFechaDevolucion(fechaDevolucion){this.fechaDevolucion = fechaDevolucion}
    getFechaDevolucion(){return this.fechaDevolucion;}

    setLibro(libro){this.libro = libro;}
    getLibro(){return this.libro;}
    setSocio(socio){this.socio = socio;}
    getSocio(){return this.socio;}

    setFechaReintegro(fechaReintegro){this.fechaReintegro = fechaReintegro;}
    getFechaReintegro() {return this.fechaReintegro}
}

class Libro{
    constructor(titulo, nombreAutor,categoria, disponibilidad=true, desactivado=false){
        this.titulo=titulo;
        this.nombreAutor=nombreAutor;
        this.categoria=categoria;
        this.disponible=disponibilidad;
        this.desactivado=desactivado;
    }

    setTitulo(titulo){this.titulo=titulo;}
    getTitulo(){return this.titulo;}
    setNombreAutor(nombreAutor){this.nombreAutor =nombreAutor;}
    getNombreAutor(){return this.nombreAutor;}
    setCategoria(categoria){this.categoria =categoria;}
    getCategoria(){return this.categoria;}
    setDisponible(disponible){this.disponible =disponible;}
    getDisponible(){return this.disponible;}
    setDesactivado(desactivado){this.desactivado =desactivado;}
    getDesactivado(){return this.desactivado;}


}

module.exports={Pedido,Socio,Libro}
