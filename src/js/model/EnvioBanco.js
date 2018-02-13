const ConfigModel = require('../model/ConfigModel.js');
const db = require('mysql2');
const fs = require('fs');
const Log = require('../../Log.js');


let
    host,
    user,
    password,
    database,
    table,
    tableOut,
    outBanco,
    deletarRegistros,
    capturarRetornos,
    logger
    ;
class EnvioBanco {

    constructor(){
        logger = new Log();
    }

    iniciar() {
        return new Promise((resolve, reject) => {
            let configModel = new ConfigModel();
            configModel.pegarDados().then((dados) => {
                host = dados.host;
                user = dados.user;
                password = dados.password;
                database = dados.database;
                table = dados.table;
                tableOut = dados.tableOut;
                outBanco = dados.outBanco;
                capturarRetornos = dados.capturarRetornos;
                deletarRegistros = dados.deletarRegistros;
                return resolve(dados);
            });
        });
    }

    criarConexao() {
        return db.createConnection({
            host: host,
            user: user,
            password: password,
            database: database
        });
    }
    enviar(conteudo, caminho) {
        const connection = this.criarConexao();
        logger.escreve(`Inserindo o documento ${caminho} no banco de dados: ${conteudo}`)        
        connection.query(
            `INSERT INTO ${table} (filename, documentdata) VALUES (?, ?)`,
            [caminho, conteudo],
            (err, results, fields) => {
                if (err){
                    logger.escreveError(`Erro ao inserir o documento ${caminho}`);
                    logger.escreveError(err);
                }
                else {
                    logger.escreve(`Documento ${caminho} inserido com sucesso!`);
                    setTimeout(() => {
                        if (capturarRetornos == 1)
                            this.consultaRetorno(results.insertId, 0);
                    }, parseInt(3000));
                }
                connection.close();
            }
        );

    }
    consultaRetorno(id, tentativa) {
        const connection = this.criarConexao();
        connection.query(
            `SELECT * FROM ${tableOut} WHERE idinput = ?`,
            [id],
            (err, results, fields) => {
                if (err) {
                    if (tentativa < 50000) {
                        setTimeout(() => {
                            this.consultaRetorno(id, tentativa);
                        }, parseInt(1000));
                    }
                    logger.escreveError(err);
                } else {
                    if (results.length == 0) {
                        if (tentativa < 50000) {
                            setTimeout(() => {
                                this.consultaRetorno(id, tentativa);
                            }, parseInt(1000));
                        }
                    } else {
                        Log.escreve(err);
                        if (!fs.existsSync(outBanco))
                            fs.mkdirSync(outBanco);
                        fs.writeFileSync(outBanco + '\\' + results[0].filename, results[0].documentdata);
                        if (deletarRegistros == 'on')
                            this.deletarRegistro(id);
                    }
                }
                connection.close();
            }
        );
    }
    deletarRegistro(id) {
        const connection = this.criarConexao();
        connection.query(
            `DELETE FROM ${tableOut} WHERE idinput = ?`,
            [id],
            (err, results, fields) => {
                if (err)
                    logger.escreveError(err);
                else
                    logger.escreve('Registro deletado com sucesso.')
                connection.close();
            }
        );
    }

}

module.exports = EnvioBanco;