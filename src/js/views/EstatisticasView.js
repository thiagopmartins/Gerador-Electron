const fs = require('fs');
class EstatisticasView{
    constructor(elemento){
        this._elemento = elemento;
    }
    _template(){
        let html = fs.readFileSync('./views/EstatisticaView.html', 'utf8');
        return html;
    }
    update(){
        this._elemento.innerHTML = this._template();
    }
}
module.exports = EstatisticasView;