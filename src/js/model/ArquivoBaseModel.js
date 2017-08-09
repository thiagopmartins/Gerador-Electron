const fs = require('fs');
class ArquivoBase{
    static get arquivo(){  
        return this._model;
    }
    static set criarArquivo(model){       
        this._model = model;
        let dir = './data/';
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }       
        let conteudo = fs.readFileSync(this._model, 'utf8');         
        fs.writeFile(dir + 'arquivo.tmp', conteudo, function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("Arquivo temporário criado com sucesso!");
        });      
    }
}
module.exports = ArquivoBase;