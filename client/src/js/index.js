import SorteoController from './controllers/sorteo.controller';
import NavbarController from './controllers/navbar.controller';
import { baseElements } from './views/base';

const state = {};
const sorteoController = new SorteoController();
const navbarController = new NavbarController();

['hashchange','load'].forEach(event => {
    window.addEventListener(event, navbarController.loadMenu);
    window.addEventListener(event, sorteoController.loadSorteos);
});