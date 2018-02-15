const FerramentaController = require('./js/controller/FerramentaController.js');
const ServicosController = require('./js/controller/ServicosController.js');
const EstatisticaController = require('./js/controller/EstatisticaController.js');
const CancelamentoModel = require('./js/model/CancelamentoModel.js');
const ConvertModel = require('./js/model/ConvertModel.js');
const Log = require('./Log.js');
const base64 = require('base-64');
let zlib = require("zlib");

const { ipcRenderer } = require('electron');
const fs = require('fs');

let $ = document.querySelector.bind(document);
let cnpjModel;

window.onload = function () {

    console.log("Carregando aplicação!!!");
    let log = new Log();
    log.escreve("Carregando a aplicação");
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
    $('#btnDescompactador').onclick = function (event) {
        event.preventDefault();
        FerramentaController._ativarDescompactador();
    };
    $('#btnCompactar').onclick = function (event) {
        event.preventDefault();
        let msg = $('#txtDescompactador').value;
        let convert = new ConvertModel();
        convert.compactar(msg);

    };
    $('#btnDescompactar').onclick = function (event) {
        event.preventDefault();
        let msg = $('#txtDescompactador').value;
        let convert = new ConvertModel();
        convert.descompactar(msg);

    };
    $('#btnConfiguracoes').onclick = function (event) {
        event.preventDefault();
        FerramentaController._ativarConfiguracoes();
    };

    $('#salvarConfiguracoes').onclick = function (event) {
        event.preventDefault();
        FerramentaController._salvarDados(true);
    };

    $('#salvarConfiguracoesSocket').onclick = function (event) {
        event.preventDefault();
        FerramentaController._salvarDados(true);
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
    $('#cancelarDocumentos').onclick = (event) => {
        let cancelamento = new CancelamentoModel();
        cancelamento.iniciarProcesso(
            $('#agenteCancelamento').value,
            $('#destinoCancelamento').value,
            $('#timeoutCancelamento').value,
            $('#bancoCancelamento').value,
            0
        );
    }
    $('#ajustarDocumentos').onclick = (event) => {
        let cancelamento = new CancelamentoModel();
        cancelamento.iniciarProcesso(
            $('#agenteCancelamento').value,
            $('#destinoCancelamento').value,
            $('#timeoutCancelamento').value,
            $('#bancoCancelamento').value,
            1
        );
    }
    $('#nomenclatura').oninput = (event) => {
        //regra
        if (conteudo == $('#nomenclatura').value) {
            $('#menuTopo').style.right = '-90px';
            $('#showEmployees').innerHTML = '<a class="btn-floating btnMenu amber accent-4"><i class="material-icons">people</i></a>';
        }
        else{
            $('#menuTopo').style.right = '-140px';
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

    //Tipo de Comunicação - Arquivo ou JDBC

    $('#envioArquivo').onchange = function (event) {
        $("#destino").disabled = false;
        event.preventDefault();
    }

    $('#jdbc').onchange = function (event) {
        $("#destino").disabled = true;
        event.preventDefault();
    }

    $('#socket').onchange = function (event) {
        $("#destino").disabled = true;
        event.preventDefault();
    }

    //Ativar/Desativar e setar valor para checkbox tabela de saída JDBC

    document.getElementById("capturarRetornos").onclick = function () {
        if ($('#capturarRetornos').checked) {
            $('#capturarRetornos').value = 1;
            $("#deletarRegistros").disabled = false;
        } else {
            $('#capturarRetornos').value = 2;
            $("#deletarRegistros").disabled = true;
        }
    };

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