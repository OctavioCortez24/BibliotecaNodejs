const express= require('express');
const router = express.Router();
const controladorMenu= require('../Controladores/menu.controlador');

//Menu------------------------------------
router.get('/', controladorMenu.mostrarMenu);  
//----------------------------------------

module.exports =router;