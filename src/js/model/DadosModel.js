let $ = document.querySelector.bind(document);

class DadosModel{
    get destino(){ return $('#destino').value.toString(); }
    get origem() { 
        let caminho = null;
        try {
            caminho = $('#arquivo').files[0].path;       
        } catch (Exception) {
            throw(Exception);
        }  
        return caminho.toString();      
    }
    get tipo(){ return $('input[name="group1"]:checked').value; }
    get agentes(){ return $('#agentes').value; }
    get serie(){ return $('#serie').value; }
    get numero(){ return $('#numero').value; }
    get quantidade(){ return $('#quantidade').value; }
    get nomenclatura(){ return $('#nomenclatura').value; }
    get fuso(){ return $('#fuso').value; }
    get sleep(){ return $('#sleep').value; }
}

module.exports = DadosModel;