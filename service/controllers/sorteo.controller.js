const Sorteo = require('../models/sorteo.model');

exports.getResultados = (req, res, next) => {
    const rest = new Sorteo();

    rest.getResultados().then((result) => {
        res.status(200).json({
            message: 'OK',
            result: result
        });
    })
    .catch((error) => {
        res.status(500).json({
            error: error
        });
    });
}