const NotasModel = require('../model/NotasModel.js');
const DadosModel = require('../model/DadosModel.js');
const ConfigModel = require('../model/ConfigModel.js');

let notasModel;
let i;
let continua;
let agenteId = 0;
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
             
            let estimativa = document.getElementById('estimativa');
            estimativa.innerHTML = this.estimativaTempo();

            let nota = notasModel.criarNota(i);
            let notaNumero = parseInt(notasModel.numeroInicio) + i;
            let dadosModel = new DadosModel();
            let detalhes = document.getElementById('detalhes');
            detalhes.innerHTML = 'Gerando Notas ' + numNota + '/' + notasModel.quantidade + ' <strong><br>Nota: ' + notaNumero;
            if(agenteId >= dadosModel.agentes)
                agenteId = 1;
            else
                agenteId ++;
            console.log('agente ' + agenteId);
            notasModel.criarArquivo(nota,notaNumero,agenteId);      
            if(i < notasModel.quantidade - 1){
                setTimeout(() => {
                    i ++;
                    this.gerarNotas();
                }, parseInt(notasModel.sleep));
            }
            else {
                this.atualizaFormulario();
                estimativa.innerHTML = 'Todas as notas foram geradas com sucesso!';
                console.log('Todas as notas foram geradas.');
            }
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

        let configModel = new ConfigModel();
        configModel.salvarDados();
    }

    static estimativaTempo() {
        let estimativa = ((notasModel.quantidade - i) * notasModel.sleep) - notasModel.sleep;
        let string;
        let dia, hora, minuto, segundos;
        segundos = Math.floor(estimativa / 1000);
        minuto = Math.floor(segundos / 60);
        segundos = segundos % 60;
        hora = Math.floor(minuto / 60);
        minuto = minuto % 60;
        dia = Math.floor(hora / 24);
        hora = hora % 24;

        if( dia > 0)
            string = `Estimativa: ${dia} dia(s) ${hora} h ${minuto} m ${segundos} s`;
        else if(hora > 0)
            string = `Estimativa: ${hora} h ${minuto} m ${segundos} s`;
        else if(minuto > 0)
            string = `Estimativa: ${minuto} m ${segundos} s`;
        else
            string = `Estimativa: ${segundos} s`;

        return string;
    }
}
module.exports = NotasController;