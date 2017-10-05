const jsonfile = require('jsonfile-promised');
const ConfigModel = require('../model/ConfigModel.js');
const ArquivoBaseModel = require('../model/ArquivoBaseModel.js');
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
    numeroInicio,
    ie
    ;

class NotasModel {
    iniciar() {
        return new Promise((resolve, reject) => {
            configModel = new ConfigModel();
            configModel.pegarDados().then((dados) => {
                origem = dados.origem;
                agentes = dados.agentes;
                cnpj = dados.cnpj;
                ie = dados.ie;
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

    criarNota(nota) {
        let notaConteudo = null;
        let numeroNota = parseInt(numeroInicio) + nota;
        let data = new Date();
        let mezinho  =  data.getMonth()  +  1;
        let mes  =  ("00"  +  mezinho).slice(-2);
        let dia = ("00" + data.getDate()).slice(-2);
        let hora = ("00" + data.getHours()).slice(-2);
        let minuto = ("00" + data.getMinutes()).slice(-2);
        let segundos = ("00" + data.getSeconds()).slice(-2);
        let fusoNota = fuso[0] + '0' + fuso[1];
        let dataFormat = `${data.getFullYear()}-${mes}-${dia}T${hora}:${minuto}:${segundos}${fusoNota}:00`;

        try {
            notaConteudo = fs.readFileSync(dir + filename, 'utf8');
        } catch (error) {
            ArquivoBaseModel.criarArquivo = origem;
            notaConteudo = fs.readFileSync(dir + filename, 'utf8');
            console.log("Arquivo .tmp não encontrado. Gerando novo arquivo com base na URL de origem" + error);
        }

        notaConteudo = notaConteudo.replace('${Id}', '');
        notaConteudo = notaConteudo.replace('${cNF}', Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000);
        notaConteudo = notaConteudo.replace('${serie}', serie);
        notaConteudo = notaConteudo.replace('${nNF}', numeroNota);
        notaConteudo = notaConteudo.replace('${tpEmis}', dataFormat);
        notaConteudo = notaConteudo.replace('${cDV}', 1);
        notaConteudo = notaConteudo.replace('${tpEmis}', tipoEmissao);
        notaConteudo = notaConteudo.replace('${CNPJ}', cnpj);
        notaConteudo = notaConteudo.replace('${IE}', ie);
        
        console.log(notaConteudo);
        return notaConteudo;
    }
    criarArquivo(conteudo, numNota) {
        let caminho = destino + '\\' + nomenclatura + numNota + '_ped_env.txt';
        console.log(caminho);
        fs.writeFileSync(caminho, conteudo);
    }

    get agentes() { return agentes; }
    get destino() { return destino; }
    get fuso() { return fuso; }
    get nomenclatura() { return nomenclatura; }
    get origem() { return origem; }
    get serie() { return serie; }
    get sleep() { return sleep; }
    get tipoEmissao() { return tipoEmissao; }
    get cnpj() { return cnpj; }
    get ie() { return ie; }
    get quantidade() { return quantidade; }
    get numeroInicio() { return numeroInicio; }
}

module.exports = NotasModel;