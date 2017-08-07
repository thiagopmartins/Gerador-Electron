class GeradorView{
    constructor(elemento){
        this._elemento = elemento;
    }
    _template(){
        return `
           <div class="col s12 center-align">
            <form action="#">
              <div class="file-field input-field">
                <div class="btn">
                  <span>Origem</span>
                  <input type="file">
                </div>
                <div class="file-path-wrapper">
                  <input class="file-path validate" type="text">
                </div>
              </div>
            </form>
          </div>
          <div class="col s12 center-align">
            <form action="#">
              <div class="file-field input-field">
                <div class="btn">
                  <span>Destino</span>
                  <input type="file">
                </div>
                <div class="file-path-wrapper">
                  <input class="file-path validate" type="text">
                </div>
              </div>
            </form>
          </div>             
        `;
    }
    update(){
        this._elemento.innerHTML = this._template();
    }
}
module.exports = GeradorView;
