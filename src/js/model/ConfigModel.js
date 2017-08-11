const jsonfile = require('jsonfile-promised');
const DadosModel = require('../model/DadosModel.js');
const fs = require('fs');
let dir = './data/';
let filename = 'config.json';
class ConfigModel{
    constructor(){
        if (!fs.existsSync(dir))
            fs.mkdirSync(dir);
        if(!fs.existsSync(dir + filename)) 
            this.criarConfig();
        else
            console.log("Arquivo de configuração já existe!"); 
    }
    criarConfig(){
        return jsonfile.writeFile(dir + filename,{})
                .then(() => {
                    console.log('Arquivo Criado')
                }).catch((err) => {
                    console.log(err);
            });        
    }
    pegarDados(){
        return jsonfile.readFile(dir + filename);
    }
    salvarOrigem(){
        let dadosModel = new DadosModel();
        this.pegarDados()
        .then((dados) => {
            dados.origem = dadosModel.origem
            jsonfile.writeFile(dir + filename, dados, {spaces: 2})
                .then(() => {
                    console.log('Dado salvo com sucesso');
                }).catch((err) => {
                    console.log(err);
                })
        });
    }
    salvarDados(){
        let dadosModel = new DadosModel();
        let dados = {
            origem: dadosModel.origem,
            destino: dadosModel.destino,
            tipoEmissao: dadosModel.tipo,
            agentes: dadosModel.agentes,
            serie: dadosModel.serie,
            numero: dadosModel.numero,
            quantidade: dadosModel.quantidade,
            nomenclatura: dadosModel.nomenclatura,
            fuso: dadosModel.fuso,
            sleep: dadosModel.sleep
        }
        jsonfile.writeFile(dir + filename, dados, {spaces: 2})
                .then(() => {
                    console.log('Dado salvo com sucesso');
                }).catch((err) => {
                    console.log(err);
                })        
    }    
}
module.exports = ConfigModel;