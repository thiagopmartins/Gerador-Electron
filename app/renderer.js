const FerramentaController = require('./controller/FerramentaController.js');
console.log('campos');
let ferramenta = new FerramentaController();
document.querySelector('#btnGerador').addEventListener('submit', (event) => {
    event.preventDefault(); 
    ferramenta._atualizarGerador();
    console.log('aaa');
});

document.querySelector('#btnEstatisticas').click('submit', (event) => {
    event.preventDefault();
    ferramenta._atualizarEstatisticas();
});