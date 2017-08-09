const FerramentaController = require('./js/controller/FerramentaController.js');
const { ipcRenderer } = require('electron');
const fs = require('fs');


window.onload = function(){
    let $ = document.querySelector.bind(document);
    FerramentaController._ativarGerador();
    FerramentaController._iniciaConfig();
    $('#btnModal').classList.add('disabled'); 
    console.log("Carregando aplicação!!!");
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
    $('#arquivo').onsubmit = function(event){
        let caminho = null;
        try {
            caminho = document.getElementById("arquivo").files[0].path;
            FerramentaController._arquivoBase(caminho);           
        } catch (Exception) {
            console.log(Exception);
        }
    };
    $('#btnModal').onclick = function(event) {
        event.preventDefault();
        ipcRenderer.send('ModalArquivo');
    };    
};
