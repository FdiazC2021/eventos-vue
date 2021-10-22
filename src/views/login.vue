<template>
    <h1>Inicio de sesión</h1>
    <form action="#">
        <input type="text" placeholder="Usuario" v-model="usuario">
        <input type="password" placeholder="Contraseña" v-model="password">
        <button @click.prevent="iniciarSesion">Iniciar</button>
    </form>
</template>

<script>

import ClienteService from "@/services/clientes"
export default {

    data(){
        return{
            usuario:"",
            password:""
        }
    },
    methods:{
        iniciarSesion(){
            ClienteService.validar(this.usuario, this.password).then(
                (respuesta)=>{
                    console.log(respuesta.data);
                    if (respuesta.data.id) {
                        this.$router.push({name:"Eventos"});
                    }
                }
            );
        }
    }
}
</script>
