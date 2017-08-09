const FerramentaController = require('./js/controller/FerramentaController.js');
const { ipcRenderer } = require('electron');
const fs = require('fs');
let ferramenta = new FerramentaController();
let $ = document.querySelector.bind(document);
$('#btnGerador').onclick = function(event) {
    event.preventDefault(); 
    ferramenta._atualizarGerador();
    document.getElementById("btnGerador").classList.remove('btnSelected');
    document.getElementById("btnGerador").classList.add('btnSelected');
    document.getElementById("btnEstatisticas").classList.remove('btnSelected');
};

document.getElementById('btnEstatisticas').onclick = function(event){
    event.preventDefault();
    ferramenta._atualizarEstatisticas();
    document.getElementById("btnEstatisticas").classList.remove('btnSelected');
    document.getElementById("btnEstatisticas").classList.add('btnSelected');
    document.getElementById("btnGerador").classList.remove('btnSelected');
};

document.getElementById('btnGerarNovaSerie').onclick = function(event){
    event.preventDefault();
    document.getElementById("serie").value = Math.floor(Math.random() * 900);
    document.getElementById("lblSerie").classList.add('active');
};

document.getElementById('arquivo').onchange = function(event){
    let caminho = document.getElementById("arquivo").files[0].path;
    ferramenta._arquivoBase(caminho);
};
$('#btnModal').onclick = function(event) {
    event.preventDefault();
    ipcRenderer.send('ModalArquivo');
};