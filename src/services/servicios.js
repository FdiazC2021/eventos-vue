import axios from "axios";

class ServicioService {
    salones = [];
    url ="http://localhost:8000/servicio"

    constructor() {
        this.salones = [
            {
                "nombre": "Normal",
                "precio": 1000000,
                "extra_mesero": 150000,
                "cantidad_meseros": 2,
                "plato": 50000
            },
            {
                "nombre": "Grande",
                "precio": 2000000,
                "extra_mesero": 100000,
                "cantidad_meseros": 4,
                "plato": 40000
            }
        ];
    }

    obtenerTodos() {
        // return this.salones
        return axios.get(`${this.url}/todos`).then(
            (respuesta)=>{
                console.log(respuesta.data);
            }
        ).catch(
            (error)=>{
                
            }
        );
    }
} export default new ServicioService();