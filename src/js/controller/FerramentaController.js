const ArquivoBaseModel = require('../model/ArquivoBaseModel.js');
const ConfigModel = require('../model/ConfigModel.js');
let $ = document.querySelector.bind(document);
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
    static _iniciaConfig(){
        new ConfigModel();     
    }
};
module.exports = FerramentaController;