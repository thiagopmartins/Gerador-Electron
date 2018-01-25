const fs = require('fs-extra');

let rimraf = require('rimraf');

class ServicosController {
    static iniciaServicos(quantidade, servico, tipo) {
        return new Promise((resolve, reject) => {
            for (var i = 1; i < quantidade + 1; i++) {
                if (tipo == 1) {
                    require('child_process').exec('net start ' + servico + i, function (error, stdout, stderr) {
                        if (error !== null) console.log('exec error: ' + error);
                    });
                } else {
                    require('child_process').exec('net start ' + servico, function (error, stdout, stderr) {
                        if (error !== null) console.log('exec error: ' + error);
                    });
                }
            }
            return resolve();
        });
    }

    static paraServicos(quantidade, servico, tipo) {
        return new Promise((resolve, reject) => {
            for (var i = 1; i < quantidade + 1; i++) {
                if (tipo == 1) {
                    require('child_process').exec('net stop ' + servico + i, function (error, stdout, stderr) {
                        if (error !== null) console.log('exec error: ' + error);
                    });
                } else {
                    require('child_process').exec('net stop ' + servico, function (error, stdout, stderr) {
                        if (error !== null) console.log('exec error: ' + error);
                    });
                }
            }
            return resolve();
        });
    }

    static alteraArquivos(quantidade, caminho, base) {
        for (var i = 1; i < quantidade + 1; i++) {
            rimraf(caminho + i + '/out', function () { });
            rimraf(caminho + i + '/logs', function () { });
            rimraf(caminho + i + '/in', function () { });
            rimraf(caminho + i + '/control', function () { });
            rimraf(caminho + i + '/unProcessed', function () { });
            rimraf(caminho + i + '/config/config*.xml', function () { });
            rimraf(caminho + i + '/config/path', function () { });
            rimraf(caminho + i + '/config/version', function () { });
            try {
                const { spawn } = require('child_process');
                const ls = spawn('XCOPY', [base + "\*.jar", caminho + i + "\\bin"]);

                ls.stdout.on('data', (data) => { });
                ls.stderr.on('data', (data) => { console.log(`stderr: ${data}`); });

                fs.copy(base + "/path", caminho + i + "/config/path", err => { if (err) return console.error(err) });
                fs.copy(base + "/version", caminho + i + "/config/version", err => { if (err) return console.error(err) });
            } catch (err) {
                console.error(err)
            }
        }
    }
}
module.exports = ServicosController;