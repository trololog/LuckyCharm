const DomParser = require('dom-parser');
const axios = require('axios');
const config = require('../config/index');
const mongoose = require('mongoose');
const uniquevalidator = require('mongoose-unique-validator');

const sorteoSchema = mongoose.schema({
    numeroSorteo: { type: String, require: true },
    fechaSorteo: { type: Date, require: true },
    bolillas: { type: Array, require: true },
    creation_date: { type: Date, require: true }
});

sorteoSchema.plugin(uniquevalidator);

const SorteoModel = mongoose.model('sorteo', sorteoSchema);
const sorteoQuery = SorteoModel.find();


async function getResultados() {
    const resultados = {};
    
    const dbResult = await getLastUpdatedRecord();

    if(!dbResult) {
        resultados = await getResultadosFromSite();
        return resultados;
    }

}

    function getLastUpdatedRecord() {
        return new Promise((resolve, reject) => {
            sorteoQuery.sort({ creation_date: -1 })
                        .limit(1)
                        .then(document => {
                            resolve(document);
                        },error => {
                            reject(error);
                        });
        });
    }


async function getResultadosFromSite() {
    return new Promise((resolve, reject) => {
        try {
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

            resolve(resultado);
        } catch(ex) {
            reject(ex);
        }
    });  



        /*sorteoQuery.sort({ creation_date: -1 })
                    .limit(1)
                    .then(document => {
                        if(!document) {
                            resultados = await this.getResultadosFromSite();
                            return resultados;
                        }
                            

                        const docDate = new Date(document.creation_date).setHours(0,0,0);
                        const actualDate = new Date().setHours(0,0,0);

                        if(docDate < actualDate) {
                            resultados = await this.getResultadosFromSite();
                        }
                            
                    });*
        
        
    }

    

    
}

module.exports = Sorteo;