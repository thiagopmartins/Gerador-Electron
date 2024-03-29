
const jsonfile = require('jsonfile-promised');
const ConfigModel = require('../model/ConfigModel.js');
const ArquivoBaseModel = require('../model/ArquivoBaseModel.js');
const DadosModel = require('../model/DadosModel.js');
const EnvioArquivo = require('../model/EnvioArquivo.js');
const EnvioBanco = require('../model/EnvioBanco.js');
const EnvioSocket = require('../model/EnvioSocket.js')
const db = require('mysql2');
const base64 = require('base-64');

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const dir = './data/';
const filename = 'arquivo.tmp';
const log = require('log4js').getLogger("NotasModel");

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
    ie,
    comunicacao,
    xml = false,
    generateCanInu,
    nomeFastShop
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
                comunicacao = dados.comunicacao;
                generateCanInu = dados.generateCanInu;
                nomeFastShop = dados.nomeFastShop;

                return resolve(dados);
            });
        });
    }

    getName(agenteId) {
        let nome = nomenclatura.substring(0, nomenclatura.length - 4);
        let formatAgente = ("000" + agenteId).slice(-3);

        if (+agentes == 1)
            nome = nomenclatura;
        else
            nome = `${nome}${formatAgente}#`;
        return nome;
    }

    criarArquivo(conteudo, numNota, agenteId) {
        let caminho;
        
        let nome = this.getName(agenteId);
        let dat = new Date();
        let sufixo = numNota;
        if(nomeFastShop == 'on'){
            sufixo = `${numNota}Z${dat.getTime()}`;
        }
        if (!xml)
            caminho = nome + sufixo + '_ped_env.txt';
        else
            caminho = nome + sufixo + '_ped_env.xml';

        console.log(`Agente: ${nome}`);
        let encodedData = base64.encode(conteudo);
        log.info(`Criando o documento ${caminho} tipo de envio: ${comunicacao}`);
        if (comunicacao == 2) {
            let envioBanco = new EnvioBanco();
            envioBanco.iniciar().then(() => envioBanco.enviar(encodedData, caminho));
        }
        else if (comunicacao == 3) {
            let envioSocket = new EnvioSocket();
            envioSocket.iniciar().then(() => envioSocket.enviar(conteudo, caminho, agenteId, encodedData));
        }
        else {
            new EnvioArquivo(destino, caminho, conteudo, encodedData);
        }

    }

    criarNota(nota, agenteId) {
        let notaConteudo = null;
        let numeroNota = parseInt(numeroInicio) + nota;
        let data = new Date();
        let mezinho = data.getMonth() + 1;
        let mes = ("00" + mezinho).slice(-2);
        let dia = ("00" + data.getDate()).slice(-2);
        let hora = ("00" + data.getHours()).slice(-2);
        let minuto = ("00" + data.getMinutes()).slice(-2);
        let segundos = ("00" + data.getSeconds()).slice(-2);
        let fusoNota = fuso[0] + '0' + fuso[1];

        let dataFormat = `${data.getFullYear()}-${mes}-${dia}T${hora}:${minuto}:${segundos}${fusoNota}:00`;
        let uf;
        let mod;
        let codigoAleatorio = (Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000);
        let ano = data.getFullYear().toString().substr(-2);

        try {
            xml = false;
            notaConteudo = fs.readFileSync(dir + filename, 'utf8');
            if (notaConteudo.includes('<?xml'))
                xml = true;

        } catch (error) {
            ArquivoBaseModel.criarArquivo = origem;
            notaConteudo = fs.readFileSync(dir + filename, 'utf8');
            console.log("Arquivo .tmp não encontrado. Gerando novo arquivo com base na URL de origem" + error);
            log.error(error);
        }

        let ks = notaConteudo.split("\n");
        for (let value of ks) {
            let newValue = value.split(";");
            if (newValue[0] == "2100") {
                uf = newValue[1];
                mod = newValue[5];
            }
        }

        let nNF = uf + ano + mes + cnpj + mod + serie + ("000000000" + numeroNota).slice(-9) + tipoEmissao + codigoAleatorio + 1;
        let digito = this.calculaDV(nNF);

        notaConteudo = notaConteudo.replace('${Id}', "NFe" + `${nNF}`.substring(0, 43) + `${digito}`);

        if (generateCanInu == 'on') {
            let content = `0000;CANCINUT;${nNF.substring(0, 43)}${digito};Dados incorretos da nota;Dados incorretos da not`;
            let novo = destino.replace(/in/, '') + path.sep + 'can-inu' + path.sep;
            if (!fs.existsSync(novo))
                fs.mkdirSync(novo);

            console.log(novo);
            let encoded = base64.encode(content);
            let sufixo = numeroNota;
            let dat = new Date();
            if(nomeFastShop == 'on'){
                sufixo = `${numeroNota}Z${dat.getTime()}`;
            }
            log.info(`Gerando can-inu ${this.getName(agenteId)}${sufixo}_ped_can-inu.txt ${encoded}`);
            fs.writeFileSync(novo + this.getName(agenteId) + sufixo + '_ped_can-inu.txt', content);
        }

        notaConteudo = notaConteudo.replace('${cNF}', codigoAleatorio);
        notaConteudo = notaConteudo.replace('${serie}', serie);
        notaConteudo = notaConteudo.replace('${nNF}', numeroNota);
        notaConteudo = notaConteudo.replace('${tpEmis}', dataFormat);
        notaConteudo = notaConteudo.replace('${cDV}', digito);
        notaConteudo = notaConteudo.replace('${tpEmis}', tipoEmissao);
        notaConteudo = notaConteudo.replace('${CNPJ}', cnpj);
        notaConteudo = notaConteudo.replace('${IE}', ie);
        let linhas = notaConteudo.split('\n');

        let dadosModel = new DadosModel();

        let totItens = dadosModel.itens;
        let idItem = 1;
        let todosItens = [];
        let linhasInsert = [];
        while (idItem <= totItens) {

            for (let items of linhas) {
                //console.log(items);
                let removeItem;
                if (items.includes('${item}')) {
                    let removeItem;
                    removeItem = items.replace('${item}', '');
                    if (removeItem.includes('${idItem}'))
                        linhasInsert.push(removeItem.replace(/\${idItem}/g, idItem));
                    else
                        linhasInsert.push(removeItem);
                    //console.log(linhasInsert);
                }
            }

            todosItens.push(linhasInsert.toString());
            idItem++;
        }
        let notaParaEnviar = [];
        let add = false;
        for (let items of linhas) {
            //console.log(items);
            let removeItem;
            if (/\${item}/g.test(items)) {
                if (add == false) {
                    notaParaEnviar.push(linhasInsert.join('\n').toString());
                    add = true;
                }
            }
            else
                notaParaEnviar.push(items);
        }

        notaConteudo = notaParaEnviar.join('\n').toString();
        let valorTotal = parseFloat(totItens * 51.6000);
        let valorPis = parseFloat(51.6000 * 1.65 / 100).toFixed(2);
        let valorCofins = parseFloat(51.6000 * 7.60 / 100).toFixed(2);
        let vTotTrib = parseFloat(19.95 * totItens);
        let vFCPSTRet = parseFloat(51.6000 * 2.00 / 100).toFixed(2);
        while (/\${valorTotal}/.test(notaConteudo)) {
            notaConteudo = notaConteudo.replace('${valorTotal}', valorTotal.toFixed(2));
        }
        notaConteudo = notaConteudo.replace('${valorPis}', (valorPis * totItens).toFixed(2));
        notaConteudo = notaConteudo.replace('${valorCofins}', (valorCofins * totItens).toFixed(2));
        notaConteudo = notaConteudo.replace('${vFCPSTRet}', (vFCPSTRet * totItens).toFixed(2));
        notaConteudo = notaConteudo.replace('${vTotTrib}', vTotTrib.toFixed(2));
        console.log(notaConteudo);
        return notaConteudo;
    }


    //Calcula o digito verificador
    calculaDV(nNF) {
        let soma = 0;
        let resto = 0;
        let peso = [4, 3, 2, 9, 8, 7, 6, 5];
        let digitoRetorno;
        for (let i = 0; i < nNF.length - 1; i++)
            soma += peso[i % 8] * (parseInt(nNF.substr(i, 1)));
        resto = soma % 11;
        if (resto == 0 || resto == 1) digitoRetorno = 0; else digitoRetorno = 11 - resto;

        console.log(nNF + digitoRetorno);


        return digitoRetorno;
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