const FerramentaController = require('./js/controller/FerramentaController.js');
const ServicosController = require('./js/controller/ServicosController.js');
const EstatisticaController = require('./js/controller/EstatisticaController.js');
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

    $('#btnConfiguracoes').onclick = function (event) {
        event.preventDefault();
        FerramentaController._ativarConfiguracoes();
    };

    $('#salvarConfiguracoes').onclick = function (event) {
        event.preventDefault();
        FerramentaController._salvarDados();
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

    $('#gerarNotas').onclick = function (event) {/*
        let verificaValidacao = FerramentaController._validaFormulario();
        if (verificaValidacao == true) {
            //Chama o método para gerar Notas
            FerramentaController._gerarNotas();
        } 
        
        event.preventDefault();*/
        let teste = (`NDDDDL1000001001#300025_ped_env.txt_TCPMSG;0000;3.10;ENVIO
        1000;1391789343357
        2000;3.10;
        2100;52;80705095;VENDA DE MERCADORIA ADQUIRIDA OU RECEB.DE TERCEIRO;0;65;666;400025;2018-01-24T17:32:29-02:00;;1;1;5208707;4;1;6;2;1;1;1;0;NDDigital NFe 4.3.0
        2200;47508411022559;EMITENTE DA NFC-E;EMITENTE DA NFC-E;103495665;;;;3
        2210;RUA TESTE NFCE;17171;;BAIRRO: TESTE NFCE;5208707;GOIANIA;GO;74150030;1058;BRASIL;32518000
        2300;00608199010;NF-E EMITIDA EM AMBIENTE DE HOMOLOGACAO - SEM VALOR FISCAL;9;;;;
        2310;SeRGIO JUNGBLUT DIETERICH;838;;Sarandi;5208707;GOIANIA;GO;91060410;1058;BRASIL;5192730141
        2400;47508411022559;Av. Assis Brasil;5577;;SARANDI;5208707;GOIANIA;GO
        2500;00608199010;SeRGIO JUNGBLUT DIETERICH;838;;Sarandi;5208707;GOIANIA;GO
        3000;030417003 AMARELO;9788578385460;FITA ISOLANTE P22 19X20 COLOR PIREL;63071000;;1234567;;5405;PC;1.0000;51.6000000000;51.60;9788578385460;PC;1.0000;51.6000000000;;;;;1;;;
        3090;19.95
        3120;0;60;0.00;0.00
        3200;01;51.60;1.65;0.85
        3300;01;51.60;7.60;3.92
        3600;Endereco: 00-00-00-000
        3000;030417003 AMARELO;9788578385460;FITA ISOLANTE P22 19X20 COLOR PIREL;63071000;;1234567;;5405;PC;1.0000;51.6000000000;51.60;9788578385460;PC;1.0000;51.6000000000;;;;;1;;;
        3090;19.95
        3120;0;60;0.00;0.00
        3200;01;51.60;1.65;0.85
        3300;01;51.60;7.60;3.92
        3600;Endereco: 00-00-00-000
        3000;030417003 AMARELO;9788578385460;FITA ISOLANTE P22 19X20 COLOR PIREL;63071000;;1234567;;5405;PC;1.0000;51.6000000000;51.60;9788578385460;PC;1.0000;51.6000000000;;;;;1;;;
        3090;19.95
        3120;0;60;0.00;0.00
        3200;01;51.60;1.65;0.85
        3300;01;51.60;7.60;3.92
        3600;Endereco: 00-00-00-000
        3000;030417003 AMARELO;9788578385460;FITA ISOLANTE P22 19X20 COLOR PIREL;63071000;;1234567;;5405;PC;1.0000;51.6000000000;51.60;9788578385460;PC;1.0000;51.6000000000;;;;;1;;;
        3090;19.95
        3120;0;60;0.00;0.00
        3200;01;51.60;1.65;0.85
        3300;01;51.60;7.60;3.92
        3600;Endereco: 00-00-00-000
        3000;030417003 AMARELO;9788578385460;FITA ISOLANTE P22 19X20 COLOR PIREL;63071000;;1234567;;5405;PC;1.0000;51.6000000000;51.60;9788578385460;PC;1.0000;51.6000000000;;;;;1;;;
        3090;19.95
        3120;0;60;0.00;0.00
        3200;01;51.60;1.65;0.85
        3300;01;51.60;7.60;3.92
        3600;Endereco: 00-00-00-000
        3000;030417003 AMARELO;9788578385460;FITA ISOLANTE P22 19X20 COLOR PIREL;63071000;;1234567;;5405;PC;1.0000;51.6000000000;51.60;9788578385460;PC;1.0000;51.6000000000;;;;;1;;;
        3090;19.95
        3120;0;60;0.00;0.00
        3200;01;51.60;1.65;0.85
        3300;01;51.60;7.60;3.92
        3600;Endereco: 00-00-00-000
        3000;030417003 AMARELO;9788578385460;FITA ISOLANTE P22 19X20 COLOR PIREL;63071000;;1234567;;5405;PC;1.0000;51.6000000000;51.60;9788578385460;PC;1.0000;51.6000000000;;;;;1;;;
        3090;19.95
        3120;0;60;0.00;0.00
        3200;01;51.60;1.65;0.85
        3300;01;51.60;7.60;3.92
        3600;Endereco: 00-00-00-000
        3000;030417003 AMARELO;9788578385460;FITA ISOLANTE P22 19X20 COLOR PIREL;63071000;;1234567;;5405;PC;1.0000;51.6000000000;51.60;9788578385460;PC;1.0000;51.6000000000;;;;;1;;;
        3090;19.95
        3120;0;60;0.00;0.00
        3200;01;51.60;1.65;0.85
        3300;01;51.60;7.60;3.92
        3600;Endereco: 00-00-00-000
        3000;030417003 AMARELO;9788578385460;FITA ISOLANTE P22 19X20 COLOR PIREL;63071000;;1234567;;5405;PC;1.0000;51.6000000000;51.60;9788578385460;PC;1.0000;51.6000000000;;;;;1;;;
        3090;19.95
        3120;0;60;0.00;0.00
        3200;01;51.60;1.65;0.85
        3300;01;51.60;7.60;3.92
        3600;Endereco: 00-00-00-000
        3000;030417003 AMARELO;9788578385460;FITA ISOLANTE P22 19X20 COLOR PIREL;63071000;;1234567;;5405;PC;1.0000;51.6000000000;51.60;9788578385460;PC;1.0000;51.6000000000;;;;;1;;;
        3090;19.95
        3120;0;60;0.00;0.00
        3200;01;51.60;1.65;0.85
        3300;01;51.60;7.60;3.92
        3600;Endereco: 00-00-00-000
        3000;030417003 AMARELO;9788578385460;FITA ISOLANTE P22 19X20 COLOR PIREL;63071000;;1234567;;5405;PC;1.0000;51.6000000000;51.60;9788578385460;PC;1.0000;51.6000000000;;;;;1;;;
        3090;19.95
        3120;0;60;0.00;0.00
        3200;01;51.60;1.65;0.85
        3300;01;51.60;7.60;3.92
        3600;Endereco: 00-00-00-000
        3000;030417003 AMARELO;9788578385460;FITA ISOLANTE P22 19X20 COLOR PIREL;63071000;;1234567;;5405;PC;1.0000;51.6000000000;51.60;9788578385460;PC;1.0000;51.6000000000;;;;;1;;;
        3090;19.95
        3120;0;60;0.00;0.00
        3200;01;51.60;1.65;0.85
        3300;01;51.60;7.60;3.92
        3600;Endereco: 00-00-00-000
        3000;030417003 AMARELO;9788578385460;FITA ISOLANTE P22 19X20 COLOR PIREL;63071000;;1234567;;5405;PC;1.0000;51.6000000000;51.60;9788578385460;PC;1.0000;51.6000000000;;;;;1;;;
        3090;19.95
        3120;0;60;0.00;0.00
        3200;01;51.60;1.65;0.85
        3300;01;51.60;7.60;3.92
        3600;Endereco: 00-00-00-000
        3000;030417003 AMARELO;9788578385460;FITA ISOLANTE P22 19X20 COLOR PIREL;63071000;;1234567;;5405;PC;1.0000;51.6000000000;51.60;9788578385460;PC;1.0000;51.6000000000;;;;;1;;;
        3090;19.95
        3120;0;60;0.00;0.00
        3200;01;51.60;1.65;0.85
        3300;01;51.60;7.60;3.92
        3600;Endereco: 00-00-00-000
        3000;030417003 AMARELO;9788578385460;FITA ISOLANTE P22 19X20 COLOR PIREL;63071000;;1234567;;5405;PC;1.0000;51.6000000000;51.60;9788578385460;PC;1.0000;51.6000000000;;;;;1;;;
        3090;19.95
        3120;0;60;0.00;0.00
        3200;01;51.60;1.65;0.85
        3300;01;51.60;7.60;3.92
        3600;Endereco: 00-00-00-000
        3000;030417003 AMARELO;9788578385460;FITA ISOLANTE P22 19X20 COLOR PIREL;63071000;;1234567;;5405;PC;1.0000;51.6000000000;51.60;9788578385460;PC;1.0000;51.6000000000;;;;;1;;;
        3090;19.95
        3120;0;60;0.00;0.00
        3200;01;51.60;1.65;0.85
        3300;01;51.60;7.60;3.92
        3600;Endereco: 00-00-00-000
        3000;030417003 AMARELO;9788578385460;FITA ISOLANTE P22 19X20 COLOR PIREL;63071000;;1234567;;5405;PC;1.0000;51.6000000000;51.60;9788578385460;PC;1.0000;51.6000000000;;;;;1;;;
        3090;19.95
        3120;0;60;0.00;0.00
        3200;01;51.60;1.65;0.85
        3300;01;51.60;7.60;3.92
        3600;Endereco: 00-00-00-000
        3000;030417003 AMARELO;9788578385460;FITA ISOLANTE P22 19X20 COLOR PIREL;63071000;;1234567;;5405;PC;1.0000;51.6000000000;51.60;9788578385460;PC;1.0000;51.6000000000;;;;;1;;;
        3090;19.95
        3120;0;60;0.00;0.00
        3200;01;51.60;1.65;0.85
        3300;01;51.60;7.60;3.92
        3600;Endereco: 00-00-00-000
        3000;030417003 AMARELO;9788578385460;FITA ISOLANTE P22 19X20 COLOR PIREL;63071000;;1234567;;5405;PC;1.0000;51.6000000000;51.60;9788578385460;PC;1.0000;51.6000000000;;;;;1;;;
        3090;19.95
        3120;0;60;0.00;0.00
        3200;01;51.60;1.65;0.85
        3300;01;51.60;7.60;3.92
        3600;Endereco: 00-00-00-000
        3000;030417003 AMARELO;9788578385460;FITA ISOLANTE P22 19X20 COLOR PIREL;63071000;;1234567;;5405;PC;1.0000;51.6000000000;51.60;9788578385460;PC;1.0000;51.6000000000;;;;;1;;;
        3090;19.95
        3120;0;60;0.00;0.00
        3200;01;51.60;1.65;0.85
        3300;01;51.60;7.60;3.92
        3600;Endereco: 00-00-00-000
        3000;030417003 AMARELO;9788578385460;FITA ISOLANTE P22 19X20 COLOR PIREL;63071000;;1234567;;5405;PC;1.0000;51.6000000000;51.60;9788578385460;PC;1.0000;51.6000000000;;;;;1;;;
        3090;19.95
        3120;0;60;0.00;0.00
        3200;01;51.60;1.65;0.85
        3300;01;51.60;7.60;3.92
        3600;Endereco: 00-00-00-000
        3000;030417003 AMARELO;9788578385460;FITA ISOLANTE P22 19X20 COLOR PIREL;63071000;;1234567;;5405;PC;1.0000;51.6000000000;51.60;9788578385460;PC;1.0000;51.6000000000;;;;;1;;;
        3090;19.95
        3120;0;60;0.00;0.00
        3200;01;51.60;1.65;0.85
        3300;01;51.60;7.60;3.92
        3600;Endereco: 00-00-00-000
        3000;030417003 AMARELO;9788578385460;FITA ISOLANTE P22 19X20 COLOR PIREL;63071000;;1234567;;5405;PC;1.0000;51.6000000000;51.60;9788578385460;PC;1.0000;51.6000000000;;;;;1;;;
        3090;19.95
        3120;0;60;0.00;0.00
        3200;01;51.60;1.65;0.85
        3300;01;51.60;7.60;3.92
        3600;Endereco: 00-00-00-000
        3000;030417003 AMARELO;9788578385460;FITA ISOLANTE P22 19X20 COLOR PIREL;63071000;;1234567;;5405;PC;1.0000;51.6000000000;51.60;9788578385460;PC;1.0000;51.6000000000;;;;;1;;;
        3090;19.95
        3120;0;60;0.00;0.00
        3200;01;51.60;1.65;0.85
        3300;01;51.60;7.60;3.92
        3600;Endereco: 00-00-00-000
        3000;030417003 AMARELO;9788578385460;FITA ISOLANTE P22 19X20 COLOR PIREL;63071000;;1234567;;5405;PC;1.0000;51.6000000000;51.60;9788578385460;PC;1.0000;51.6000000000;;;;;1;;;
        3090;19.95
        3120;0;60;0.00;0.00
        3200;01;51.60;1.65;0.85
        3300;01;51.60;7.60;3.92
        3600;Endereco: 00-00-00-000
        3000;030417003 AMARELO;9788578385460;FITA ISOLANTE P22 19X20 COLOR PIREL;63071000;;1234567;;5405;PC;1.0000;51.6000000000;51.60;9788578385460;PC;1.0000;51.6000000000;;;;;1;;;
        3090;19.95
        3120;0;60;0.00;0.00
        3200;01;51.60;1.65;0.85
        3300;01;51.60;7.60;3.92
        3600;Endereco: 00-00-00-000
        3000;030417003 AMARELO;9788578385460;FITA ISOLANTE P22 19X20 COLOR PIREL;63071000;;1234567;;5405;PC;1.0000;51.6000000000;51.60;9788578385460;PC;1.0000;51.6000000000;;;;;1;;;
        3090;19.95
        3120;0;60;0.00;0.00
        3200;01;51.60;1.65;0.85
        3300;01;51.60;7.60;3.92
        3600;Endereco: 00-00-00-000
        3000;030417003 AMARELO;9788578385460;FITA ISOLANTE P22 19X20 COLOR PIREL;63071000;;1234567;;5405;PC;1.0000;51.6000000000;51.60;9788578385460;PC;1.0000;51.6000000000;;;;;1;;;
        3090;19.95
        3120;0;60;0.00;0.00
        3200;01;51.60;1.65;0.85
        3300;01;51.60;7.60;3.92
        3600;Endereco: 00-00-00-000
        3000;030417003 AMARELO;9788578385460;FITA ISOLANTE P22 19X20 COLOR PIREL;63071000;;1234567;;5405;PC;1.0000;51.6000000000;51.60;9788578385460;PC;1.0000;51.6000000000;;;;;1;;;
        3090;19.95
        3120;0;60;0.00;0.00
        3200;01;51.60;1.65;0.85
        3300;01;51.60;7.60;3.92
        3600;Endereco: 00-00-00-000
        3000;030417003 AMARELO;9788578385460;FITA ISOLANTE P22 19X20 COLOR PIREL;63071000;;1234567;;5405;PC;1.0000;51.6000000000;51.60;9788578385460;PC;1.0000;51.6000000000;;;;;1;;;
        3090;19.95
        3120;0;60;0.00;0.00
        3200;01;51.60;1.65;0.85
        3300;01;51.60;7.60;3.92
        3600;Endereco: 00-00-00-000
        3000;030417003 AMARELO;9788578385460;FITA ISOLANTE P22 19X20 COLOR PIREL;63071000;;1234567;;5405;PC;1.0000;51.6000000000;51.60;9788578385460;PC;1.0000;51.6000000000;;;;;1;;;
        3090;19.95
        3120;0;60;0.00;0.00
        3200;01;51.60;1.65;0.85
        3300;01;51.60;7.60;3.92
        3600;Endereco: 00-00-00-000
        3000;030417003 AMARELO;9788578385460;FITA ISOLANTE P22 19X20 COLOR PIREL;63071000;;1234567;;5405;PC;1.0000;51.6000000000;51.60;9788578385460;PC;1.0000;51.6000000000;;;;;1;;;
        3090;19.95
        3120;0;60;0.00;0.00
        3200;01;51.60;1.65;0.85
        3300;01;51.60;7.60;3.92
        3600;Endereco: 00-00-00-000
        3000;030417003 AMARELO;9788578385460;FITA ISOLANTE P22 19X20 COLOR PIREL;63071000;;1234567;;5405;PC;1.0000;51.6000000000;51.60;9788578385460;PC;1.0000;51.6000000000;;;;;1;;;
        3090;19.95
        3120;0;60;0.00;0.00
        3200;01;51.60;1.65;0.85
        3300;01;51.60;7.60;3.92
        3600;Endereco: 00-00-00-000
        3000;030417003 AMARELO;9788578385460;FITA ISOLANTE P22 19X20 COLOR PIREL;63071000;;1234567;;5405;PC;1.0000;51.6000000000;51.60;9788578385460;PC;1.0000;51.6000000000;;;;;1;;;
        3090;19.95
        3120;0;60;0.00;0.00
        3200;01;51.60;1.65;0.85
        3300;01;51.60;7.60;3.92
        3600;Endereco: 00-00-00-000
        3000;030417003 AMARELO;9788578385460;FITA ISOLANTE P22 19X20 COLOR PIREL;63071000;;1234567;;5405;PC;1.0000;51.6000000000;51.60;9788578385460;PC;1.0000;51.6000000000;;;;;1;;;
        3090;19.95
        3120;0;60;0.00;0.00
        3200;01;51.60;1.65;0.85
        3300;01;51.60;7.60;3.92
        3600;Endereco: 00-00-00-000
        3000;030417003 AMARELO;9788578385460;FITA ISOLANTE P22 19X20 COLOR PIREL;63071000;;1234567;;5405;PC;1.0000;51.6000000000;51.60;9788578385460;PC;1.0000;51.6000000000;;;;;1;;;
        3090;19.95
        3120;0;60;0.00;0.00
        3200;01;51.60;1.65;0.85
        3300;01;51.60;7.60;3.92
        3600;Endereco: 00-00-00-000
        3000;030417003 AMARELO;9788578385460;FITA ISOLANTE P22 19X20 COLOR PIREL;63071000;;1234567;;5405;PC;1.0000;51.6000000000;51.60;9788578385460;PC;1.0000;51.6000000000;;;;;1;;;
        3090;19.95
        3120;0;60;0.00;0.00
        3200;01;51.60;1.65;0.85
        3300;01;51.60;7.60;3.92
        3600;Endereco: 00-00-00-000
        3000;030417003 AMARELO;9788578385460;FITA ISOLANTE P22 19X20 COLOR PIREL;63071000;;1234567;;5405;PC;1.0000;51.6000000000;51.60;9788578385460;PC;1.0000;51.6000000000;;;;;1;;;
        3090;19.95
        3120;0;60;0.00;0.00
        3200;01;51.60;1.65;0.85
        3300;01;51.60;7.60;3.92
        3600;Endereco: 00-00-00-000
        3000;030417003 AMARELO;9788578385460;FITA ISOLANTE P22 19X20 COLOR PIREL;63071000;;1234567;;5405;PC;1.0000;51.6000000000;51.60;9788578385460;PC;1.0000;51.6000000000;;;;;1;;;
        3090;19.95
        3120;0;60;0.00;0.00
        3200;01;51.60;1.65;0.85
        3300;01;51.60;7.60;3.92
        3600;Endereco: 00-00-00-000
        3000;030417003 AMARELO;9788578385460;FITA ISOLANTE P22 19X20 COLOR PIREL;63071000;;1234567;;5405;PC;1.0000;51.6000000000;51.60;9788578385460;PC;1.0000;51.6000000000;;;;;1;;;
        3090;19.95
        3120;0;60;0.00;0.00
        3200;01;51.60;1.65;0.85
        3300;01;51.60;7.60;3.92
        3600;Endereco: 00-00-00-000
        3000;030417003 AMARELO;9788578385460;FITA ISOLANTE P22 19X20 COLOR PIREL;63071000;;1234567;;5405;PC;1.0000;51.6000000000;51.60;9788578385460;PC;1.0000;51.6000000000;;;;;1;;;
        3090;19.95
        3120;0;60;0.00;0.00
        3200;01;51.60;1.65;0.85
        3300;01;51.60;7.60;3.92
        3600;Endereco: 00-00-00-000
        3000;030417003 AMARELO;9788578385460;FITA ISOLANTE P22 19X20 COLOR PIREL;63071000;;1234567;;5405;PC;1.0000;51.6000000000;51.60;9788578385460;PC;1.0000;51.6000000000;;;;;1;;;
        3090;19.95
        3120;0;60;0.00;0.00
        3200;01;51.60;1.65;0.85
        3300;01;51.60;7.60;3.92
        3600;Endereco: 00-00-00-000
        3000;030417003 AMARELO;9788578385460;FITA ISOLANTE P22 19X20 COLOR PIREL;63071000;;1234567;;5405;PC;1.0000;51.6000000000;51.60;9788578385460;PC;1.0000;51.6000000000;;;;;1;;;
        3090;19.95
        3120;0;60;0.00;0.00
        3200;01;51.60;1.65;0.85
        3300;01;51.60;7.60;3.92
        3600;Endereco: 00-00-00-000
        3000;030417003 AMARELO;9788578385460;FITA ISOLANTE P22 19X20 COLOR PIREL;63071000;;1234567;;5405;PC;1.0000;51.6000000000;51.60;9788578385460;PC;1.0000;51.6000000000;;;;;1;;;
        3090;19.95
        3120;0;60;0.00;0.00
        3200;01;51.60;1.65;0.85
        3300;01;51.60;7.60;3.92
        3600;Endereco: 00-00-00-000
        3000;030417003 AMARELO;9788578385460;FITA ISOLANTE P22 19X20 COLOR PIREL;63071000;;1234567;;5405;PC;1.0000;51.6000000000;51.60;9788578385460;PC;1.0000;51.6000000000;;;;;1;;;
        3090;19.95
        3120;0;60;0.00;0.00
        3200;01;51.60;1.65;0.85
        3300;01;51.60;7.60;3.92
        3600;Endereco: 00-00-00-000
        3000;030417003 AMARELO;9788578385460;FITA ISOLANTE P22 19X20 COLOR PIREL;63071000;;1234567;;5405;PC;1.0000;51.6000000000;51.60;9788578385460;PC;1.0000;51.6000000000;;;;;1;;;
        3090;19.95
        3120;0;60;0.00;0.00
        3200;01;51.60;1.65;0.85
        3300;01;51.60;7.60;3.92
        3600;Endereco: 00-00-00-000
        3000;030417003 AMARELO;9788578385460;FITA ISOLANTE P22 19X20 COLOR PIREL;63071000;;1234567;;5405;PC;1.0000;51.6000000000;51.60;9788578385460;PC;1.0000;51.6000000000;;;;;1;;;
        3090;19.95
        3120;0;60;0.00;0.00
        3200;01;51.60;1.65;0.85
        3300;01;51.60;7.60;3.92
        3600;Endereco: 00-00-00-000
        3000;030417003 AMARELO;9788578385460;FITA ISOLANTE P22 19X20 COLOR PIREL;63071000;;1234567;;5405;PC;1.0000;51.6000000000;51.60;9788578385460;PC;1.0000;51.6000000000;;;;;1;;;
        3090;19.95
        3120;0;60;0.00;0.00
        3200;01;51.60;1.65;0.85
        3300;01;51.60;7.60;3.92
        3600;Endereco: 00-00-00-000
        3000;030417003 AMARELO;9788578385460;FITA ISOLANTE P22 19X20 COLOR PIREL;63071000;;1234567;;5405;PC;1.0000;51.6000000000;51.60;9788578385460;PC;1.0000;51.6000000000;;;;;1;;;
        3090;19.95
        3120;0;60;0.00;0.00
        3200;01;51.60;1.65;0.85
        3300;01;51.60;7.60;3.92
        3600;Endereco: 00-00-00-000
        3000;030417003 AMARELO;9788578385460;FITA ISOLANTE P22 19X20 COLOR PIREL;63071000;;1234567;;5405;PC;1.0000;51.6000000000;51.60;9788578385460;PC;1.0000;51.6000000000;;;;;1;;;
        3090;19.95
        3120;0;60;0.00;0.00
        3200;01;51.60;1.65;0.85
        3300;01;51.60;7.60;3.92
        3600;Endereco: 00-00-00-000
        4000;0.00;0.00;0.00;0.00;0.00;2580.00;0.00;0.00;0.00;0.00;0.00;42.50;196.00;0.00;2580.00;997.50;
        5000;9
        6500;01;2580.00`);

        var net = require('net');
        var client = new net.Socket();
        client.connect(8084, '172.31.249.4', function() {
            console.log('Connected');
            console.log(teste.toString());
            client.write(teste);
            client.end();
        });
               
        
        client.on('data', function(data) {
            console.log(data.toString());
            client.destroy(); // kill client after server's response
        });
        
        client.on('close', function() {
            console.log('Connection closed');
        });
        client.on('error', function(error) {
            console.log(error);
        });        
    }

    //Tipo de Comunicação - Arquivo ou JDBC

    $('#envioArquivo').onchange = function (event) {
        $("#destino").disabled = false;
        event.preventDefault();
    }

    $('#jdbc').onchange = function (event) {
        $("#destino").disabled = true;
        event.preventDefault();
    }

    //Estatistica .Exception

    $('#gerarEstatistica').onclick = function (event) {
        document.getElementById('listaTempos').innerHTML = " ";
        document.getElementById('mediaTotal').innerHTML = " ";
        try {
            let estatisticaController = new EstatisticaController();
            let element = $("#arquivosException");

            let resultadoPromise = estatisticaController.leArquivos(element);
            let resultado = Promise.resolve(resultadoPromise);
            resultado.then(function (valores) {
                estatisticaController.criaTotal(valores);
                estatisticaController.criaLista(valores);
            });

        } catch (Exception) {
            console.log("Erro: " + Exception);
        }

        event.preventDefault();
    }

    //Gerenciador de Serviços

    $('#agente').onchange = function (event) {
        $("#contadorAgente").disabled = false;
        $('#destinoArquivos').disabled = false;
        $('#arquivosAgente').disabled = false;
        $('#limparAgente').disabled = false;
        event.preventDefault();
    }

    $('#qtdAgenteServico').onchange = event => $('#lblAgente').innerHTML = 'Quantidade de Agentes: ' + parseInt($("#contadorAgente").value);

    $('#concentrador').onchange = function (event) {
        $("#contadorAgente").disabled = true;
        $('#arquivosAgente').disabled = true;
        $('#destinoArquivos').disabled = true;
        $('#limparAgente').disabled = true;
        event.preventDefault();
    }

    $('#pararServico').onclick = function (event) {
        if ($("#agente").checked == true) {
            let quantidade = parseInt($("#contadorAgente").value);
            let tipo = 1;
            ServicosController.paraServicos(quantidade, 'NDDigitalAgentService_', tipo).then(() => {
                //promisse sem implementação
            }, (error) => { console.log(`${error}`); });
        } else {
            let quantidade = 1;
            let tipo = 2;
            ServicosController.paraServicos(quantidade, 'NDDigitalConcentratorService', tipo).then(() => {
                //promisse sem implementação               
            }, (error) => { console.log(`${error}`); });
        }
        event.preventDefault();
    }

    $('#iniciarServico').onclick = function (event) {
        if ($("#agente").checked == true) {
            let quantidade = parseInt($("#contadorAgente").value);
            let tipo = 1;
            ServicosController.iniciaServicos(quantidade, 'NDDigitalAgentService_', tipo).then(() => {
                //promisse sem implementação
            }, (error) => { console.log(`${error}`); });
        } else {
            let quantidade = 1;
            let tipo = 2;
            ServicosController.iniciaServicos(quantidade, 'NDDigitalConcentratorService', tipo).then(() => {
                //promisse sem implementação               
            }, (error) => { console.log(`${error}`); });
        }
        event.preventDefault();
    }

    $('#limparAgente').onclick = function (event) {
        if ($("#agente").checked == true) {
            let quantidade = parseInt($("#contadorAgente").value);
            let tipo = 1;
            ServicosController.paraServicos(quantidade, 'NDDigitalAgentService_', tipo).then(() => {
                let caminho = $('#destinoArquivos').value;
                let base = $('#arquivosAgente').value;
                ServicosController.alteraArquivos(quantidade, caminho, base);
            }, (error) => { console.log(`${error}`); });
        } else {
            let quantidade = 1;
            let tipo = 2;
            ServicosController.paraServicos(quantidade, 'NDDigitalConcentratorService', tipo).then(() => {
                //Concentrador não terá remove arquivos
            }, (error) => { console.log(`${error}`); });
        }
        event.preventDefault();
    }
};