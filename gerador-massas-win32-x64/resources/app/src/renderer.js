const FerramentaController = require('./js/controller/FerramentaController.js');
const NotasController = require('./js/controller/NotasController.js');
const { ipcRenderer } = require('electron');
const fs = require('fs');

let $ = document.querySelector.bind(document);
let cnpjModel;

window.onload = function () {

    console.log("Carregando aplicação!!!");

    //Materialize.toast('Lista Atualizada!', 3000);

    let emissaoValor = 1;

    let conteudo = "showEmployees";
    FerramentaController._ativarGerador();
    FerramentaController._iniciaConfig();

    $('#btnGerador').onclick = function (event) {
        event.preventDefault();
        FerramentaController._ativarGerador();
    };

    $('#btnEstatisticas').onclick = function (event) {
        event.preventDefault();
        FerramentaController._ativarEstatisticas();
    };

    $('#btnServicos').onclick = function (event) {
        event.preventDefault();
        FerramentaController._ativarServicos();
    };

    $('#btnGerarNovaSerie').onclick = function (event) {
        event.preventDefault();
        $('#serie').value = Math.floor(Math.random() * 900) + 1;
        $('#lblSerie').classList.add('active');
    };

    $('#arquivo').onchange = function (event) {
        let caminho = null;
        try {
            caminho = document.getElementById("arquivo").files[0].path;
            FerramentaController._arquivoBase(caminho);
            //grava arquivo vindo do campo #arquivo
            FerramentaController._salvarOrigem();
        } catch (Exception) {
            throw (Exception);
        }
    };

    $('#btnModal').onclick = function (event) {
        event.preventDefault();
        ipcRenderer.send('ModalArquivo');
    };

    $('#btnCadastrarCnpj').onclick = function (event) {
        event.preventDefault();
        ipcRenderer.send('ModalCnpj');
    };

    $('#showEmployees').onclick = function (event) {
        event.preventDefault();
        ipcRenderer.send('ModalEmployees');
    };

    $('#agentes').onchange = event => $('#lblAgentes').innerHTML = 'Quantidade de Agentes: ' + $('#agentes').value;

    $('#CNPJ').onchange = event => { 
        FerramentaController._salvarDados();
        FerramentaController._registraIe($('#CNPJ').value);
    }
    
    $('#btnLimpaFormulario').onclick = function (event) {
        event.preventDefault();
        document.getElementById("painelGerador").reset();
    };

    $('#nomenclatura').oninput = (event) => {
        //regra
        if (conteudo == $('#nomenclatura').value) {
            $('#menuTopo').style.right = '-130px';
            $('#showEmployees').innerHTML = '<a class="btn-floating btnMenu amber accent-4"><i class="material-icons">people</i></a>';
        }
        else {
            $('#menuTopo').style.right = '-186px';
        }
    };

    $('#gerarNotas').onclick = function (event) {
        let verificaValidacao = FerramentaController._validaFormulario();
        if (verificaValidacao == true) {
            //Chama o método para gerar Notas
            FerramentaController._gerarNotas();
        } 

        event.preventDefault();
    }

    //PAINEL SERVIÇOS
/*
    $('#paraService').onclick = function (event) {
        let child = require('child_process').exec('net stop NDDigitalAgentService_1', function (error, stdout, stderr) {
            if (error !== null) {
                console.log('exec error: ' + error);
            }
        });

        event.preventDefault();
    }
*/

    $('#agente').onchange = function (event) {
        if ($("#concentrador").checked == true) {
            $("#contadorAgente").disabled = true;
            $('#divQtdAgente').classList.add('disabled');
            console.log("O campo quantidade de agentes desativado");
        } else {
            $("#contadorAgente").disabled = false;
            $('#divQtdAgente').classList.remove('disabled');            
            console.log("O campo quantidade de agentes foi reativado");
        }
        event.preventDefault();
    }

    $('#concentrador').onchange = function (event) {
        if ($("#concentrador").checked == true) {
            $("#contadorAgente").disabled = true;
            $('#divQtdAgente').classList.add('disabled');
            console.log("O campo quantidade de agentes desativado");
        } else {
            $("#contadorAgente").disabled = false;
            $('#divQtdAgente').classList.remove('disabled');                        
            console.log("O campo quantidade de agentes foi reativado");
        }
        event.preventDefault();
    }

    
};