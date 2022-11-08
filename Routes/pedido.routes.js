const express= require('express');
const router= express.Router();
const controlador= require('../Controladores/pedido.controlador')

//Mostrar datos----------------------------------Inicio
router.get('/Mostrar-Pedidos', controlador.mostrarPedidos);
//Mostrar datos----------------------------------Fin




//Pedir un libro------------------------------------Comienzo
router.get('/Pedir-un-libro', controlador.pedirUnLibro);

router.post('/Pedir-un-libro-Post', controlador.pedirUnLibroPost);

//Pedir un libro-----------------------------------Fin


router.get('/Devolver-un-libro', controlador.devolverLibro);
router.post('/Devolver-un-libroPost', controlador.devolverLibroPost);





module.exports = router;