const CnpjModel = require('./js/model/CnpjModel.js');

let cnpjModel;

window.onload = function(){
    let $ = document.querySelector.bind(document);
    cnpjModel = new CnpjModel();
};