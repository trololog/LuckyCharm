import { baseElements } from './base';

const crearMenu = (item) => {
    return `<li><a class="${item.icon}">${item.name}</a></li>`;
};

export default class NavbarView {
    renderMenu(menu) {
        const markup = `<nav class="nav">
                            <ul "nav__menu">
                                ${menu.map(menuItem => crearMenu(menuItem)).join('')}
                            </ul>
                        </nav>`;
        baseElements.navBar.innerHTML = markup;
    }
}

