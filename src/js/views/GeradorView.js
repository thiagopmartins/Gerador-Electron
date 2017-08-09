const fs = require('fs');
class GeradorView{
    constructor(elemento){
        this._elemento = elemento;
    }
    _template(){
        //let html = fs.readFileSync('./views/GeradorView.html', 'utf8');
        return `<form action="#">
  <div class="col s9 center-align">
    <div class="file-field input-field">
      <div class="btn">
        <span>Arquivo Base</span>
        <input type="file" id="arquivo" name="arquivo" />
      </div>
      <div class="file-path-wrapper">
        <input class="file-path " type="text" />
      </div>
    </div>
  </div>
  <div class="col s3 center-align">
    <div class="file-field input-field arquivoBaseModal">
      <a class="modal-trigger" id="btnModal" href="">
        <button class="waves-effect waves-light btn-floating">
          <i class="small material-icons right">assignment</i>
        </button>
        <span>Arquivo Base</span>
      </a>
    </div>
  </div>

  <div class="input-field col s12">
    <input id="destino" type="text" class="validate" value='C:\Program Files\NDDigital\eForms_NFCe\Agent Service'>
    <label class="active" for="destino">Caminho de Destino</label>
  </div>

  <div class="col s12 center-align">
    <div class="row">
      <div class="col s4">
        <div class="left-align mgTop-25">
          <input name="group1" type="radio" id="test1" checked />
          <label for="test1">Normal</label>

          <input name="group1" type="radio" id="test2" />
          <label for="test2">Contingência</label>
        </div>
      </div>
      <div class="range-field col s8">
        <label class="active" for="agentes">Quantidade de Agentes</label>
        <input type="range" id="agentes" min="0" max="50" value="1" />
      </div>
    </div>
  </div>

  <div class="col s12 center-align">
    <div class="row">
      <div class="col s1">
        <a id="btnGerarNovaSerie" class="btn-floating waves-effect waves-light red"><i class="small material-icons">autorenew</i></a>
      </div>
      <div class="input-field col s3">
        <input id="serie" type="text" class="validate" value="" />
        <label id="lblSerie" class="active" for="serie">Serie</label>
      </div>
      <div class="input-field col s3">
        <input id="numero" type="text" class="validate">
        <label class="active" for="numero">Número</label>
      </div>
      <div class="input-field col s3">
        <input id="quantidade" type="text" class="validate">
        <label class="active" for="quantidade">Quantidade de Notas</label>
      </div>
    </div>
  </div>

  <div class="col s12 center-align">
    <div class="row">
      <div class="input-field col s6">
        <input id="nomenclatura" type="text" class="validate">
        <label class="active" for="nomenclatura">Nomenclatura do Arquivo</label>
      </div>
      <div class="input-field col s2">
        <input id="fuso" type="text" class="validate">
        <label class="active" for="fuso">Fuso Horário</label>
      </div>
      <div class="input-field col s2">
        <input id="sleep" type="text" class="validate">
        <label class="active" for="sleep">Sleep (ms)</label>
      </div>
    </div>
  </div>

  <div class="col s12 center-align">
    <div class="row">
      <div class="input-field col s12 right-align">
        <button class="btn waves-effect waves-light" type="submit" name="action">Gerar Notas
          <i class="material-icons right">send</i>
        </button>
      </div>
    </div>
  </div>
</form>`;
    }
    update(){
        this._elemento.innerHTML = this._template();
    }
}
module.exports = GeradorView;