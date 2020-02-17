import SiteMenu from '../models/navbar.model';
import NavbarView from '../views/navbar.view';

export default class NavbarController {
    loadMenu() {
        const navbarView = new NavbarView();
        console.log('menu');
        navbarView.renderMenu(SiteMenu);
    }
}