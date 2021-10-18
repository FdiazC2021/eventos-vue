class EventoService {

    eventos = [];
    eventoActual = {};

    constructor() {
        this.eventoActual = {
            cliente: "",
            documento: "",
            salon: {},
            meseros: 0,
            platos: 0,
            total: 0
        };

        this.eventos = [
            {
                cliente: "José",
                documento: "79982634",
                meseros: 2,
                platos: 150,
                salon: {
                    "nombre": "Normal",
                    "precio": 1000000,
                    "extra_mesero": 150000,
                    "cantidad_meseros": 2,
                    "plato": 50000
                },
                total: 3200000
            },
            {
                cliente: "Maria",
                documento: "123456789",
                meseros: 5,
                platos: 50,
                salon: {
                    "nombre": "Grande",
                    "precio": 2000000,
                    "extra_mesero": 100000,
                    "cantidad_meseros": 4,
                    "plato": 40000
                },
                total: 3200000
            },
        ];
    }

    obtenerTodos() {
        return this.eventos;
    }

    obtenerEventoActual(){
        return this.eventoActual;
    }

} export default new EventoService();