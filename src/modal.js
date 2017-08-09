const ArquivoBaseModel = require('./js/model/ArquivoBaseModel.js');
const fs = require('fs');
let $ = document.querySelector.bind(document);
window.onload = function(){
    let conteudo = fs.readFileSync('./data/arquivo.temp', 'utf8'); 
    $('#textarea1').value = conteudo;
    console.log(conteudo);
};