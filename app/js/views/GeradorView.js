const fs = require('fs');
class GeradorView{
    constructor(elemento){
        this._elemento = elemento;
    }
    _template(){
        let html = fs.readFileSync('./views/GeradorView.html', 'utf8');
        return html;
    }
    update(){
        this._elemento.innerHTML = this._template();
    }
}
module.exports = GeradorView;
