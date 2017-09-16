const CnpjModel = require('./js/model/CnpjModel.js');

let cnpjModel;
let $ = document.querySelector.bind(document);

window.onload = function () {
    //Instancia a classe CnpjModel do arquivo CnpjModel.js em Model
    cnpjModel = new CnpjModel();

    //Atualiza o json trazendo a lista de CNPJ  
    cnpjModel.atualizaLista();

    //Deleta CNPJ
    document.getElementById("listaCnpj").addEventListener("mouseenter", function () {
        let total = document.getElementsByClassName("deleta").length;
        for (let i = 0; i < total; i++) {
            document.getElementById('cnpjPar' + i).addEventListener("click", function () {
                if (confirm('Deseja realmente deletar?')) {
                    let cnpj = document.getElementById('cnpj' + i).value;
                    cnpjModel.deletaCnpj(cnpj);
                }
            });
        }
    });

    /*  
            document.getElementById('editCnpjPar' + i).addEventListener("click", function () {
                let cnpj = document.getElementById('editCnpj' + i).value;
                alert(cnpj);
            });
    */

    //Função para salvar novos CNPJs    
    $('#btnSalvarCnpj').onclick = () => {
        let cnpj = document.getElementById('cnpj').value;
        let empresa = document.getElementById('empresa').value;
        if (cnpj.length >= 14 && empresa.length >= 3) {

            //chama os métodos de Gravar e Atualizar CNPJs
            cnpjModel.salvarArquivo(cnpj, empresa);

            document.getElementById('notificacao').style.display = 'block';
            document.getElementById("notificacao").className = "col s8 chip offset-s2 green";
            document.getElementById('notificacao').innerHTML = "Arquivo salvo com sucesso";
        } else {
            document.getElementById('notificacao').style.display = 'block';
            document.getElementById("notificacao").className = "col s8 chip offset-s2 red";
            document.getElementById('notificacao').innerHTML = "Erro ao registrar arquivo";
        }
    };
};
