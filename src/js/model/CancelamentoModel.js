const fs = require("fs");
const ConfigBanco = require('../../../data/configBancoCancelamento.js');

let resultado = null;
let espera;
let caminho;
let nomenclatura;
class CancelamentoModel {

    iniciarProcesso(agentId, destino, timeout, finalStatus, type) {
        const config = ConfigBanco.configBanco;
        const sql = require('mssql')
        let id = null;

        new sql.ConnectionPool(config).connect().then(pool => {
            return pool.query`SELECT agentid FROM TBAGENT where agentkey like ${agentId}`
        }).then(result => {
            for (let i = 0; i < result.recordset.length; i++) {
                id = result.recordset[i].agentid;
            }
        })
            .then(() => {
                new sql.ConnectionPool(config).connect().then(pool => {
                    return pool.query`select DOCUMENTKEY1, DOCUMENTKEY2, DOCUMENTKEY3 from TBLOGDOCUMENT where AGENTID like ${id} and FINALSTATUS = ${finalStatus}`
                }).then(result => {

                    resultado = result.recordset;
                    espera = +timeout;
                    caminho = destino;
                    nomenclatura = agentId;
                    this.gerarDocumento(0, type);
                }).catch(err => {
                    console.log(err)
                });
            })
            .catch(err => {
                console.log(err)
            });
    }
    gerarDocumento(doc, type) {
        let i = doc;
        if (i < resultado.length) {
            setTimeout(() => {
                i++;
 
                let documentkey3 = ("00000000" + resultado[doc].DOCUMENTKEY3).slice(-8);
                let content = null;
                let ext;
                
                if(type == 0){
                    content = `0000;CANCINUT;${resultado[doc].DOCUMENTKEY1}${resultado[doc].DOCUMENTKEY2}${documentkey3};Dados incorretos da nota;Dados incorretos da not`;
                    ext = '_ped_can-inu.txt';
                }
                else{
                    content = `0000;3.10;AJUSTE\n1000;${resultado[doc].DOCUMENTKEY1}${resultado[doc].DOCUMENTKEY2}${documentkey3}`;
                    ext = '_ped_ajuste.txt';                                   
                }   
                console.log(resultado[doc]);
                console.log(content);         
                fs.writeFileSync(`${caminho}\\${nomenclatura}#${doc}${ext}`, content); 
                this.gerarDocumento(i,type);
            }, espera);
        }
        else
            console.log('Fim dos processos!!!')
    }    
}

module.exports = CancelamentoModel;