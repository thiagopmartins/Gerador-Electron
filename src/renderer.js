const FerramentaController = require('./js/controller/FerramentaController.js');
const { ipcRenderer } = require('electron');
const fs = require('fs');

window.onload = function(){
    console.log("Carregando aplicação!!!");
    Materialize.toast('Lista Atualizada!', 3000);
    let emissaoValor = 1;
    let $ = document.querySelector.bind(document);
    let conteudo = "showEmployees";
    FerramentaController._ativarGerador();
    FerramentaController._iniciaConfig();

    $('#btnModal').classList.add('disabled');  

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
        let caminho = null;
        try {
            caminho = document.getElementById("arquivo").files[0].path;
            FerramentaController._arquivoBase(caminho);           
        } catch (Exception) {
            throw(Exception);
        }
    };

    $('#arquivo').onclick = function(event) {
        document.getElementById("arquivo").value = "";
    };

    $('#btnModal').onclick = function(event) {
        event.preventDefault();
        ipcRenderer.send('ModalArquivo');
        FerramentaController._salvarOrigem();
    };

    $('#btnCadastrarCnpj').onclick = function(event) {
        event.preventDefault();
        ipcRenderer.send('ModalCnpj');
    };

    $('#showEmployees').onclick = function(event) {
        event.preventDefault();
        ipcRenderer.send('ModalEmployees');
    };

    $('#gerarNotas').onclick = function(event){
        event.preventDefault();
        FerramentaController._gerarNotas();
    };

    $('#agentes').onchange = event => $('#lblAgentes').innerHTML = 'Quantidade de Agentes: ' + $('#agentes').value;

    $('#btnLimpaFormulario').onclick = function(event) {
        event.preventDefault();
        document.getElementById("painelGerador").reset();
    };

    $('#nomenclatura').oninput = (event) =>{
        if(conteudo == $('#nomenclatura').value){
            $('#menuTopo').style.right = '-190px';
            $('#showEmployees').innerHTML = '<a class="btn-floating btnMenu amber accent-4"><i class="material-icons">people</i></a>'; 
        }  
        else{
            $('#menuTopo').style.right = '-250px'; 
        }    
    };

    const config = {
        user: 'sa',
        password: 'p@ssw0rd',
        server: '172.31.40.181', // You can use 'localhost\\instance' to connect to named instance 
        database: 'NDD_CONNECTOR_NFCe',
        
        options: {
            encrypt: true // Use this if you're on Windows Azure 
        },

        connectionString: "Driver={SQL Server Native Client 11.0};Server=172.31.40.181\\sql;Database=NDD_CONNECTOR_NFCe;Uid=sa;Pwd=p@ssw0rd;"
    
    }

    const sql = require('mssql')
    
    new sql.ConnectionPool(config).connect().then(pool => {
    return pool.query`select DISTINCT st.cnpj, qr.identifier from tbstore as st INNER JOIN TBQRCODE as qr ON qr.id = st.QRCODEID`
    }).then(result => {
        let jsonResult = JSON.stringify(result);
        let jsonData = JSON.parse(jsonResult);
        let counter = {};
        for (let i = 0; i < jsonData.recordset.length; i++) {
        if (jsonData.recordset[i].cnpj.length === 13) {
            jsonData.recordset[i].cnpj = '0' + jsonData.recordset[i].cnpj;
        } else if (jsonData.recordset[i].cnpj.length === 12) {
            jsonData.recordset[i].cnpj = '00' + jsonData.recordset[i].cnpj;
        } 
        counter[jsonData.recordset[i].cnpj] = jsonData.recordset[i].identifier;
        }
        counter = JSON.stringify(counter);
        let fs = require('fs');
        fs.writeFileSync("cnpjs.json", counter);

    }).catch(err => {
    console.log(err)
    });
};
