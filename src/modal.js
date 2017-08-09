const ArquivoBaseModel = require('./js/model/ArquivoBaseModel.js');
const fs = require('fs');
let $ = document.querySelector.bind(document);
window.onload = function(){
    let conteudo = fs.readFileSync('./data/arquivo.tmp', 'utf8');
    $('#textarea1').value = conteudo;
    $('#btnSalvarNota').onclick = () => {
        ArquivoBaseModel.salvarArquivo = $('#textarea1').value;
    };
    $('#btnDescartar').onclick = () => {
        $('#textarea1').value = conteudo;
        ArquivoBaseModel.salvarArquivo = conteudo;
    }
};