const ArquivoBaseModel = require('./js/model/ArquivoBaseModel.js');
const fs = require('fs');
let $ = document.querySelector.bind(document);
window.onload = function(){
    let conteudo = fs.readFileSync('./data/arquivo.tmp', 'utf8');
    
    $('#textarea1').value = conteudo;
    $('#btnSalvarNota').onclick = () => {
        ArquivoBaseModel.salvarArquivo = $('#textarea1').value;
        document.getElementById('notificacao').style.transition = 'color 2s ease 2s';
        document.getElementById('notificacao').style.display = 'block';
        document.getElementById('notificacao').innerHTML = "Arquivo salvo com sucesso";
    };
    $('#btnDescartar').onclick = () => {
        $('#textarea1').value = conteudo;
        ArquivoBaseModel.salvarArquivo = conteudo;
        document.getElementById('notificacao').style.transition = 'color 2s ease 2s';
        document.getElementById('notificacao').style.display = 'block';
        document.getElementById('notificacao').innerHTML = "As alterações foram desfeitas";
    }
    $('#btnRestaurar').onclick = () => {
        $('#textarea1').value = conteudo;
        ArquivoBaseModel.salvarArquivo = conteudo;
    }
};