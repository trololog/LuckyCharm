export const baseElements = {
    searchBar: document.querySelector('.header__search-bar'),
    mainContainer: document.querySelector('.content')
};

export const elementStrings = {
    loader: 'loader'
};

export const renderLoader = parent => {
    const loader = `
        <div class="page-loader">
            <span>Loading</span>
            <i class="fas fa-circle-notch"></i>
        </div>
    `;

    baseElements.mainContainer.innerHTML = loader;
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

