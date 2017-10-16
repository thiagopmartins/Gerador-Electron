const fs = require('fs');

class ConstantesModel {
        get ENDERECO() { return ".//"; } 
        get SEFAZ() { return "enviado para Sefaz "; } 
        get TERMO() { return "ms resultado: "; } 
        get TERMO_OLD() { return "ms"; } 
        get LIMPEZA() { return "#################################-AS CONEXOES HTTP FORAM LIMPAS"; } 
        get CONTINGENCIA() { return "Processo em contingencia."; } 
}
module.exports = ConstantesModel;