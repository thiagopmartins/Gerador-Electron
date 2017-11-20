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
    ie,
    xml = false;
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
            xml = false;
            notaConteudo = fs.readFileSync(dir + filename, 'utf8');
            if(notaConteudo.includes('<infNFe'))
                xml = true;

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

        

        let linhas = notaConteudo.split('\n');
        
        let totItens = 100;
        let idItem = 1;
        let todosItens = [];
        let linhasInsert = [];
        while(idItem <= totItens){
            
            for(let items of linhas){
                //console.log(items);
                let removeItem;
                if(items.includes('${item}')){
                    let removeItem;
                    removeItem = items.replace('${item}', '');
                    if(removeItem.includes('${idItem}'))
                        linhasInsert.push(removeItem.replace(/\${idItem}/g,idItem)); 
                    else
                        linhasInsert.push(removeItem);    
                    //console.log(linhasInsert);
                    
                }
            }

            todosItens.push(linhasInsert.toString());
            idItem ++;
        }
        let notaParaEnviar = [];
        let add = false;
        for(let items of linhas){
            //console.log(items);
            let removeItem;
            if(/\${item}/g.test(items)){
                if(add == false){
                    notaParaEnviar.push(linhasInsert.join('\n').toString()); 
                    add = true;  
                }  
            }
            else
                notaParaEnviar.push(items);
        }   

        notaConteudo = notaParaEnviar.join('\n').toString();
        let valorTotal = parseFloat(totItens*51.6000);
        let valorPis = parseFloat(51.6000*1.65/100).toFixed(2);
        let valorCofins = parseFloat(51.6000*7.60/100).toFixed(2);
        let vTotTrib = parseFloat(19.95 * totItens);
        let vFCPSTRet = parseFloat(51.6000*1.00/100).toFixed(2);
        while(/\${valorTotal}/.test(notaConteudo)){
            notaConteudo = notaConteudo.replace('${valorTotal}', valorTotal.toFixed(2));
        }
        notaConteudo = notaConteudo.replace('${valorPis}', (valorPis*totItens).toFixed(2));
        notaConteudo = notaConteudo.replace('${valorCofins}', (valorCofins*totItens).toFixed(2));
        notaConteudo = notaConteudo.replace('${vFCPSTRet}', (vFCPSTRet*totItens).toFixed(2));
        notaConteudo = notaConteudo.replace('${vTotTrib}', vTotTrib.toFixed(2));
        console.log(notaConteudo);
        //console.log(notaConteudo);
        return notaConteudo;
    }
    criarArquivo(conteudo, numNota) {
        let caminho;
        if(!xml)
            caminho = destino + '\\' + nomenclatura + numNota + '_ped_env.txt';
        else
            caminho = destino + '\\' + nomenclatura + numNota + '_ped_env.xml';    
        console.log(caminho);
        console.log(xml);
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