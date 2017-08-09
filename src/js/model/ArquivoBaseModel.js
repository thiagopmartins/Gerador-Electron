const fs = require('fs');
class ArquivoBaseModel{
    static set criarArquivo(model){       
        let dir = './data/';
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }       
        let conteudo = fs.readFileSync(model, 'utf8');         
        fs.writeFile(dir + 'arquivo.tmp', conteudo, function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("Arquivo temporário criado com sucesso!");
        });      
    }
    static set salvarArquivo(conteudo){
        let dir = './data/arquivo.tmp';            
        fs.writeFileSync(dir, conteudo, function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("Arquivo temporário salvo com sucesso");
        });           
    }
}
module.exports = ArquivoBaseModel;