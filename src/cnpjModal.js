const CnpjModel = require('./js/model/CnpjModel.js');
const ConfigBanco = require('../data/configBanco.js');

let cnpjModel;
let $ = document.querySelector.bind(document);

window.onload = function () {
    cnpjModel = new CnpjModel();

    const config = ConfigBanco.configBanco;
    
    const sql = require('mssql')
    
    new sql.ConnectionPool(config).connect().then(pool => {
    return pool.query`select DISTINCT CNPJ, IDENTIFIER from TBCNPJ`
    }).then(result => {
        let jsonResult = JSON.stringify(result);
        let jsonData = JSON.parse(jsonResult);
        let counter = {};
        for (let i = 0; i < jsonData.recordset.length; i++) {
            counter[jsonData.recordset[i].CNPJ] = jsonData.recordset[i].IDENTIFIER;
        }
        counter = JSON.stringify(counter);
        
        let fs = require('fs');
        fs.writeFileSync("cnpjs.json", counter);

    }).catch(err => {
        console.log(err)
    });
};

$('#btnSalvarCnpj').onclick = () => {
    let cnpj = document.getElementById('cnpj').value;
    let empresa = document.getElementById('empresa').value;
    if (cnpj.length >= 14 && empresa.length >= 3) {
        cnpjModel.salvarArquivo(cnpj, empresa);
        document.getElementById('notificacao').style.display = 'block';
        document.getElementById("notificacao").className = "col s8 chip offset-s2 green";
        document.getElementById('notificacao').innerHTML = "Arquivo salvo com sucesso"; 
    } else {
        document.getElementById('notificacao').style.display = 'block';
        document.getElementById("notificacao").className = "col s8 chip offset-s2 red";
        document.getElementById('notificacao').innerHTML = "Erro ao registrar arquivo"; 
    }
};

$('.deleta').each(function(i){
    $('#cnpjPar' + i).click(function(){
        if (confirm('Deseja realmente deletar?')) {
            let cnpj = $('#cnpj' + i).val();
            console.log(cnpj);
        }
    });
});