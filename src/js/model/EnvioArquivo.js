const fs = require('fs');
const log = require('log4js').getLogger("EnvioArquivo");

class EnvioArquivo {
    constructor(destino, doc, conteudo, encoded){
        try {
            fs.writeFileSync(destino + '\\' + doc, conteudo); 
            log.info(`Inserindo o documento ${doc} no caminho ${destino}:\n ${encoded}`);            
        } catch (error) {
            log.error(error);
            console.log(error);
        }

    }
}

module.exports = EnvioArquivo;