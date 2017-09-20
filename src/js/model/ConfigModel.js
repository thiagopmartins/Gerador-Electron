const jsonfile = require('jsonfile-promised');
const DadosModel = require('../model/DadosModel.js');
const fs = require('fs');
const path = require('path');
let dir = './data/';
let filename = 'config.json';
class ConfigModel {
    constructor() {
        if (!fs.existsSync(dir))
            fs.mkdirSync(dir);
        if (!fs.existsSync(dir + filename))
            this.criarConfig();
        else {
            console.log("Arquivo de configuração já existe.");
            console.log("Carregando Configurações.");
            let dadosModel = new DadosModel();
            this.pegarDados()
                .then((dados) => {
                    dadosModel.destino = dados.destino;
                    dadosModel.agentes = dados.agentes;
                    dadosModel.serie = dados.serie;
                    dadosModel.numero = dados.numero;
                    dadosModel.quantidade = dados.quantidade;
                    dadosModel.nomenclatura = dados.nomenclatura;
                    dadosModel.fuso = dados.fuso;
                    dadosModel.sleep = dados.sleep;
                    dadosModel.cnpj = dados.cnpj;

                    let file_field = $('input[type="file"]').closest('.file-field');       
                    let path_input = file_field.find('input.file-path');
                    let files = dados.origem;
                    let caminhoSplit = files.split('\\');
                    let value = caminhoSplit.length - 1;
                    path_input.val(caminhoSplit[value]);
                    path_input.trigger('change');

                }, (erro) => { console.log(erro); }
                );
        }
    }
    criarConfig() {
        return jsonfile.writeFile(dir + filename, {})
        .then(() => {
            console.log('Arquivo Criado')
        }).catch((err) => {
            console.log(err);
        });
    }
    pegarDados() {
        return jsonfile.readFile(dir + filename);
    }
    salvarOrigem() {
        let dadosModel = new DadosModel();
        this.pegarDados()
            .then((dados) => {
                dados.origem = dadosModel.origem
                jsonfile.writeFile(dir + filename, dados, { spaces: 2 })
                    .then(() => {
                        console.log('Dados de origem registrado com sucesso');
                    }).catch((err) => {
                        console.log(err);
                    })
            });
    }
    salvarDados() {
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
            sleep: dadosModel.sleep,
            cnpj: dadosModel.cnpj
        }
        jsonfile.writeFile(dir + filename, dados, { spaces: 2 })
            .then(() => {
                console.log('Dado salvo com sucesso');
            }).catch((err) => {
                console.log(err);
            })
    }
}
module.exports = ConfigModel;