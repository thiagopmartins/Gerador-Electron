const config = {
    user: 'nfceuser',
    password: 'm886xDfJ',
    server: 'LGS1-SRV-DB01', 
    database: 'NDD_CONNECTOR_NFCE04',
    
    options: {
        encrypt: true
    },

    connectionString: "Driver={SQL Server Native Client 11.0};Server=LGS1-SRV-DB01\\sql;Database=NDD_CONNECTOR_NFCE04;Uid=nfceuser;Pwd=m886xDfJ;"

}

class ConfigBanco {
    static get configBanco() {
        return config;
    }
}

module.exports = ConfigBanco;