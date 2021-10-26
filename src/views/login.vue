<template>
    <h1>Inicio de sesión</h1>
    <form action="#">
        <input type="text" placeholder="Usuario" v-model="usuario">
        <input type="password" placeholder="Contraseña" v-model="password">
        <button @click.prevent="iniciarSesion">Iniciar</button>
        <h2 v-if="error!=''">{{error}}</h2>
    </form>
</template>

<script>

import ClienteService from "@/services/clientes"
export default {

    data(){
        return{
            usuario:"",
            password:"",
            error:""
        }
    },
    methods:{
        iniciarSesion(){
            ClienteService.validar(this.usuario, this.password).then(
                (respuesta)=>{
                    console.log(respuesta.data);
                    
                    if (respuesta.data.id) {
                        localStorage.cliente=respuesta.data.id;
                        this.$router.push({name:"Eventos"});
                    }else{
                        this.error="Datos inválidos"
                    }
                }
            );
        }
    }
}
</script>
