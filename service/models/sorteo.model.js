const DomParser = require('dom-parser');
const axios = require('axios');
const config = require('../config/index');
const mongoose = require('mongoose');
const uniquevalidator = require('mongoose-unique-validator');

const sorteoSchema = mongoose.Schema({
    numeroSorteo: { type: String, require: true },
    fechaSorteo: { type: Date, require: true },
    bolillas: { type: Array, require: true },
    creation_date: { type: Date, require: true }
});

sorteoSchema.plugin(uniquevalidator);

const SorteoModel = mongoose.model('sorteo', sorteoSchema);
const sorteoQuery = SorteoModel.find();


module.exports.getResultados = async () => {
    let resultados = {};
    
    resultados = await getResultadosFromSite();

    const dbResult = await getLastUpdatedRecord();

    if(!dbResult || dbResult.length === 0) {
        await insertResultados(resultados);
    } else {
        const minCurrentSorteo = resultados.sort((a,b) => { return a.numero - b.numero; })[0];
        const maxSorteoDb = dbResult.sort((a,b) => { return b.numeroSorteo - a.numeroSorteo; })[0];
        
        if(minCurrentSorteo.numero > maxSorteoDb.numeroSorteo) {
            //await insertResultados(resultados);
        }
    }

    return resultados;
}

function getLastUpdatedRecord() {
    return new Promise((resolve, reject) => {
        sorteoQuery.sort({ creation_date: -1 })
                    .limit(14)
                    .then(document => {
                        resolve(document);
                    })
                    .catch(error => {
                        reject(error);
                    });
    });
}

async function getResultadosFromSite() {
        const fileContent = await axios.get(config.connectionStrings.ganadiario_source);
        const domParser = new DomParser();
        
        let doc = domParser.parseFromString(fileContent.data);
        doc = domParser.parseFromString(doc.getElementsByClassName('boxes-lots')[0].innerHTML);
        doc = doc.getElementsByClassName('box-last-game');

        const resultados = [];
        let resultado = {};
        let htmlElement = {};
        let htmlElement1 = {};
        let htmlElement2 = {};

        doc.forEach((element, index) => {
            resultado = {};
            htmlElement = domParser.parseFromString(element.innerHTML);
            htmlElement1 = domParser.parseFromString(htmlElement.getElementsByClassName('top-last-game')[0].innerHTML);
            htmlElement1 = domParser.parseFromString(htmlElement1.getElementsByTagName('h3')[0].innerHTML);
            htmlElement1 = htmlElement1.rawHTML.split(" ");
            resultado.numero = htmlElement1[1];
            resultado.fecha = htmlElement1[3];
            htmlElement2 = domParser.parseFromString(htmlElement.getElementsByClassName('bottom-last-game')[0].innerHTML);
            htmlElement2 = domParser.parseFromString(htmlElement2.getElementsByTagName('h5')[0].innerHTML);
            htmlElement2 = htmlElement2.rawHTML.replace('Bolillas: ','');
            htmlElement2 = htmlElement2.split(" ");
            resultado.bolillas = htmlElement2;

            resultados.push(resultado);
        });

        return resultados;
}

function insertResultados(resultados) {
    const dbResultados = resultados.map((resultado) => {
        var fechaItems = resultado.fecha.split('/');
        return { 
            numeroSorteo: resultado.numero,
            fechaSorteo: new Date(`${ fechaItems[2] }-${ fechaItems[1] }-${ fechaItems[0] }`),
            bolillas: resultado.bolillas,
            creation_date: new Date()
        };
    });

    return new Promise((resolve, reject) => {
        SorteoModel.insertMany(dbResultados, function(err, docs) {
          if(err) {
              reject(err);
          } else {
              resolve(docs);
          }
        });
    });
}