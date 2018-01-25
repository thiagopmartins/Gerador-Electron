const ArquivoBaseModel = require('./js/model/ArquivoBaseModel.js');
const ConfigModel = require('./js/model/ConfigModel.js');
const fs = require('fs');
let $ = document.querySelector.bind(document);
let conteudo;
let configModel = new ConfigModel();

window.onload = function(){
    configModel.pegarDados()
        .then((dados) => {
            try {
                conteudo = fs.readFileSync('./data/arquivo.tmp', 'utf8');
                $('#textarea1').value = conteudo; 
            } catch (error) {
                ArquivoBaseModel.criarArquivo = dados.origem;
                conteudo = fs.readFileSync('./data/arquivo.tmp', 'utf8');
                $('#textarea1').value = conteudo; 
                console.log("Arquivo .tmp não encontrado. Gerando novo arquivo com base na URL de origem" + error);
            }
        },(erro) =>{ console.log(erro); }
     );
};
$('#textarea1').oninput = () =>{
    if(conteudo == $('#textarea1').value){
        $('#btnDescartar').classList.add('disabled'); 
    }  
    else{
       $('#btnDescartar').classList.remove('disabled'); 
    }    
};
$('#btnSalvarNota').onclick = () => {
    ArquivoBaseModel.salvarArquivo = $('#textarea1').value;
    document.getElementById('notificacao').style.display = 'block';
    document.getElementById("notificacao").className = "col s8 chip offset-s2 green";
    document.getElementById('notificacao').innerHTML = "Arquivo salvo com sucesso";
};
$('#btnDescartar').onclick = () => {
    $('#textarea1').value = conteudo;
    ArquivoBaseModel.salvarArquivo = conteudo;
    document.getElementById('notificacao').style.display = 'block';
    document.getElementById("notificacao").className = "col s8 chip offset-s2 red";
    document.getElementById('notificacao').innerHTML = "As alterações foram desfeitas";
}
$('#btnRestaurar').onclick = () => {
    let conteudoOrigem;
    let configModel = new ConfigModel();
    configModel.pegarDados()
        .then((dados) => {
            conteudoOrigem = fs.readFileSync(dados.origem, 'utf8');  
            console.log(conteudoOrigem); 
            $('#textarea1').value = conteudoOrigem;
            ArquivoBaseModel.salvarArquivo = conteudoOrigem;
            document.getElementById('notificacao').style.display = 'block';
            document.getElementById("notificacao").className = "col s8 chip offset-s2 yellow";
            document.getElementById('notificacao').innerHTML = "Arquivo restaurado com sucesso";            
        },(erro) =>{ console.log(erro); }
     );        
}