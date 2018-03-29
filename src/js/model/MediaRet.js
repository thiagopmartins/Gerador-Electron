var fs = require('fs');
let conteudo;



class MediaRet {


    teste() {
        let linhasSend = [];
        let linhasRet = [];
        let linhas = [];        
        conteudo = fs.readFileSync('TESTE/log.txt', 'utf8');
        linhas = conteudo.split(/\n/);

        for (let linha of linhas) {
            if (/Verificando retorno do lote:/.test(linha))
                linhasSend.push(linha);
            if (/Lote: [0-9]+ processado com sucesso/.test(linha))
                linhasRet.push(linha);
            
        }

        for (let linha of linhasSend) {
            let cod = linha.split(/Verificando retorno do lote: /);
            let find = false;
            cod[1] = cod[1].toString().split(" -")[0];
            
            let teste = new RegExp('\\bLote: ' + cod[1] + '\\b', 'i');

            for (let retorno of linhasRet) {
                if(teste.test(retorno)){
                    let timeSend = new Date(cod[0].split(/; /)[2]);
                    let timeRet = new Date(retorno.split(/; /)[2]);
                    let tempo = timeRet - timeSend;
                    console.log(`Processo ${cod[1]} demorou ${tempo} ms para consultar retorno.`)
                    find = true;
                }
            }
            if(!find)
                console.log(`Erro ao encontrar o retorno para o processo ${cod[1]}`)
        }

    }

}

module.exports = MediaRet;