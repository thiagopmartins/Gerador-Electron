const NotasModel = require('../model/NotasModel.js');
const DadosModel = require('../model/DadosModel.js');

let notasModel;
let i;
let continua;
class NotasController{
    static run(){
        
        notasModel = new NotasModel();
        notasModel.iniciar().then(() => {
            i = 0;
            continua = true;
            this.gerarNotas();
        },
        (error) => {
            console.log(`${error}`);
        });        
    }
    static gerarNotas(){
        if(continua === false){
            clearTimeout();
        }
        else{
            
            let numNota = i + 1;
            console.clear();
            console.log('gerando notas ' + numNota + '/' + notasModel.quantidade); 
            
  
            let nota = notasModel.criarNota(i);
            let notaNumero = parseInt(notasModel.numeroInicio) + i;
            notasModel.criarArquivo(nota,notaNumero);
            setTimeout(() => {
                if(i < notasModel.quantidade - 1){
                    i ++;
                    this.gerarNotas();
                }
                else
                    console.log('Todas as notas foram geradas.')
            }, parseInt(notasModel.sleep));
        }
    }
    static pararGerarNotas(){
        console.log('Parando as notas');
        continua = false;
        let ondeParou = parseInt(notasModel.numeroInicio) + i;
        let dadosModel = new DadosModel();
        dadosModel.numero = ondeParou + 1;
    }
}
module.exports = NotasController;