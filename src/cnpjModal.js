const CnpjModel = require('./js/model/CnpjModel.js');
let cnpjModel;
let $ = document.querySelector.bind(document);

window.onload = function () {
    //Instancia a classe CnpjModel do arquivo CnpjModel.js em Model
    cnpjModel = new CnpjModel();

    //Atualiza e Cria a lista de CNPJ  
    cnpjModel.atualizaLista();        

    //Deleta e EDita CNPJ
    document.getElementById("listaCnpj").addEventListener("mouseenter", function (e) {
        let total = document.getElementsByClassName("deleta").length;
        for (let i = 0; i < total; i++) {
            //Delete
            document.getElementById('cnpjPar' + i).addEventListener("click", function () {
                if (confirm('Deseja realmente deletar?')) {
                    let cnpj = document.getElementById('cnpj' + i).value;
                    cnpjModel.deletaCnpj(cnpj);
                }
            });
            //Edit - Modal abre nova tela para editar campos
            document.getElementById('editCnpjPar' + i).addEventListener("click", function () {
                let cnpj = document.getElementById('editCnpj' + i).value;
                let ie = document.getElementById('editIe' + i).value;
                let empresa = document.getElementById('editEmpresa' + i).value;
                let modal = document.getElementById('myModal');
                let span = document.getElementsByClassName("close")[0];

                document.getElementById("cnpjModal").value = cnpj;
                document.getElementById("ieModal").value = ie;
                document.getElementById("empresaModal").value = empresa;

                modal.style.display = "block";
                window.onclick = function (event) { if (event.target == modal) { modal.style.display = "none"; } }
                modal.onmousemove = () => {
                    if (document.getElementById("cnpjModal").value.length !== 14) { 
                        $('#btnEditarCnpj').classList.add('disabled');                      
                        document.getElementById('notificacaoModal').style.display = 'block';
                        document.getElementById("notificacaoModal").className = "col s8 chip offset-s2 red";
                        document.getElementById('notificacaoModal').innerHTML = "O campo CNPJ está vazio ou com tamanho incorreto";
                    } else if (document.getElementById("ieModal").value.length < 3) {
                        $('#btnEditarCnpj').classList.add('disabled');                      
                        document.getElementById('notificacaoModal').style.display = 'block';
                        document.getElementById("notificacaoModal").className = "col s8 chip offset-s2 red";
                        document.getElementById('notificacaoModal').innerHTML = "O campo IE está vazio ou com tamanho incorreto";
                    } else if (document.getElementById("empresaModal").value.length < 3) {
                        $('#btnEditarCnpj').classList.add('disabled');                      
                        document.getElementById('notificacaoModal').style.display = 'block';
                        document.getElementById("notificacaoModal").className = "col s8 chip offset-s2 red";
                        document.getElementById('notificacaoModal').innerHTML = "O campo Empresa está vazio ou com tamanho incorreto";
                    } else {
                        document.getElementById('notificacaoModal').style.display = 'none';
                        $('#btnEditarCnpj').classList.remove('disabled');                        
                    }
                }

                //Função para salvar novos CNPJs    
                $('#btnEditarCnpj').onclick = () => {
                    let cnpjNovo = document.getElementById('cnpjModal').value;
                    let ieNovo = document.getElementById('ieModal').value;
                    let empresaNovo = document.getElementById('empresaModal').value;
                    if (cnpjNovo.length == 14 && empresaNovo.length >= 3) {
                        cnpjModel.editaArquivo(cnpj, empresa, cnpjNovo, ieNovo, empresaNovo);
                        modal.style.display = "none";
                    } else {
                        document.getElementById('notificacaoModal').style.display = 'block';
                        document.getElementById("notificacaoModal").className = "col s8 chip offset-s2 red";
                        document.getElementById('notificacaoModal').innerHTML = "Erro ao editar o cadastro de CNPJ";
                    }
                };
                $('#btnDescartarEdicao').onclick = () => { modal.style.display = "none"; };
            });
        }
        //one time event
        e.target.removeEventListener(e.type, arguments.callee);
    });

    //Função para salvar novos CNPJs    
    $('#btnSalvarCnpj').onclick = () => {
        let cnpj = document.getElementById('cnpj').value;
        let ie = document.getElementById('ie').value;
        let empresa = document.getElementById('empresa').value;
        if (cnpj.length == 14 && ie.length >= 3 && empresa.length >= 3) {

            //chama os métodos de Gravar e Atualizar CNPJs
            cnpjModel.salvarArquivo(cnpj, ie, empresa);

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
