const controlador={};//<----Objeto


controlador.mostrarMenu=(request, response) => {
    
    response.render('Menu/menu', {titulo:"Biblioteca"})

}


module.exports = controlador;