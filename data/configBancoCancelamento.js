const config = {
    user: 'sa',
    password: 'ndd',
    server: '172.31.249.4', 
    database: 'NDD_CONNECTOR_NFCe_1',
    
    options: {
        encrypt: true
    },

    connectionString: `Driver={SQL Server Native Client 11.0};Server=172.31.249.4\\sql;Database=NDD_CONNECTOR_NFCe_1;Uid=sa;ndd;`

}

class ConfigBanco {
    static get configBanco() {
        return config;
    }
}

module.exports = ConfigBanco;