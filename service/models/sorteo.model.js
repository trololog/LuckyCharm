const util = require('util');
const fs = require('fs');
const readFile = util.promisify(fs.readFile);
const path = require('path');
const DomParser = require('dom-parser');
const axios = require('axios');


class Sorteo {
    async getResultados() {
        const p = path.resolve();
        //const fileContent = await readFile(p + '\\test\\test_response.html',"utf-8");
        const fileContent = await axios.get("https://m.intralot.com.pe/game_ganadiario_show_result.html");
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
}

module.exports = Sorteo;