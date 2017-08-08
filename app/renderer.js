const FerramentaController = require('./js/controller/FerramentaController.js');
const fs = require('fs');
let ferramenta = new FerramentaController();
document.getElementById('btnGerador').onclick = function(event) {
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
    var caminho = document.getElementById("arquivo").files[0].path;
    let conteudo = fs.readFileSync(caminho, 'utf8');
    let caminhoModal = fs.readFileSync('./modal/arquivoBaseModal.html', 'utf8');
    document.getElementById("appendArquivoBaseModal").innerHTML = caminhoModal;
};