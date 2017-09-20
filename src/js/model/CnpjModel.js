const fs = require("fs");
const ConfigBanco = require('../../../data/configBanco.js');

let data;
class CnpjModal {

  //CRUD - CriaLista - AtualizaLista - SalvaArquivo - deletaCnpj

  criaLista() {
    //limpa lista
    let data = require('../../../cnpjs.json');
    let i = 0;
    for (let [key, val] of Object.entries(data)) {
      document.getElementById('listaCnpj').innerHTML += "<li class='collection-item id='listaCnpjPar" + i + "''><span>" + val + ' - </span> ' + key + "<div class='secondary-content deleta' id='cnpjPar" + i + "'><i class='material-icons'>delete</i><input type='hidden' name='cnpj" + i + "' id='cnpj" + i + "' value='" + key + "' /></div><div class='secondary-content edit' id='editCnpjPar" + i + "'><i class='material-icons'>mode edit</i><input type='hidden' name='editCnpj" + i + "' id='editCnpj" + i + "' value='" + key + "' /><input type='hidden' name='editEmpresa" + i + "' id='editEmpresa" + i + "' value='" + val + "' /></div></li>";
      i++;
    }
  }

  atualizaLista() {
    const config = ConfigBanco.configBanco;
    const sql = require('mssql')

    new sql.ConnectionPool(config).connect().then(pool => {
      return pool.query`select DISTINCT CNPJ, IDENTIFIER from TBCNPJ ORDER BY IDENTIFIER`
    }).then(result => {
      let jsonResult = JSON.stringify(result);
      let jsonData = JSON.parse(jsonResult);
      let counter = {};
      for (let i = 0; i < jsonData.recordset.length; i++) {
        counter[jsonData.recordset[i].CNPJ] = jsonData.recordset[i].IDENTIFIER;
      }
      counter = JSON.stringify(counter);
      fs.unlinkSync("cnpjs.json");
      fs.writeFileSync("cnpjs.json", counter);

      this.criaLista();

    }).catch(err => {
      console.log(err)
    });
  }

  editaArquivo(cnpj, empresa, cnpjNovo, empresaNovo) {
    const config = ConfigBanco.configBanco;
    const sql = require("mssql");

    new sql.ConnectionPool(config).connect().then(pool => {
      return pool.query`UPDATE TBCNPJ SET CNPJ = ${cnpjNovo}, IDENTIFIER = ${empresaNovo} WHERE CNPJ = ${cnpj} AND IDENTIFIER = ${empresa}`;
    }).then(result => {
      this.atualizaLista();
      this.reload();
    }).catch(err => {
      console.log(err);
      return false;
    });
  }

  salvarArquivo(cnpj, empresa) {
    const config = ConfigBanco.configBanco;
    const sql = require("mssql");

    new sql.ConnectionPool(config).connect().then(pool => {
      return pool.query`INSERT into TBCNPJ (CNPJ,IDENTIFIER) VALUES (${cnpj}, ${empresa})`;
    }).then(result => {
      this.atualizaLista();
      this.reload();
    }).catch(err => {
      console.log(err);
      return false;
    });
  }

  deletaCnpj(cnpj) {
    const config = ConfigBanco.configBanco;
    const sql = require("mssql");

    new sql.ConnectionPool(config).connect().then(pool => {
      pool.query`DELETE from TBCNPJ where CNPJ = ${cnpj}`;
    }).then(result => {
       this.atualizaLista();
       this.reload();
    }).catch(err => {
      console.log(err);
      return false;
    });
  }

  reload() {
    location.reload();    
  }

}
module.exports = CnpjModal;
