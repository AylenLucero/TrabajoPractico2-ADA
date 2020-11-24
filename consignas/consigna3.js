
// >>>>>>>>>>>>>>>>>>FUNCIONES EXTRA<<<<<<<<<<<<<<<<<<<<<<<<<<<
// Saca el numero mayor de un objeto
const mayor = (array) => {
   let mayorNumero = Math.max.apply(Math, array.map(function(o) {
       return o.importe;         
   }));
   return mayorNumero
}

// Crea el objeto o suma el total en importe
const crearObjeto = (variable, array, variable1) => {   
   if(array.some(array => array.nombre === variable)) {                   
       for(arr of array) {        
           if(variable === arr.nombre) {
               return array.importe += variable1                               
           }
       }
   } else {
       array.push({nombre: variable, importe: variable1})
   }     
}
//renderPorMes(): Muestra una lista ordenada del importe total vendido por cada mes/año
let totales = [];
let sucursales;
const renderPorMes = () => {
   let total = 0;
   let total2= 0;
   let meses;
   let totaless =[]
   const {ventas} = local;
   for(venta of ventas){
       const{fecha, componentes} = venta;
       meses = fecha.getMonth() +1;    
       if(meses === 1){
           total += precioMaquina(componentes)
       }
       if(meses === 2) {
           total2+= precioMaquina(componentes)
       }
       
   } 
//    totales.push({Mes:1, Ventas: total},
//                 {Mes:2, Ventas: total2})
   return `
   Las ventas por mes fueron:<br>
   Mes de enero del 2019: $${total}<br>
   Mes de febrero del 2019: $${total2}`
}
//renderPorSucursal(): Muestra una lista del importe total vendido por cada sucursal
const renderPorSucursal = () => {    
   let sucursal1 = ventasSucursal('Centro');
   let sucursal2 = ventasSucursal('Caballito');
   return ` 
   Ventas por sucursal:<br>
   Sucursal Centro: $${sucursal1}<br>
   Sucursal Caballito: $${sucursal2}`
}




//Vendedora que mas vendio
const masIngresos = () => {
   let arrayTotales= [];
   let nombreDeVendedora;
   let total = 0;
   const { vendedoras, ventas} = local;   
       for(vendedora of vendedoras) {    
           for(venta of ventas) {                
               if(venta.nombreVendedora === vendedora) {
                   let nombreTodasLasVendedoras = vendedora
                   total = precioMaquina(venta.componentes)
                   crearObjeto(nombreTodasLasVendedoras, arrayTotales, total)
               }  
               
           }
       }   
   
   let mayorNumero = mayor(arrayTotales)
      
   for(array of arrayTotales) {
       const {importe, nombre} = array
       if(importe === mayorNumero) {
           nombreDeVendedora = nombre
       }        
   }
   return nombreDeVendedora
}

//render(): Tiene que mostrar la unión de los dos reportes anteriores, cual fue el producto más vendido y la vendedora que más ingresos generó
const render = () => {   
   MostrarContenido("reporte",
   `<div class="dato col-5 rounded pl-5 py-2 border border-secondary">${renderPorMes()}<br>
   ${renderPorSucursal()}<br>
   El producto estrella: ${componenteMasVendido()}<br>
   Vendedora que mas ingresos genero: ${masIngresos()}
   </div>`
   ) 
}


const MostrarContenido = (elemento,contenido) => {
   let data= (document.getElementById(elemento).innerHTML=contenido);
}

MostrarContenido("ventasMensuales", renderPorMes())
MostrarContenido("ventasSucursales", renderPorSucursal())


