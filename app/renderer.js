const FerramentaController = require('./js/controller/FerramentaController.js');
let ferramenta = new FerramentaController();
document.getElementById('btnGerador').onclick = function(event) {
    event.preventDefault(); 
    ferramenta._atualizarGerador();
};

document.getElementById('btnEstatisticas').onclick = function(event){
    event.preventDefault();
    ferramenta._atualizarEstatisticas();
};