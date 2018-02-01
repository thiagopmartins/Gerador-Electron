const ConfigModel = require('../model/ConfigModel.js');
const fs = require('fs');
const net = require('net');

let
    ipSocket,
    out,
    porta
    ;

class EnvioSocket {

    iniciar() {
        return new Promise((resolve, reject) => {
            let configModel = new ConfigModel();
            configModel.pegarDados().then((dados) => {
                ipSocket = dados.ipSocket;
                porta = dados.porta;
                out = dados.out;
                return resolve(dados);
            });
        });
    }

    enviar(conteudo, caminho, agenteId) {
        let client = new net.Socket();
        let multiplasPortas = parseInt(porta) + parseInt(agenteId) - 1;
        client.connect(multiplasPortas, ipSocket, () => {
            console.log(`Conectado ao endereço ${ipSocket}:${multiplasPortas}`);
            console.log(`${caminho}_TCPMSG;${conteudo}`);
            client.write(`${caminho}_TCPMSG;${conteudo}`);
            client.end();
        });


        client.on('data', function (data) {
            console.log(data.toString());
            let retorno = [];
            retorno = data.toString().split(/_TCPMSG;/);
            fs.writeFileSync(out + '\\' + retorno[0], retorno[1]);
            client.destroy(); // kill client after server's response
        });

        client.on('close', function () {
            console.log('Connection closed');
        });
        client.on('error', function (error) {
            console.log(error);
            console.log(error.toString());
            fs.writeFileSync(out + '\\' + 'ERRO_' + caminho, error.toString());
        });
    }


}

module.exports = EnvioSocket;