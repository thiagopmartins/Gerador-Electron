const fs = require("fs");
const ConfigBanco = require('../../../data/configBanco.js');

let data;
class CnpjModal {

  salvarArquivo(cnpj, empresa) {

    const config = ConfigBanco.configBanco;

    const sql = require("mssql");

    new sql.ConnectionPool(config)
      .connect()
      .then(pool => {
        pool.query`INSERT into TBCNPJ (CNPJ,IDENTIFIER) VALUES (${cnpj}, ${empresa})`;

        return pool.query`select DISTINCT CNPJ, IDENTIFIER from TBCNPJ`
      }).then(result => {
        let jsonResult = JSON.stringify(result);
        let jsonData = JSON.parse(jsonResult);
        let counter = {};
        for (let i = 0; i < jsonData.recordset.length; i++) {
            counter[jsonData.recordset[i].CNPJ] = jsonData.recordset[i].IDENTIFIER;
        }
        counter = JSON.stringify(counter);
        
        let fs = require('fs');
        fs.writeFileSync("cnpjs.json", counter); 

        location.reload();
      })
      .catch(err => {
        console.log(err);
        return false;
      });
  }
}
module.exports = CnpjModal;
