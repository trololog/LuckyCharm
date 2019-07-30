import SorteoController from './controllers/sorteo.controller';

const state = {};
const sorteoController = new SorteoController();

['hashchange','load'].forEach(event => {
    window.addEventListener(event, sorteoController.loadSorteos);
});