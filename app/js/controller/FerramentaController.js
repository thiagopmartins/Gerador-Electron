const GeradorView = require('../views/GeradorView.js');
const EstatisticasView = require('../views/EstatisticasView.js');
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
};
module.exports = FerramentaController;