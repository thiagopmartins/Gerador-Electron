const FerramentaController = require('./js/controller/FerramentaController.js');
const { ipcRenderer } = require('electron');
const fs = require('fs');
const CnpjModel = require('./js/model/CnpjModel.js');

let cnpjModel;

window.onload = function(){
    console.log("Carregando aplicação!!!");
    Materialize.toast('Lista Atualizada!', 3000);
    let emissaoValor = 1;
    let $ = document.querySelector.bind(document);
    let conteudo = "showEmployees";
    FerramentaController._ativarGerador();
    FerramentaController._iniciaConfig();

    //Instancia a classe CnpjModel do arquivo CnpjModel.js em Model
    cnpjModel = new CnpjModel();
    
    //Atualiza o json trazendo a lista de CNPJ  
    cnpjModel.atualizaLista();

    $('#btnModal').classList.add('disabled');  

    $('#btnGerador').onclick = function(event) {
        event.preventDefault(); 
        FerramentaController._ativarGerador();
    };

    $('#btnEstatisticas').onclick = function(event){
        event.preventDefault();
        FerramentaController._ativarEstatisticas();
    };

    $('#btnGerarNovaSerie').onclick = function(event){
        event.preventDefault();
        $('#serie').value = Math.floor(Math.random() * 900) + 1;
        $('#lblSerie').classList.add('active');
    };

    $('#arquivo').onchange = function(event){
        let caminho = null;
        try {
            caminho = document.getElementById("arquivo").files[0].path;
            FerramentaController._arquivoBase(caminho);           
        } catch (Exception) {
            throw(Exception);
        }
    };

    $('#arquivo').onclick = function(event) {
        document.getElementById("arquivo").value = "";
    };

    $('#btnModal').onclick = function(event) {
        event.preventDefault();
        ipcRenderer.send('ModalArquivo');
        FerramentaController._salvarOrigem();
    };

    $('#btnCadastrarCnpj').onclick = function(event) {
        event.preventDefault();
        ipcRenderer.send('ModalCnpj');
    };

    $('#showEmployees').onclick = function(event) {
        event.preventDefault();
        ipcRenderer.send('ModalEmployees');
    };

    $('#gerarNotas').onclick = function(event){
        event.preventDefault();
        FerramentaController._gerarNotas();
    };

    $('#agentes').onchange = event => $('#lblAgentes').innerHTML = 'Quantidade de Agentes: ' + $('#agentes').value;

    $('#btnLimpaFormulario').onclick = function(event) {
        event.preventDefault();
        document.getElementById("painelGerador").reset();
    };

    $('#nomenclatura').oninput = (event) =>{
        if(conteudo == $('#nomenclatura').value){
            $('#menuTopo').style.right = '-190px';
            $('#showEmployees').innerHTML = '<a class="btn-floating btnMenu amber accent-4"><i class="material-icons">people</i></a>'; 
        }  
        else{
            $('#menuTopo').style.right = '-250px'; 
        }    
    };

};
