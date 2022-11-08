const express= require('express');
const router = express.Router();

const controlador = require('../Controladores/socios.controlador');//Importo las funciones del controlador


//Añadir Socios--------------------------------------------Comienzo
router.get('/AnadirUnSocio', controlador.anadirSocio);
router.post('/AnadirUnSocioPost', controlador.anadirSocioPost);

//Añadir Socios--------------------------------------------Fin


//Mostrar datos----------------------------------Inicio
router.get('/VerSocios', controlador.verSocios);

//Mostrar datos----------------------------------Fin


//Dar de baja------------------------------------Inicio

router.get('/Dar-de-baja-un-Socio', controlador.darDeBaja);
router.post('/Dar-de-baja-un-SocioPost', controlador.darDeBajaPost);
//Dar de baja------------------------------------Fin



module.exports= router;