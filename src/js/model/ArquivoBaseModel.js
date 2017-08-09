const fs = require('fs');
class ArquivoBase{
    static get arquivo(){  
        return this._model;
    }
    static set criarArquivo(model){       
        this._model = model;
        let conteudo = fs.readFileSync(this._model, 'utf8'); 
        fs.writeFile("./data/arquivo.temp", conteudo, function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("Arquivo temporário criado com sucesso!");
        });      
    }
}
module.exports = ArquivoBase;