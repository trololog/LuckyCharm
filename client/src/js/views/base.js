export const baseElements = {
    searchBar: document.querySelector('.header__search-bar'),
    mainContainer: document.querySelector('.view-container')
};

export const elementStrings = {
    loader: 'loader'
};

export const renderLoader = parent => {
    const loader = `
        <div>
            <i class="fas fa-circle-notch"></i>
        </div>
    `;
}

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);

    if(loader)
        loader.parentElement.removeChild(loader);
};

export const clearView = () => {
    const view = baseElements.mainContainer;

    view.innerHTML = '';
}

