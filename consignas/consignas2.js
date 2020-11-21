let sucursalCentro= ['Grace', 'Ada']
let sucursalCaballito = ['Hedy', 'Sheryl']
// 1)Agregar la sucursal centro
for(i=0; i<local.ventas.length;i++) {
    for(centro of sucursalCentro) {  
        if(local.ventas[i].nombreVendedora === centro){
            local.ventas[i].sucursal = 'Centro'
        } 
    }
}
//2)Agregar al objeto principal la propiedad sucursales: ['Centro', 'Caballito']

local.sucursales=['Centro', 'Caballito'];

//3)Cargar la siguiente información en el array ventas, creando sus respectivos objetos siguiendo el patrón: fecha, nombreVendedora, componentes, sucursal
const agregarInformacion = (fecha, nombreVendedora, componentes, sucursal) => {
    local.ventas.push({fecha, nombreVendedora, componentes, sucursal})
    return local.ventas
}
agregarInformacion(new Date(2019,01,12), 'Hedy', ['Monitor GPRS 3000', 'HDD Toyiva'], 'Centro');
agregarInformacion(new Date(2019,01,24),'Sheryl', ['Motherboard ASUS 1500', 'HDD Wezter Dishital'], 'Caballito');
agregarInformacion(new Date(2019,01,01), 'Ada', ['Motherboard MZI', 'RAM Quinston Fury'],'Centro');
agregarInformacion(new Date(2019,01,11), 'Grace', ['Monitor ASC 543', 'RAM Quinston'], 'Caballito');
agregarInformacion(new Date(2019,01,15), 'Ada', ['Motherboard ASUS 1200', 'RAM Quinston Fury'],'Centro');
agregarInformacion(new Date(2019,01,12), 'Hedy', ['Motherboard ASUS 1500', 'HDD Toyiva'], 'Caballito');
agregarInformacion(new Date(2019,01,21), 'Grace', ['Motherboard MZI', 'RAM Quinston'], 'Centro');
agregarInformacion(new Date(2019,01,08), 'Sheryl', ['Monitor ASC 543', 'HDD Wezter Dishital'], 'Centro');
agregarInformacion(new Date(2019,01,16), 'Sheryl', ['Monitor GPRS 3000', 'RAM Quinston Fury'], 'Centro');
agregarInformacion(new Date(2019,01,27), 'Hedy', ['Motherboard ASUS 1200', 'HDD Toyiva'], 'Caballito');
agregarInformacion(new Date(2019,01,22), 'Grace', ['Monitor ASC 543', 'HDD Wezter Dishital'], 'Centro');
agregarInformacion(new Date(2019,01,05), 'Ada', ['Motherboard ASUS 1500', 'RAM Quinston'], 'Centro');
agregarInformacion(new Date(2019,01,01), 'Grace', ['Motherboard MZI', 'HDD Wezter Dishital'], 'Centro');
agregarInformacion(new Date(2019,01,07), 'Sheryl', ['Monitor GPRS 3000', 'RAM Quinston'], 'Caballito');
agregarInformacion(new Date(2019,01,14), 'Ada', ['Motherboard ASUS 1200', 'HDD Toyiva'], 'Centro');

// //4)Crear la función ventasSucursal(sucursal), que obtiene las ventas totales realizadas por una sucursal sin límite de fecha
const ventasSucursal = (sucursalParametro) => {
    let total=0;
    const {ventas} = local;
    for(venta of ventas) {
        const {sucursal} = venta
        total = noRepetirCodigo(sucursalParametro, sucursal, total)
    }
    return total
}

const noRepetirCodigo = (parametro, objeto, sumando) => {
    if(parametro === objeto) {                     
        sumando += precioMaquina(venta.componentes)                        
    }       
    return sumando;
}

// //Crear la función sucursalDelMes(mes, anio), que se le pasa dos parámetros numéricos, (mes, anio) y devuelve el nombre de la sucursal que más vendió en plata en el mes. No cantidad de ventas, sino importe total de las ventas. El importe de una venta es el que indica la función precioMaquina. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).
const sucursalDelMes = (mes,año) => {
    let arrayTotales=[]
    let vendioMas = 0;
    let total = 0;
    const {ventas} = local;
    for(venta of ventas) {
        const {fecha, sucursal, componentes} = venta;
        let años = fecha.getFullYear();
        let meses = fecha.getMonth () +1;

        if((meses === mes) && (años === año)) {                
            let todasLasSucursales = sucursal
            total = precioMaquina(componentes)  
            crearObjeto(todasLasSucursales, arrayTotales, total)  
        }
    } 
    
    let mayorNumero = mayor(arrayTotales);
    for(array of arrayTotales) {
        const {importe, nombre} = array
        if(importe === mayorNumero) {
            vendioMas = nombre
        }        
    }      
    return vendioMas;
}

