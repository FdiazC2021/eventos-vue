import axios from "axios";

class ClienteService{

    url="localhost:8000/cliente";

    validar(miUsuario, miPassword){

        datos ={usuario:miUsuario, password:miPassword};

        return axios.post(`${this.url}/validar`, datos);

    }

}