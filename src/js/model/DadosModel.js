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
    get cnpj(){ return $('#CNPJ').value; }

    set destino(valor){ $('#destino').value = valor; }
    set origem(valor){ $('#arquivo').path = valor; }
    set agentes(valor){ $('#agentes').value = valor; $('#lblAgentes').innerHTML = 'Quantidade de Agentes: ' + $('#agentes').value; }
    set serie(valor){ $('#serie').value = valor; $('#lblSerie').classList.add('active'); }
    set numero(valor){ $('#numero').value = valor; $('#lblNumero').classList.add('active'); }
    set quantidade(valor){ $('#quantidade').value = valor; $('#lblQuantidade').classList.add('active'); }
    set nomenclatura(valor){ $('#nomenclatura').value = valor; $('#lblNomenclatura').classList.add('active'); }
    set fuso(valor){ $('#fuso').value = valor; $('#lblFuso').classList.add('active'); }
    set sleep(valor){ $('#sleep').value = valor; $('#lblSleep').classList.add('active'); }
    set cnpj(valor){ $('#CNPJ').value = valor; $('#lblCNPJ').classList.add('active'); }    
}

module.exports = DadosModel;