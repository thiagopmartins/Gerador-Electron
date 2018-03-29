const fs = require('fs');
class ArquivoBaseModel{
    static set criarArquivo(model){       
        let dir = './data/';
        console.log('teste 1');
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        } 
        if (fs.existsSync(model)){
            let conteudo = fs.readFileSync(model, 'utf8');
            fs.writeFileSync(dir + 'arquivo.tmp', conteudo);
            console.log(conteudo);
        } else {
            throw new Error('Pau na budeguinha');
        }
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