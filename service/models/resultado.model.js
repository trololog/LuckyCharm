const util = require('util');
const fs = require('fs');
const readFile = util.promisify(fs.readFile);


class Resultado {
    constructor() {
        this.resultados = [];
    }

    async getResultados() {
        const fileContent = readFile('../test/test_response.html',"utf-8");
        console.log(fileContent);

        //https://medium.com/@ajmeyghani/writing-asynchronous-programs-in-javascript-9a292570b2a6
    }
}

module.exports = Resultado;