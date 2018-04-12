const jsonfile = require('jsonfile-promised');
const DadosModel = require('../model/DadosModel.js');
const fs = require('fs');
const path = require('path');
let dir = './data/';
let filename = 'config.json';
let dadosModel;
let cnpjModel;
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
                    dadosModel.ie = dados.ie;
                    dadosModel.itens = dados.itens;

                    dadosModel.host = dados.host;
                    dadosModel.user = dados.user;
                    dadosModel.password = dados.password;
                    dadosModel.database = dados.database;
                    dadosModel.table = dados.table;
                    dadosModel.tableOut = dados.tableOut;
                    dadosModel.outBanco = dados.outBanco;
                    dadosModel.capturarRetornos = dados.capturarRetornos;
                    dadosModel.deletarRegistros = dados.deletarRegistros;

                    dadosModel.ipSocket = dados.ipSocket;
                    dadosModel.porta = dados.porta;
                    dadosModel.out = dados.out;

                    dadosModel.generateCanInu = dados.generateCanInu;

                    dadosModel.nomeFastShop = dados.nomeFastShop;


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
    salvarDados(toast) {
        dadosModel = new DadosModel();
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
            cnpj: dadosModel.cnpj,
            ie: dadosModel.ie,
            itens: dadosModel.itens,
            comunicacao: dadosModel.comunicacao,
            host: dadosModel.host,
            user: dadosModel.user,
            password: dadosModel.password,
            database: dadosModel.database,
            table: dadosModel.table,
            tableOut: dadosModel.tableOut,
            capturarRetornos: dadosModel.capturarRetornos,
            deletarRegistros: dadosModel.deletarRegistros,
            outBanco: dadosModel.outBanco,
            ipSocket: dadosModel.ipSocket,
            porta: dadosModel.porta,
            out: dadosModel.out,
            generateCanInu: dadosModel.generateCanInu,
            nomeFastShop: dadosModel.nomeFastShop

        }
        
        jsonfile.writeFile(dir + filename, dados, { spaces: 2 })
            .then(() => {
                console.log('Dado salvo com sucesso');
                if(toast == true)
                    Materialize.toast('Dados gravados com sucesso!', 3000, 'green');
            }).catch((err) => {
                console.log(err);
                if(toast == true)
                    Materialize.toast('Erro ao gravar os dados!', 3000, 'red');
            })
    }
}
module.exports = ConfigModel;