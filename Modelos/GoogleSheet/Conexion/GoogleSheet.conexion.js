const {GoogleSpreadsheet}= require('google-spreadsheet');//Importamos la clase google-spreadsheet, se debe instalar.

const credenciales = require('./GoogleApi/Credenciales.json');//Credenciales para poder editar el documento

let googleID='1hzo4WuMW2jisZ2jE1lOvx50PF-Gh04odoVEmklKQfWw';//Id alfa-numerico del documento, se encuentra en el enlace del documento

async function requerirHojaDeCalculo(numeroHoja){

    const documento= new GoogleSpreadsheet(googleID);
    await documento.useServiceAccountAuth(credenciales);
    await documento.loadInfo();
    const hoja=documento.sheetsByIndex[numeroHoja];

    return hoja;
}

async function requerirRegistros(numeroHoja){
    const hoja=await requerirHojaDeCalculo(numeroHoja);
    const registros= await hoja.getRows();

    return registros;
}

async function guardarDatos(numeroHoja,objeto){
    
    const hoja=await requerirHojaDeCalculo(numeroHoja);

   await hoja.addRow(objeto);

}
async function modificarDatos(numeroHoja,nueroCeldaFila, objeto){
    const hoja = await requerirHojaDeCalculo(numeroHoja);


   //await hoja.addRow(socioG);
   await hoja.loadCells();
   const celda=hoja.getCell(nueroCeldaFila,0);//Obtengo el numero de la celda, mediante el numero de fila y el numero de columna que siempre va a ser 0
   celda.value=objeto//Actualizo el valor

   hoja.saveUpdatedCells();//Guardo los cambios
   console.log("Funciona")
}



module.exports = {requerirHojaDeCalculo, requerirRegistros, guardarDatos, modificarDatos};