import axios from 'axios';
import { Parametros } from '../config';


export default class SorteoModel {
    async getResultados() {
        this.resultados = [];

        try {
            const result = await axios.get(`${Parametros.ApiUrl}/sorteo`);
            this.resultados = result.data.result;

            return this.resultados;
        } catch(error) {
            console.log(error);
        }
    }
}