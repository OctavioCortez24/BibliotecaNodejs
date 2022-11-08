const express = require('express');
const app = express();
const path = require('path');


const port = process.env.PORT || 3000;//Asigno el puerto
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static('Archivos'));//Cargo el archivo CSS en el servidor.

app.set('view engine', 'ejs');//<-- Motor de plantillas
app.set('views', __dirname+'/Vistas');// Asigno la direccion en la cual van a star las vistas



app.use(require('./Routes/socio.routes.js'))//Llamo a las rutas de todas las funciones que tengan que ver con un socio
app.use(require('./Routes/libros.routes.js'))//Llamo a las rutas de todas las funciones que tengan que ver con un Libro
app.use(require('./Routes/pedido.routes.js'))//Llamo a las rutas de todas las funciones que tengan que ver con pedidos

//Menu------------------------------------
app.get('/', (request, response) => {
    
    response.render('menu', {titulo:"Biblioteca"})

});  
//----------------------------------------





//Mostrar Puerto-----------------------------------
app.listen(port, () => {
    console.log(`Express listen on port ${port}!`);
});