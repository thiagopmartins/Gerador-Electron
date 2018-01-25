let $ = document.querySelector.bind(document);
let dir = '../../../data/';
let filename = 'config.json';

class DadosModel{
    get destino(){ return $('#destino').value.toString(); }
    get origem() { 
        if ($('#arquivo').value == '') {
            let data = require(dir + filename);
            return data.origem.toString();  
        } else {
            let caminho = $('#arquivo').files[0].path;
            return caminho.toString(); 
        }            
    }
    get tipo() { return $('input[name="group1"]:checked').value; }
    get agentes() { return $('#agentes').value; }
    get serie() { return $('#serie').value; }
    get numero() { return $('#numero').value; }
    get quantidade() { return $('#quantidade').value; }
    get nomenclatura() { return $('#nomenclatura').value; }
    get fuso() { return $('#fuso').value; }
    get sleep() { return $('#sleep').value; }
    get cnpj() { return $('#CNPJ').value; }
    get ie() { return $('#IE').value; }
    get itens() { return $('#itens').value; }
    get comunicacao() { return $('input[name="tipoEnvio"]:checked').value; }

    get host() { return $('#host').value; }
    get user() { return $('#user').value; }
    get password() { return $('#password').value; }
    get database() { return $('#database').value; }
    get table() { return $('#table').value; }
    
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
    set ie(valor){ $('#IE').value = valor; $('#lblIE').classList.add('active'); }  
    set itens(valor){ $('#itens').value = valor; $('#lblItens').classList.add('active'); }      
    
    set host(valor){ $('#host').value = valor; $('#lblHost').classList.add('active'); }
    set user(valor){ $('#user').value = valor; $('#lblUser').classList.add('active'); }       
    set password(valor){ $('#password').value = valor; $('#lblPassword').classList.add('active'); }  
    set database(valor){ $('#database').value = valor; $('#lblDatabase').classList.add('active'); } 
    set table(valor){ $('#table').value = valor; $('#lblTable').classList.add('active'); }   
}

module.exports = DadosModel;