const GeradorView = require('../views/GeradorView.js');
const EstatisticasView = require('../views/EstatisticasView.js');
const ArquivoBaseModel = require('../model/ArquivoBaseModel.js');
class FerramentaController{
    constructor(){
        let $ = document.querySelector.bind(document);
        this._elemento = $('#mainPanel');
        this._atualizarGerador();
    }
    _atualizarGerador(){
        let geradorView = new GeradorView(this._elemento);
        geradorView.update();
    }
    _atualizarEstatisticas(){
        let estatisticasView = new EstatisticasView(this._elemento);
        estatisticasView.update();
    }
    _arquivoBase(model){
        ArquivoBaseModel.criarArquivo = model;
    }
    _arquivo(){
        return ArquivoBaseModel.arquivo;
    }
};
module.exports = FerramentaController;