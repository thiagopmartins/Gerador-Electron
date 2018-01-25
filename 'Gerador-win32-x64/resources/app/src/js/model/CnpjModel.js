const fs = require("fs");
const ConfigBanco = require('../../../data/configBanco.js');

let data;
class CnpjModel {

  //CRUD - CriaLista - AtualizaLista - SalvaArquivo - deletaCnpj

  criaLista() {
    const config = ConfigBanco.configBanco;
    const sql = require('mssql')

    new sql.ConnectionPool(config).connect().then(pool => {
      return pool.query`select DISTINCT CNPJ, IE, IDENTIFIER from TBCNPJ ORDER BY IDENTIFIER`
    }).then(result => {     
      for (let i = 0; i < result.recordset.length; i++) {
        document.getElementById('listaCnpj').innerHTML += "<li class='collection-item id='listaCnpjPar" + i + "''><span>" + result.recordset[i].IDENTIFIER + '</span> -- CNPJ:' + result.recordset[i].CNPJ + ' -- IE:' + result.recordset[i].IE + "<div class='secondary-content deleta' id='cnpjPar" + i + "'><i class='material-icons'>delete</i><input type='hidden' name='cnpj" + i + "' id='cnpj" + i + "' value='" + result.recordset[i].CNPJ + "' /></div><div class='secondary-content edit' id='editCnpjPar" + i + "'><i class='material-icons'>mode edit</i><input type='hidden' name='editCnpj" + i + "' id='editCnpj" + i + "' value='" + result.recordset[i].CNPJ + "' /><input type='hidden' name='editIe" + i + "' id='editIe" + i + "' value='" + result.recordset[i].IE + "' /><input type='hidden' name='editEmpresa" + i + "' id='editEmpresa" + i + "' value='" + result.recordset[i].IDENTIFIER + "' /></div></li>";
      }
    }).catch(err => {
      console.log(err)
    });
  }

  atualizaLista() {
    const config = ConfigBanco.configBanco;
    const sql = require('mssql')

    new sql.ConnectionPool(config).connect().then(pool => {
      return pool.query`select DISTINCT CNPJ, IE, IDENTIFIER from TBCNPJ ORDER BY IDENTIFIER`
    }).then(result => {     
      let jsonResult = JSON.stringify(result);
      let jsonData = JSON.parse(jsonResult);
      let counter = {};
      for (let i = 0; i < jsonData.recordset.length; i++) 
        counter[jsonData.recordset[i].CNPJ] = jsonData.recordset[i].IDENTIFIER;
      
      counter = JSON.stringify(counter);
      fs.unlinkSync("cnpjs.json");
      fs.writeFileSync("cnpjs.json", counter);

      this.criaLista();
    }).catch(err => {
      console.log(err)
    });
  }

  editaArquivo(cnpj, empresa, cnpjNovo, ieNovo, empresaNovo) {
    const config = ConfigBanco.configBanco;
    const sql = require("mssql");

    new sql.ConnectionPool(config).connect().then(pool => {
      return pool.query`UPDATE TBCNPJ SET CNPJ = ${cnpjNovo}, IE = ${ieNovo}, IDENTIFIER = ${empresaNovo} WHERE CNPJ = ${cnpj} AND IDENTIFIER = ${empresa}`;
    }).then(result => {
      this.atualizaLista();
      this.reload();
    }).catch(err => {
      console.log(err);
      return false;
    });
  }

  salvarArquivo(cnpj, ie, empresa) {
    const config = ConfigBanco.configBanco;
    const sql = require("mssql");

    new sql.ConnectionPool(config).connect().then(pool => {
      return pool.query`INSERT into TBCNPJ (CNPJ,IE, IDENTIFIER) VALUES (${cnpj}, ${ie}, ${empresa})`;
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

  retornaDados(cnpj) {
    const config = ConfigBanco.configBanco;
    const sql = require('mssql')

    return new Promise((resolve, reject) => {
      new sql.ConnectionPool(config).connect().then(pool => {
        return pool.query`select IE from TBCNPJ WHERE CNPJ = ${cnpj}`;
      }).then(result => {     
        return resolve(result.recordset);
      }).catch(err => {
        console.log(err)
      });
    });   
  }

  reload() {location.reload();}

}
module.exports = CnpjModel;
