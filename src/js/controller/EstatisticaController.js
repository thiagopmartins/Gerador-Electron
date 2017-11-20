const EstatisticaModel = require("../model/EstatisticaModel.js");
const ConstantesModel = require("../model/ConstantesModel.js");
const fs = require("fs");
const readline = require("readline");

let constantesModel = new ConstantesModel();
let estatisticaModel = new EstatisticaModel();

class EstatisticaController {
    
    async leArquivos(element) {
        let resultados = [];
        let dir;
        
        for (var i = 0; i < element.files.length; i++) {
            dir = element.files[i].path;
            await this.readLines(dir).then(
                result => {
                    resultados.push(result);
                },
                error => {
                    console.log(`${error}`);
                }
            )
        }
        return resultados;
    }

    readLines(dir) {
        return new Promise((resolve, reject) => {
            let inputFile = fs.createReadStream(dir);
            let normais = 0;
            let valores = [];
            let rl;
            let tempo = 0;
            let contingencia = 0;         
            
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
                    normais++;
                } else if (linha.includes(constantesModel.CONTINGENCIA)) {
                    contingencia++;
                }
            }).on("close", () => {
                let result = new Array();
                let totalProcessados = normais + contingencia;
                if(normais == 0) {
                    result = [normais, 0, dir, contingencia, totalProcessados, estatisticaModel.mediaContingencia(contingencia, totalProcessados),estatisticaModel.tempoMaximo(valores)]; 
                } else { 
                    result = [normais, estatisticaModel.mediaTempos(valores), dir, contingencia, totalProcessados, estatisticaModel.mediaContingencia(contingencia, normais),estatisticaModel.tempoMaximo(valores)]; 
                }
                return resolve(result);
            });
        });
    }

    criaLista(valores) {
        for (let i = 0; i < valores.length; i++) {            
            document.getElementById('listaTempos').innerHTML += "<li class='collapsibleList'><div class='collapsible-header'><i class='material-icons'>expand_more</i> Média: " + valores[i][1].toFixed(3) + "ms" + " - " + valores[i][2] + "</div><div class='collapsible-body'><span>Média processamento normal: " + valores[i][1].toFixed(3) + "ms" + " <br /> Documentos processados Normais: " + valores[i][0] + " <br /> Documentos processados em contingência: " + valores[i][3] + " <br /> Total de documentos processados: " + valores[i][4] + " <br /> Média de processamento em contingência: " + valores[i][5].toFixed(3) + "%" + "<br /> Tempo máximo de processamento: " + valores[i][6] + "ms" + "</span></div></li>";
        }
    }

    criaTotal(valores) {
        let val = estatisticaModel.totais(valores);
        document.getElementById('cardMediaTotal').style.display = 'block';        
        document.getElementById('mediaTotal').innerHTML += `Média Total: ${val[1]}ms`;
    }
}
module.exports = EstatisticaController;
