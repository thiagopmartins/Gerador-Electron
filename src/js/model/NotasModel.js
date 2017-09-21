const jsonfile = require('jsonfile-promised');
const ConfigModel = require('../model/ConfigModel.js');

const fs = require('fs');
const path = require('path');
const dir = './data/';
const filename = 'arquivo.tmp';
let configModel = null;

let 
    agentes,
    cnpj,
    destino,
    fuso,
    nomenclatura,
    origem,
    quantidade,
    serie,
    sleep,
    tipoEmissao,
    numeroInicio
;

class NotasModel {
    iniciar() {
        return new Promise((resolve, reject) => {   
            configModel = new ConfigModel();
            configModel.pegarDados().then((dados) => {
                agentes = dados.agentes;
                cnpj = dados.cnpj;
                destino = dados.destino;
                fuso = dados.fuso;
                nomenclatura = dados.nomenclatura;
                origem = dados.origem;
                quantidade = dados.quantidade;
                serie = dados.serie;
                sleep = dados.sleep;
                tipoEmissao = dados.tipoEmissao;
                numeroInicio = dados.numero;
                return resolve();
            }); 
        });
    }

    criarNota(nota){
        let notaConteudo = null; 
        let numeroNota = parseInt(numeroInicio) + nota;
        let data = new Date();
        let mes = ("00" + data.getMonth()).slice(-2);
        let dia = ("00" + data.getDate()).slice(-2);
        let hora = ("00" + data.getHours()).slice(-2);
        let minuto =  ("00" + data.getMinutes()).slice(-2);
        let segundos = ("00" + data.getSeconds()).slice(-2);
        let fusoNota = fuso[0] + '0' + fuso[1];
        let dataFormat =
        `${data.getFullYear()}-${mes}-${dia}T${hora}:${minuto}:${segundos}${fusoNota}:00`;
        notaConteudo = fs.readFileSync(dir + filename, 'utf8');
        notaConteudo = notaConteudo.replace('${Id}', '');
        notaConteudo = notaConteudo.replace('${cNF}', '12345678');
        notaConteudo = notaConteudo.replace('${serie}', serie);
        notaConteudo = notaConteudo.replace('${nNF}', numeroNota);
        notaConteudo = notaConteudo.replace('${tpEmis}', dataFormat);
        notaConteudo = notaConteudo.replace('${cDV}', 1);
        notaConteudo = notaConteudo.replace('${tpEmis}', tipoEmissao);
        console.log(notaConteudo);
        return notaConteudo;
    }
    criarArquivo(conteudo,numNota){
        let caminho = destino + '\\' + nomenclatura + numNota + '_ped_env.txt';

        console.log(caminho);

        fs.writeFileSync(caminho, conteudo);
    }

    get agentes(){ return agentes; }
    get destino(){ return destino; }
    get fuso(){ return fuso; }
    get nomenclatura(){ return nomenclatura; }
    get origem(){ return origem; }
    get serie(){ return serie; }
    get sleep(){ return sleep; }
    get tipoEmissao(){ return tipoEmissao; }
    get cnpj(){ return cnpj; }
    get quantidade(){ return quantidade; }
    get numeroInicio(){ return numeroInicio; }
}

module.exports = NotasModel;