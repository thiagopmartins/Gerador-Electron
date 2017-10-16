const EstatisticaModel = require("../model/EstatisticaModel.js");
const ConstantesModel = require("../model/ConstantesModel.js");
const fs = require("fs");
const readline = require("readline");

let constantesModel = new ConstantesModel();
let estatisticaModel = new EstatisticaModel();

let valores = [];
let dir = [];
let resultados = [];
let content;
let tempo;
let rl;

class EstatisticaController {
    static async leArquivos(element) {
        for (var i = 0; i < element.files.length; i++) {
            dir = element.files[i].path;
            await this.readLines(dir).then(
                tempo => {
                   resultados.push([dir, tempo]);
                },
                error => {
                    console.log(`${error}`);
                }
            ) 
        }

        return resultados;
    }

    static readLines(dir) {
        return new Promise((resolve, reject) => {
            let inputFile = fs.createReadStream(dir);

            rl = readline.createInterface({
                input: inputFile,
                output: process.stdout
            });

            rl.on("line", linha => {
                if (linha.includes(constantesModel.SEFAZ)) {
                    tempo = linha.split(constantesModel.SEFAZ);
                    tempo[1] = tempo[1].replace(constantesModel.TERMO, "");
                    try {
                        valores.push(parseInt(tempo[1]));
                    } catch (e) {
                        tempo[1] = tempo[1].replace(constantesModel.TERMO_OLD, "");
                    valores.push(parseInt(tempo[1]));
                    }
                }
            }).on("close", () => {
                let tempo = estatisticaModel.mediaTempos(valores);
                return resolve(tempo);
            });
        });
    }
}
module.exports = EstatisticaController;
