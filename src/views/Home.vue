<template>
  <header>
        <h1>{{titulo}}</h1>
    </header>
    <main>
        <div>
            
            <h2>Registar Eventos</h2>
            <form id="formulario_evento" action="#" method="post">
                <!-- <label for="cliente">Cliente:</label>
                <input type="text" name="cliente" v-model="evento.cliente">
                <label for="documento">Documento:</label>
                <input type="text" name="documento" v-model="evento.documento"> -->
                <label for="salon">Salón:</label>
                <div>
                    <input type="radio" name="salon" value="0" v-model="salon"> Normal
                    <input type="radio" name="salon" value="1" v-model="salon"> Grande
                    
                </div>
                <input type="checkbox" name="meseros_extra" v-model="extra">
                <label for="meseros_extra">Desea agregar meseros extra?</label>
                <label v-if="extra" for="cantidad">Cantidad meseros</label>
                <input v-if="extra" type="number" name="cantidad" v-model="evento.meseros" >
                <input type="checkbox" name="servicio_comida" v-model="comida">
                <label for="servicio_comida">Desea incluir comida?</label>
                <label v-if="comida" for="platos">Cantidad platos</label>
                <input v-if="comida" type="number" name="platos">
                <label for="servicio">Servicio:</label>
                <select name="servicio" v-model="servicio">
                    <option v-for="unServicio, i in listaServicios" :key="unServicio.id" :value="i">{{unServicio.nombre}}</option>
                </select>
                
                <button type="reset" name="limpiar">Limpiar</button>
                <button @click.prevent="procesarInformacion" type="button">Agregar evento</button>
            </form>
            <h2>Cliente:{{evento.cliente}}</h2>
        </div>
        
        <div>
            
            <h2>Listado de Eventos - {{cliente.nombre}}</h2>
            
            <table border="1">
                <thead>
                    <tr>
                        <!-- <th>CLIENTE</th> -->
                             <th>SALON</th>
                             <th>MESEROS</th>
                             <th>PLATOS</th>
                             <!-- <th>FOTO</th> -->
                             <th>TOTAL</th>
                             <th>OPCIONES</th>
                            </tr>
                        </thead>
                        <tbody id="datos_eventos">
                            <tr v-for="unEvento, i in listaEventos" :key="unEvento">
                              <!-- <td>{{unEvento.cliente}}</td> -->
                              <td>{{unEvento.salon.nombre}}</td>
                              <td>{{unEvento.meseros}}</td>
                              <td>{{unEvento.platos}}</td>
                              <!-- <td>
                                  <img :src="unEvento.imagen" :alt="">                                  
                                  </td> -->
                              <td>{{unEvento.total}}</td>
                              <td><button @click.prevent="eliminar(i)">Eliminar</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
            </main>
</template>

<script>
// @ is an alias to /src

import EventoService from "@/services/eventos.js"
import SalonService from "@/services/salones.js"
import ClienteService from "@/services/clientes.js"
import ServicioService from "@/services/servicios.js"

export default {
    mounted(){
        ClienteService.obtener().then((respuesta)=>{
            this.cliente=respuesta.data;
        });
        document.title="Gestión de Eventos";
        EventoService.obtenerPorCliente().then((respuesta)=>{
            this.listaEventos=respuesta.data;
        });
        SalonService.obtenerTodos().then((respuesta)=>{
            this.listaSalones=respuesta.data;
        });
        ServicioService.obtenerTodos().then((respuesta)=>{
            this.listaServicios=respuesta.data;
        });
        // this.evento=EventoService.obtenerEventoActual();
        // if (this.evento.cliente!="") {
        //     this.limpiarFormulario();
        // }
    },
  data(){
    return {
            
      titulo:"Gestión de eventos - Eventos",
      listaSalones:[],
      listaEventos:[],
      listaServicios:[],
      evento:{},
      salon:0,
      servicio:0,
      extra:false,
      comida:false,
      cliente:{}
    };
  },
  name: 'Home',
  components: {
    
  },
  methods:{

    eliminar(posicion){
        this.listaEventos.splice(posicion, 1);
    },

      limpiarFormulario(){
          this.evento = {
            cliente:"",
            documento:"",
            salon:{},
            meseros:0,
            platos:0,
            total:0
        }
        this.salon=0;
        this.extra=false;
        this.comida=false;      
      },
      procesarInformacion(){
          this.evento.salon = this.listaSalones[this.salon];
          this.evento.servicio = this.listaServicios[this.servicio];
          this.evento.cliente = this.cliente;
          
          if (this.extra) {
              this.evento.meseros+=this.evento.salon.cantidadMeseros;
          }else{
              this.evento.meseros=this.evento.salon.cantidadMeseros;
          }
          if (!this.comida) {
              this.evento.platos=0;
          }

          let valorMeseros = this.evento.meseros*this.evento.salon.extraMesero;
          let valorComida = this.evento.platos*this.evento.salon.plato;

          this.evento.total = valorComida + valorMeseros + this.evento.salon.precio + this.evento.servicio.precio;

          EventoService.registrar(this.evento).then((respuesta)=>{
              this.listaEventos.push(this.evento);
              this.limpiarFormulario();

          });


        //   this.$router.push("/about"); opcion 1

            // this.$router.push({name:"Home", params:{datos:this.listaEventos}});
      }
  }
}
</script>

<style scoped>

  body{
            padding: 2rem;
        }
        #formulario_evento{
            display: grid;
            grid-template-columns: 5rem 10rem;
            row-gap: 1rem;
            column-gap: 0.5rem;

        }
        main{
            display: grid;
            grid-template-columns: 1fr 3fr;
        }

        table{
            width: 80%;
            margin: 0 auto;
        }

</style>
