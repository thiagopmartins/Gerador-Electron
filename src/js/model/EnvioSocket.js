const ConfigModel = require('../model/ConfigModel.js');
const fs = require('fs');
const net = require('net');
const log = require('log4js').getLogger("EnvioSocket");

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

    enviar(conteudo, caminho, agenteId, encoded) {
        let client = new net.Socket();
        let multiplasPortas = parseInt(porta) + parseInt(agenteId) - 1;
        client.connect(multiplasPortas, ipSocket, () => {
            log.info(`Conectado ao endereço ${ipSocket}:${multiplasPortas}`);
            console.log(`Conectado ao endereço ${ipSocket}:${multiplasPortas}`);
            log.info(`Enviando o documento ${caminho}_TCPMSG:\n${encoded}`);
            console.log(`${caminho}_TCPMSG;${conteudo}`);
            client.write(`${caminho}_TCPMSG;${conteudo}`);
            client.end();
        });


        client.on('data', function (data) {
            console.log(data.toString());
            let retorno = [];
            retorno = data.toString().split(/_TCPMSG;/);
            if (!fs.existsSync(out))
                fs.mkdirSync(out); 
            log.info(`Retorno do processo para o documento ${retorno[0]}_TCPMSG:\n${retorno[1]}`);           
            fs.writeFileSync(out + '\\' + retorno[0], retorno[1]);
            client.destroy(); // kill client after server's response
        });

        client.on('close', function () {
            console.log('Connection closed');
        });
        client.on('error', function (error) {
            console.log(error);
            log.error(`Falha no processamento: ${caminho} \n${error}`);
            fs.writeFileSync(out + '\\' + 'ERRO_' + caminho, error.toString());
        });
    }


}

module.exports = EnvioSocket;