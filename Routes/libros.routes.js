const express= require('express');
const router = express.Router();
const path = require('path');


const controlador=require('../Controladores/libro.controlador')

//Añadir Libro--------------------------------------------Comienzo
router.get('/AnadirUnLibro', controlador.anadirLibro);
router.post('/AnadirUnLibroPost', controlador.anadirLibroPost)

//Añadir Libros--------------------------------------------Fin



//Dar de baja------------------------------------Inicio
router.get('/Dar-de-baja-un-Libro', controlador.darDeBaja);
router.post('/Dar-de-baja-un-LibroPost', controlador.darDeBajaPost);
//Dar de baja------------------------------------Fin



//Mostrar Libros------------------------------Inicio
router.get('/VerLibros', controlador.verLibros);

//Mostrar Libros------------------------------Fin






module.exports =router;