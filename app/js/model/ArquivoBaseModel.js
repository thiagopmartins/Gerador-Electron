class ArquivoBase{
    static get arquivo(){
        return this._model;
    }
    static set criarArquivo(model){
       this._model = model;  
    }
}
module.exports = ArquivoBase;