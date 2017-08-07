class EstatisticasView{
    constructor(elemento){
        this._elemento = elemento;
    }
    _template(){
        return `
            <h3>Gerador de Estatísticas </h3>          
        `;
    }
    update(){
        this._elemento.innerHTML = this._template();
    }
}
module.exports = EstatisticasView;