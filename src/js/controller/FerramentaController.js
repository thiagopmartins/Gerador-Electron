const ArquivoBaseModel = require('../model/ArquivoBaseModel.js');
const ConfigModel = require('../model/ConfigModel.js');
const EmployeesModel = require('../model/EmployeesModel.js');
let $ = document.querySelector.bind(document);
let configModel;
let employeesModel;
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
        employeesModel = new EmployeesModel();
        employeesModel.funcionarios;

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
    static _iniciaConfig(){
        configModel = new ConfigModel();     
    }
    static _gerarNotas(){
        configModel.salvarDados();
    }
    static _salvarOrigem(){
        configModel.salvarOrigem();
    }
};
module.exports = FerramentaController;