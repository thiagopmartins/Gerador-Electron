const jsonfile = require('jsonfile-promised');
const fs = require('fs');
let dir = './data/';
let filename = 'config.json';
class ConfigModel{
    constructor(){
        console.log("adasdsa");
        if (!fs.existsSync(dir))
            fs.mkdirSync(dir);
        if(!fs.existsSync(dir + filename)) 
            this.criarConfig();
        this.salvarDados();   
    }
    criarConfig(){
        return jsonfile.writeFile(dir + filename,{})
                .then(() => {
                    console.log('Arquivo Criado')
                }).catch((err) => {
                    console.log(err);
            });        
    }
    salvarDados(){
        let dados = {
            origem: "teste",
            iniciar: 20012
        }
        jsonfile.writeFile(dir + filename,dados, {spaces: 2})
                .then(() => {
                    console.log('Dado salvo com sucesso');
                }).catch((err) => {
                    console.log(err);
                })        
    }    
}
module.exports = ConfigModel;