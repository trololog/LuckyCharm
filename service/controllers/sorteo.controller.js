const Sorteo = require('../models/sorteo.model');

exports.getResultados = async (req, res, next) => {
    const result = await Sorteo.getResultados();

    res.status(200).json({
        message: 'OK',
        result: result
    });

    /*Sorteo.getResultados().then((result) => {
        res.status(200).json({
            message: 'OK',
            result: result
        });
    })
    .catch((error) => {
        res.status(500).json({
            error: error
        });
    });*/
}