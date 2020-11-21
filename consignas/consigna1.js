/*
Se pide desarrollar las siguientes funciones: 

1)precioMaquina(componentes): recibe un array de componentes y devuelve el precio de la máquina que se puede armar con esos componentes, que es la suma de los precios de cada componente incluido.
*/
const precioMaquina = (arrayComponentes) => {
    let precioTotal = 0;
    const {precios} = local;   
    for(let precioObj of precios) {
        for(let array of arrayComponentes) {
            const {componente, precio} = precioObj;
            (componente === array)?precioTotal += precio:false;                    
        }
    } 
    return precioTotal;
}
/*
2)cantidadVentasComponente(componente): recibe un componente y devuelve la cantidad de veces que fue vendido, o sea que formó parte de una máquina que se vendió. La lista de ventas no se pasa por parámetro, se asume que está identificada por la variable ventas.
*/
const cantidadVentasComponente = (componente) => {
    let cantidadDeVentas= [];
    const {ventas} = local;
    for(venta of ventas) {
        const { componentes } = venta;
        for(componenteObj of componentes) {            
            (componente === componenteObj)
            ?cantidadDeVentas.push(componenteObj)
            :false;
        }
    }
    return cantidadDeVentas.length;
}

/*
3)vendedoraDelMes(mes, anio), se le pasa dos parámetros numéricos, (mes, anio) y devuelve el nombre de la vendedora que más vendió en plata en el mes. O sea no cantidad de ventas, sino importe total de las ventas. El importe de una venta es el que indica la función precioMaquina. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).
*/
const vendedoraDelMes = (mes,año) => {
    let vendioMas;
    let arrayTotales = [];
    let total = 0;
    const {ventas} = local;
    for(venta of ventas) {
        const {fecha, nombreVendedora, componentes} = venta;
        let años = fecha.getFullYear();
        let meses = fecha.getMonth () +1;
        if((meses === mes) && (años === año)){  
            let nombreTodasLasVendedoras = nombreVendedora
            total = precioMaquina(componentes)  
            crearObjeto(nombreTodasLasVendedoras, arrayTotales, total)  
        }
        
    }    
    let mayorNumero = mayor(arrayTotales);

    for(array of arrayTotales) {
        const {importe, nombre} = array
        if(importe === mayorNumero) {
            vendioMas = nombre
        }        
    }
    return vendioMas
}
/*
4)ventasMes(mes, anio): Obtener las ventas de un mes. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).
*/
const ventasMes = (mes, año) => {
    let años;
    let meses;
    let costos= 0;
    const { ventas } = local;
    for(venta of ventas) {
        const {fecha, componentes} = venta;
        años = fecha.getFullYear(); 
        meses= fecha.getMonth() +1;
        ((meses === mes) && (años === año))?costos += precioMaquina (componentes):false;
    }  
    return costos;
}

// 5)ventasVendedora(nombre): Obtener las ventas totales realizadas por una vendedora sin límite de fecha.

const ventasVendedora = (nombre) => {
    let ventaTotal = 0;
    const { ventas } = local;
    for(venta of ventas) {
        const {nombreVendedora} = venta;        
        ventaTotal = noRepetirCodigo (nombre, nombreVendedora, ventaTotal)
    }
    return ventaTotal;
}
/*
6)componenteMasVendido(): Devuelve el nombre del componente que más ventas tuvo historicamente. El dato de la cantidad de ventas es el que indica la función cantidadVentasComponente
*/

const componenteMasVendido = () => {    
    let masVenta;
    let max=0;
    const { ventas } = local;
    for( let venta of ventas ) {
        const { componentes } = venta;        
        for(componente of componentes) {
            (cantidadVentasComponente(componente)>max)?max = cantidadVentasComponente(componente):false 
            if(cantidadVentasComponente(componente)===max) {
                masVenta=componente
            }         
        }
    }    
    return masVenta;
}        
//7) huboVentas(mes, anio): que indica si hubo ventas en un mes determinado. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).
const huboVentas = (mes, año) => {
    let lasVentas = 0;
    const {ventas} = local;
    for(let venta of ventas) {
        const {fecha} = venta;
        let años = fecha.getFullYear(); 
        let meses = fecha.getMonth() +1;
        ((meses === mes) && (años === año)) ?lasVentas = 'Si hubo ventas' :false;
    }
    return lasVentas;
}


  
