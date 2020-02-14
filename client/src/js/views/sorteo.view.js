import { baseElements } from './base';

export default class SorteoView {
    renderResultados(resultados) {
        const markup = `<section class="results-container">
                            <h2 class="header-secondary u-margin-bottom-small">ULTIMOS RESULTADOS</h2> 
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th class="u-small-column-25">Nro Sorteo</th>
                                        <th class="u-small-column-25">Fecha del Sorteo</th>
                                        <th>Bolillas Ganadoras</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${resultados.map(resultado => this.crearResultado(resultado)).join('')}
                                </tbody>
                                <tfooter>
                                </tfooter>
                            </table>
                        </section>`;

        baseElements.mainContainer.innerHTML = markup;
    };

    crearResultado(resultado) {
        return `
            <tr>
                <td>${resultado.numero}</td>
                <td>${resultado.fecha}</td>
                <td>${resultado.bolillas.map(b=> this.renderBolilla(b)).join('')}</td>
                <td><a data-resultnro="${resultado.numero}" class="button-compare">Comparar</a></td>
            </tr>
        `;
    }

    renderBolilla(bolilla) {
        return `<span class="result-ball">${bolilla}</span>`;
    }

    addEvents() {
        const container = document.querySelector('.results-container');
        container.addEventListener('click', e => {
            if(e.target.matches('.button-compare')) {
                
            }
        });
    }
}