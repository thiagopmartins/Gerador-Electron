const base64 = require('base-64');
let zlib = require("zlib");

let $ = document.querySelector.bind(document);

class ConvertModel {

    descompactar(msg) {
        $('#lblResultadoLib').classList.add('active');
        const buffer = Buffer.from(msg, 'base64');
    
        zlib.unzip(buffer, (err, buffer) => {
            if (!err) {
                $('#resultadoLib').value = buffer.toString();
                console.log(buffer.toString());
            } else {
                try {
                    $('#resultadoLib').value = base64.decode(msg);
                } catch (error) {
                    $('#resultadoLib').value = `Erro ao tentar descompactar a string!\n${error}`;
                    console.log(error);
                }
            }
        });
    }
    compactar(msg) {
        $('#lblResultadoLib').classList.add('active');
        zlib.deflate(msg, (err, buffer) => {
            if (!err) {

                $('#resultadoLib').value = buffer.toString('base64');
                console.log(buffer.toString('base64'));
            } else {
                $('#resultadoLib').value = base64.decode(msg);
                console.log(err);
            }
        });
    }



}

module.exports = ConvertModel;