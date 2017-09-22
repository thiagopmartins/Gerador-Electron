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
            let detalhes = document.getElementById('detalhes');
            detalhes.innerHTML = 'gerando notas ' + numNota + '/' + notasModel.quantidade; 
             
            let estimativa = document.getElementById('estimativa');
            estimativa.innerHTML = this.estimativaTempo();

            let nota = notasModel.criarNota(i);
            let notaNumero = parseInt(notasModel.numeroInicio) + i;
            notasModel.criarArquivo(nota,notaNumero);
            setTimeout(() => {
                if(i < notasModel.quantidade - 1){
                    i ++;
                    this.gerarNotas();
                }
                else {
                    this.atualizaFormulario();

                    let modal = document.getElementById('myModal');
                    modal.style.display = "none"; 

                    console.log('Todas as notas foram geradas.');
                }
                    
            }, parseInt(notasModel.sleep));
        }
    }
    static pararGerarNotas(){
        console.log('Parando as notas');
        continua = false;
        this.atualizaFormulario();
    }

    static atualizaFormulario() {
        let ondeParou = parseInt(notasModel.numeroInicio) + i;
        let dadosModel = new DadosModel();
        dadosModel.numero = ondeParou + 1;
    }

    static estimativaTempo() {
        let segundos = (this.inicio - 1) * Main.getSleep() / 1000;
        let data = dataAtual.getTime() + notasModel.quantidade * parseInt(notasModel.sleep);
        data = new Date(data);
        let dia = ("00" + data.getDate()).slice(-2);
        let hora = ("00" + data.getHours()).slice(-2) - dia * 24;
        let minuto =  ("00" + data.getMinutes()).slice(-2);
        let segundos = ("00" + data.getSeconds()).slice(-2);

        if (dia > dataAtual.getDate()) {
        let dia = ("00" + data.getDate()).slice(-2);
            return "Estimativa: " + dia + " dias " + hora + " h " + minuto + " m " + segundos + " s";
        } else if (hora > dataAtual.getHours()) {
            return "Estimativa: " + hora + " h " + minuto + " m " + segundos + " s";
        } else if (minuto > data.getMinutes()) {
            return "Estimativa: " + minuto + " m " + segundos + " s";
        } else {
            return "Estimativa: " + segundos + " s";
        }
        
    }
}
module.exports = NotasController;