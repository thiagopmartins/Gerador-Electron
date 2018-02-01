const ConfigModel = require('../model/ConfigModel.js');
const db = require('mysql2');
const base64 = require('base-64');
const fs = require('fs');


let
    host,
    user,
    password,
    database,
    table,
    tableOut,
    outBanco,
    deletarRegistros
    ;
class EnvioBanco {

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
        let encodedData = base64.encode(conteudo);
        connection.query(
            `INSERT INTO ${table} (filename, documentdata) VALUES (?, ?)`,
            [caminho, encodedData],
            (err, results, fields) => {
                if (err)
                    console.log(err);
                else {
                    setTimeout(() => {
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
                    console.log(err)
                }

                else {
                    if (results.length == 0) {
                        if (tentativa < 50000) {
                            setTimeout(() => {
                                this.consultaRetorno(id, tentativa);
                            }, parseInt(1000));
                        }
                    }
                    else {
                        console.log('Salvando resultado na pasta de saida.');
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
                    console.log(err)

                else {
                    console.log('Registro deletado com sucesso.');
                }
                connection.close();
            }
        );
    }

}

module.exports = EnvioBanco;