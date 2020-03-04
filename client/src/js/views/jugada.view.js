import { baseElements } from './base';

export default class ResultView {
    renderJugadaForm() {
        const markup = `<section class="jugada-container">
                            <form>
                                <div class="form__header">
                                    <h2>Nueva Jugada</h2>
                                </div>
                                <div class="form__body">
                                    <div class="jugada-container__element">
                                        <label class="jugada-container--label">Fecha</label>
                                        <input data-name="fecha" class="jugada-container--text" type="text">
                                    </div>
                                    <div class="jugada-container__element">
                                        <label class="jugada-container--label">Numero Sorteo</label>
                                        <input data-name="sorteo" class="jugada-container--text" type="text">
                                    </div>
                                    <div class="jugada-container__element">
                                        <label class="jugada-container--label">Numeros</label>
                                        <input data-name="numeros" class="jugada-container--text" type="text">
                                    </div>
                                </div>
                                <div class="form__footer">
                                    <button class="form-button__submit" type="submit">Guardar</button>
                                </div>
                            </form>
                        </section>`;

        baseElements.mainContainer.appendChild(markup);
    }
}