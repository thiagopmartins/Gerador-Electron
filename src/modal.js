const ArquivoBaseModel = require('./js/model/ArquivoBaseModel.js');
const ConfigModel = require('./js/model/ConfigModel.js');
const fs = require('fs');
let $ = document.querySelector.bind(document);
let conteudo
window.onload = function(){
    let configModel = new ConfigModel();
    conteudo = fs.readFileSync('./data/arquivo.tmp', 'utf8');
    $('#textarea1').value = conteudo;
};
$('#btnSalvarNota').onclick = () => {
    ArquivoBaseModel.salvarArquivo = $('#textarea1').value;
    document.getElementById('notificacao').style.transition = 'color 2s ease 2s';
    document.getElementById('notificacao').style.display = 'block';
    document.getElementById('notificacao').innerHTML = "Arquivo salvo com sucesso";
};
$('#textarea1').oninput = () =>{
    if(conteudo == $('#textarea1').value){
        $('#btnDescartar').classList.add('disabled'); 
        console.log("igual"); 
    }  
    else{
       $('#btnDescartar').classList.remove('disabled'); 
        console.log("diferente"); 
    }
    console.log(conteudo); 
    console.log($('#textarea1').value); 
    
};
$('#btnDescartar').onclick = () => {
    $('#textarea1').value = conteudo;
    ArquivoBaseModel.salvarArquivo = conteudo;
    document.getElementById('notificacao').style.transition = 'color 2s ease 2s';
    document.getElementById('notificacao').style.display = 'block';
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
            document.getElementById('notificacao').style.transition = 'color 2s ease 2s';
            document.getElementById('notificacao').style.display = 'block';
            document.getElementById('notificacao').innerHTML = "Arquivo restaurado com sucesso";            
        },(erro) =>{ console.log(erro); }
     );        
}