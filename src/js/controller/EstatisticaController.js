const EstatisticaModel = require('../model/EstatisticaModel.js');
const fs = require('fs');
const readline = require('readline');

let estatisticaModel = new EstatisticaModel();

class EstatisticaController {
    static leArquivos(qtdItens) {
        return new Promise((resolve, reject) => {
            let content = null;
            let tempo;
            let valores = [];
            let dir = [];
            for (var i = 0; i < qtdItens; i++) {
                dir[i] = document.getElementById("arquivosException").files[i].path;
                let inputFile = fs.createReadStream(dir[i])
                const rl = readline.createInterface({
                    input: inputFile,
                    output: process.stdout
                });

                rl.on('line', (linha) => {
                    if (linha.includes(estatisticaModel.SEFAZ)) {
                        tempo = linha.split(estatisticaModel.SEFAZ);
                        tempo[1] = tempo[1].replace(estatisticaModel.TERMO, "");
                        try {
                            valores.push(parseInt(tempo[1]));
                        } catch (e) {
                            tempo[1] = tempo[1].replace(estatisticaModel.TERMO_OLD, "");
                            valores.push(parseInt(tempo[1]));
                        }
                    }
                }).on('close', () => {
                    console.log('terminou de ler!');
                    console.log(valores);
                    
                });
            }

            return resolve();
        });


    }
}
module.exports = EstatisticaController;