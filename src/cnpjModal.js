const CnpjModel = require('./js/model/CnpjModel.js');

let cnpjModel;
let $ = document.querySelector.bind(document);

window.onload = function(){
    cnpjModel = new CnpjModel();
};

$('#btnSalvarCnpj').onclick = () => {
    let cnpj = document.getElementById('cnpj');
    let empresa = document.getElementById('empresa');
    cnpjModel.salvarArquivo(cnpj, empresa);
    document.getElementById('notificacao').style.display = 'block';
    document.getElementById("notificacao").className = "col s8 chip offset-s2 green";
    document.getElementById('notificacao').innerHTML = "Arquivo salvo com sucesso";
};