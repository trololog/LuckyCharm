import { baseElements } from './base';



export default class SorteoView {
    renderResultados(resultados) {
        const markup = `<table>
                            <thead>
                                <tr>
                                    <th>Nro Sorteo</th>
                                    <th>Fecha del Sorteo</th>
                                    <ht>Bolillas Ganadoras</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${resultados.map(resultado => this.crearResultado(resultado)).join('')}
                            </tbody>
                            <tfooter>
                            </tfooter>
                        </table>`;

        baseElements.mainContainer.innerHTML = markup;
    };

    crearResultado(resultado) {
        return `
            <tr>
                <td>${resultado.numero}</td>
                <td>${resultado.fecha}</td>
                <td>${resultado.bolillas.join(" ")}</td>
            </tr>
        `;
    }
}