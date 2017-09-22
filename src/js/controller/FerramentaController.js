const ArquivoBaseModel = require('../model/ArquivoBaseModel.js');
const ConfigModel = require('../model/ConfigModel.js');
const NotasController = require('../controller/NotasController.js');
const fs = require('fs');

let $ = document.querySelector.bind(document);
let configModel;
let value = false;

class FerramentaController{
    static _arquivoBase(model){
        
        ArquivoBaseModel.criarArquivo = model;
    }
    static _ativarGerador(){
        $('#painelGerador').style.display = 'block';
        $('#painelEstatistica').style.display = 'none';
        $('#btnGerador').classList.remove('btnSelected');
        $('#btnGerador').classList.add('btnSelected');
        $('#btnGerador').classList.add('disabled');
        $('#btnEstatisticas').classList.remove('btnSelected');
        $('#btnEstatisticas').classList.remove('disabled');  
    }
    static _ativarEstatisticas(){
        $('#painelGerador').style.display = 'none';
        $('#painelEstatistica').style.display = 'block';
        $('#btnEstatisticas').classList.remove('btnSelected');
        $('#btnEstatisticas').classList.add('btnSelected');
        $('#btnEstatisticas').classList.add('disabled');
        $('#btnGerador').classList.remove('btnSelected');
        $('#btnGerador').classList.remove('disabled');        
    }
    static _validaFormulario(){
        if ($("#serie").value == "") {
            $("#serie").focus();
            $('#notificacao').classList.add("red");
            $('#notificacao').innerHTML = "O campo série está vazio";
        } else if ($("#nomenclatura").value == "") {
            $("#nomenclatura").focus();
            $('#notificacao').classList.add("red");
            $('#notificacao').innerHTML = "O campo nomenclatura está vazio";
        } else if ($("#fuso").value == "") {
            $("#fuso").focus();
            $('#notificacao').classList.add("red");
            $('#notificacao').innerHTML = "O campo fuso está vazio";
        } else if ($("#sleep").value == "") {
            $("#sleep").focus();
            $('#notificacao').classList.add("red");
            $('#notificacao').innerHTML = "O campo sleep está vazio";
        } else if ($("#quantidade").value == "") {
            $("#quantidade").focus();
            $('#notificacao').classList.add("red");
            $('#notificacao').innerHTML = "O campo quantidade está vazio";
        } else if ($("#numero").value == "") {
            $("#numero").focus();
            $('#notificacao').classList.add("red");
            $('#notificacao').innerHTML = "O campo número está vazio";
        } else { value = true; }
        return value;
    }
    static _iniciaConfig(){
        configModel = new ConfigModel();     
    }
    static _gerarNotas(){
        configModel.salvarDados();
        configModel = new ConfigModel();
        configModel.pegarDados()
            .then((dados) => {
                if(fs.existsSync(dados.origem)){
                    this._arquivoBase(dados.origem);
                    NotasController.run();
                    $('#notificacao').innerHTML = "";
                    $('#notificacao').classList.remove("red");
                    let modal = document.getElementById('myModal');
                    //Exibe o modal
                    modal.style.display = "block";                    
                    //fecha ao clicar no botão e para de gerar notas
                    $('#btnCloseModalGerador').onclick = function (event) {
                        NotasController.pararGerarNotas();
                        modal.style.display = "none";
                    };
                    //fecha ao clicar no botão X e para de gerar notas
                    $('#xbtnCloseModalGerador').onclick = function (event) {
                        NotasController.pararGerarNotas();
                        modal.style.display = "none";
                    };
                    //fecha ao clicar fora da página e para de gerar notas
                    window.onclick = function (event) {
                        if (event.target == modal) {
                            NotasController.pararGerarNotas();
                            modal.style.display = "none";
                        }
                    }                    
                }
                else {
                    $('#notificacao').classList.add("red");
                    $('#notificacao').innerHTML = "Não foi possível ler o arquivo de origem";
                    throw new Error('Não foi possível ler o arquivo de origem, o arquivo não existe');
                }                
            }, (erro) => { console.log(erro); }
        );        
        
    }
    static _salvarOrigem(){
        configModel.salvarOrigem();
  
    }
};
module.exports = FerramentaController;