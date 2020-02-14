import SorteoController from './controllers/sorteo.controller';
import { baseElements } from './views/base';

const state = {};
const sorteoController = new SorteoController();

['hashchange','load'].forEach(event => {
    window.addEventListener(event, sorteoController.loadSorteos);
});