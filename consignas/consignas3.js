//renderPorMes(): Muestra una lista ordenada del importe total vendido por cada mes/año
let totales;
let sucursales;
const renderPorMes = () => {
   let total = 0;
   let total2= 0;
   let meses;
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
   totales = `
               <div class="col-6 render rounded text-center">
                   <h6> Las ventas mensuales son:</h6>
                   <p>
                       Total de enero 2019: $${total}
                       <br>
                       Total de febrero 2019: $${total2}
                   </p>
               </div>`
   MostrarContenido('ventasMensuales', totales);
}

//renderPorSucursal(): Muestra una lista del importe total vendido por cada sucursal
const renderPorSucursal = () => {    
   let sucursal1 = ventasSucursal('Centro');
   let sucursal2 = ventasSucursal('Caballito');
   sucursales = `
                       <div class="col-6 render rounded text-center">
                           <h6> Las ventas por sucursal son:</h6>
                           <p>
                               Total ventas de sucursal Centro 2019: $${sucursal1}
                               <br>
                               Total ventas sucursal Caballito febrero 2019: $${sucursal2}
                           </p>
                       </div> `
   MostrarContenido('ventasSucursales', sucursales)
}

//render(): Tiene que mostrar la unión de los dos reportes anteriores, cual fue el producto más vendido y la vendedora que más ingresos generó
const render = () => {
   renderPorSucursal()
   renderPorMes()
   let estrella = componenteMasVendido ()
   return MostrarContenido('reporte', 
                               `<div class="row d-flex justify-content-center">
                                   ${sucursales}
                               </div>   
                               <div class="row d-flex justify-content-center"> 
                                   ${totales}
                               </div>    
                                   <div class="row d-flex justify-content-center"> 
                                       <div class="col-6 render text-center">
                                           <h6>El producto estrella:</h6>
                                           <p>                                    
                                               ${estrella}
                                           </p>
                                       </div>  
                                   </div>    
                                   <div class="row mb-3 d-flex justify-content-center">
                                       <div class="col-6 render rounded-bottom text-center">
                                           <h6>Vendedora que mas ingresos genero:</h6>
                                           <p>                                    
                                               ${masIngresos()}
                                           </p>
                                       </div>
                                   </div>`)
}
const MostrarContenido = (elemento,contenido) => {
   let data= (document.getElementById(elemento).innerHTML=contenido);
}



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