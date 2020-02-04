import SorteoModel from '../models/sorteo.model';
import SorteoView from '../views/sorteo.view';

import { renderLoader, 
            baseElements, 
            clearView,
            clearLoader } 
from '../views/base';

export default class SorteoController {
    async loadSorteos() {
        try {
            const sorteoModel = new SorteoModel();
            const sorteoView = new SorteoView();

            clearView();

            renderLoader(baseElements.mainContainer);

            const resultados = await sorteoModel.getResultados();
            clearLoader();
            sorteoView.renderResultados(resultados);
    
            clearLoader();

            return resultados;
        } catch(error) {
            console.log(`Error ${error} at sorteo controller`);
        }
    };
}