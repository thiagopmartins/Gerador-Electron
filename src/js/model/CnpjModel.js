const fs = require("fs");

let data;
class CnpjModal {
  constructor(cnpj, empresa) {
    this.cnpj = cnpj;
    this.empresa = empresa;
  }

  salvarArquivo() {
    const config = {
      user: "sa",
      password: "p@ssw0rd",
      server: "172.31.40.181", // You can use 'localhost\\instance' to connect to named instance
      database: "NDD_CONNECTOR_NFCe",

      options: {
        encrypt: true // Use this if you're on Windows Azure
      },

      connectionString:
        "Driver={SQL Server Native Client 11.0};Server=172.31.40.181\\sql;Database=NDD_CONNECTOR_NFCe;Uid=sa;Pwd=p@ssw0rd;"
    };

    const sql = require("mssql");

    new sql.ConnectionPool(config)
      .connect()
      .then(pool => {
        return pool.query`INSERT into TBCNPJ cnpj, empresa VALUES ($cnpj, $empresa)`;
      })
      .then(result => {
        return "CNPJ salvo com sucesso";
      })
      .catch(err => {
        console.log(err);
      });
  }
}
module.exports = CnpjModal;
