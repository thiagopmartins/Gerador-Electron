const fs = require('fs');
class EnvioArquivo {
    constructor(destino, caminho, conteudo){
        fs.writeFileSync(destino + '\\' + caminho, conteudo); 
    }
}

module.exports = EnvioArquivo;