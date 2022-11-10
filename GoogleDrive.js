const {GoogleSpreadsheet}= require('google-spreadsheet');

const credenciales = require('./Modelos/GoogleSheet/Conexion/GoogleApi/Credenciales.json');

let googleID='1hzo4WuMW2jisZ2jE1lOvx50PF-Gh04odoVEmklKQfWw';

const socios=[];

async function accederASocios(){
    const documento= new GoogleSpreadsheet(googleID);
    await documento.useServiceAccountAuth(credenciales);
    await documento.loadInfo();
    const hoja=documento.sheetsByIndex[0];

    const registros= await hoja.getRows();

    for (let i=0; i<registros.length; i++){
        var socioJSON=JSON.parse(registros[i].socio)

        socios.push(socioJSON);

        
    }

    /*for(var i=0; i<socios.length; i++){
        console.log(socios[i])
    }*/

   
    
}

//Tiene que recibir un socio
async function guardarDatos(){
    var socioG={"socio":'{"name":"Paulo","apellido":"Loyola","dNI":"45876507","desactivado":false}'};
    const documento= new GoogleSpreadsheet(googleID);
    await documento.useServiceAccountAuth(credenciales);
    await documento.loadInfo();
    const hoja= documento.sheetsById[0];

   await hoja.addRow(socioG);
}

async function modificarDatos(){
    var socio={"name":"Patricia","apellido":"Castro","dNI":"29949507","desactivado":false};

    const documento= new GoogleSpreadsheet(googleID);
    await documento.useServiceAccountAuth(credenciales);
    await documento.loadInfo();
    const hoja= documento.sheetsById[0];
    const registros= await hoja.getRows();

   //await hoja.addRow(socioG);
   await hoja.loadCells();
   const celda=hoja.getCell(4,0);
   celda.value=''+JSON.stringify(socio)+'';
   hoja.saveUpdatedCells();
   console.log("Funciona")
}

modificarDatos();



 
/*
 for (let i=0; i<registros.length; i++){
        var nombre=registros[i].nombre;
        var apellido=registros[i].apellido;
        var dNI=registros[i].dNI;
        var desactivado=(registros[i].desactivado=='FALSO')?false:true;

        var socio=new Clases.Socio(nombre, apellido, dNI, desactivado)
        socios.push(socio);
    }

    for (var i = 0; i <socios.length; i++){
        console.log(socios[i]);
    }
*/