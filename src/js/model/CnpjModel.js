const fs = require("fs");
const ConfigBanco = require('../../../data/configBanco.js');

let data;
class CnpjModal {

  salvarArquivo(cnpj, empresa) {
    const config = ConfigBanco.configBanco;
    const sql = require("mssql");

    new sql.ConnectionPool(config).connect().then(pool => {
      return pool.query`INSERT into TBCNPJ (CNPJ,IDENTIFIER) VALUES (${cnpj}, ${empresa})`;
    }).then(result => {
      return this.atualizaLista();
    }).catch(err => {
      console.log(err);
      return false;
    });
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

  criaLista() {
    //limpa lista
    document.getElementById('listaCnpj').innerHTML = "";
    
    let data = require('../../../cnpjs.json');
    let i = 0;
    for (let [key, val] of Object.entries(data)) {
      document.getElementById('listaCnpj').innerHTML += "<li class='collection-item id='listaCnpjPar" + i + "''><span>" + val + ' - </span> ' + key + "<div class='secondary-content deleta' id='cnpjPar" + i + "'><i class='material-icons'>delete</i><input type='hidden' name='cnpj" + i + "' id='cnpj" + i + "' value='" + key + "' /></div><div class='secondary-content edit' id='editCnpj'><i class='material-icons'>mode edit</i></div></li>";
      i++;
    }
  }

  deletaCnpj(cnpj) {
    const config = ConfigBanco.configBanco;
    const sql = require("mssql");

    new sql.ConnectionPool(config).connect().then(pool => {
      return pool.query`DELETE from TBCNPJ where CNPJ = ${cnpj}`;
    }).then(result => {
      return this.atualizaLista();
    }).catch(err => {
      console.log(err);
      return false;
    });
  }
}
module.exports = CnpjModal;
