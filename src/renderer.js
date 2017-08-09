const FerramentaController = require('./js/controller/FerramentaController.js');
const { ipcRenderer } = require('electron');
const fs = require('fs');


window.onload = function(){
    let $ = document.querySelector.bind(document);
    FerramentaController._ativarGerador();
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

    $('#arquivo').onchange = function(event){
        let caminho = document.getElementById("arquivo").files[0].path;
        FerramentaController._arquivoBase(caminho);
    };
    $('#btnModal').onclick = function(event) {
        event.preventDefault();
        ipcRenderer.send('ModalArquivo');
    };    
};
