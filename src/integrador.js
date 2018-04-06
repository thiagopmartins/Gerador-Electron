const ConfigModel = require('./js/model/ConfigModel.js');
const fs = require('fs');
const path = require('path');

let $ = document.querySelector.bind(document);

let destino;
let nomenclatura;
let documento = [];

window.onload = () => {
    console.log('Iniciando Integrador.js');
    let configModel = new ConfigModel();
    configModel.pegarDados()
        .then((dados) => {
            this.destino = dados.destino;
            this.nomenclatura = dados.nomenclatura;
        }, (erro) => { console.log(erro); }
    );
};
$('#env_pag').onclick = () => {
    let quantidade =  + $('#idQuantidadeEnvPag').value;
    let idProcesso = + $('#idProcessoEnvPag').value;
    let pag;
    let i = 0;
    documento = [];
    documento.push(
        `<nfce version="1.00">
	        <EnviarPagamento>
                <chaveAcessoValidador>25CFE38D-3B92-46C0-91CA-CFF751A82D3D</chaveAcessoValidador>`
    );
    while(i < quantidade){
        pag = ("000" + (i + 1)).slice(-3);
        documento.push(`
            <Parametros idpagamento="pag${pag}">
            <Parametro>
                <Nome>ChaveRequisicao</Nome>
                <Valor>26359854-5698-1365-9856-965478231456</Valor>
            </Parametro>
            <Parametro>
                <Nome>Estabelecimento</Nome>
                <Valor>10</Valor>
            </Parametro>
            <Parametro>
                <Nome>IdProcesso</Nome>
                <Valor>${idProcesso}</Valor>
            </Parametro>
            <Parametro>
                <Nome>Cnpj</Nome>
                <Valor>05645897994</Valor>
            </Parametro>
            <Parametro>
                <Nome>IcmsBase</Nome>
                <Valor>0.23</Valor>
            </Parametro>
            <Parametro>
                <Nome>ValorTotalVenda</Nome>
                <Valor>2000,00</Valor>
            </Parametro>
            <Parametro>
                <Nome>HabilitarMultiplosPagamentos</Nome>
                <Valor>true</Valor>
            </Parametro>
            <Parametro>
                <Nome>HabilitarControleAntiFraude</Nome>
                <Valor>false</Valor>
            </Parametro>
            <Parametro>
                <Nome>CodigoMoeda</Nome>
                <Valor>BRL</Valor>
            </Parametro>
            <Parametro>
                <Nome>EmitirCupomNFCE</Nome>
                <Valor>false</Valor>
            </Parametro>
            <Parametro>
                <Nome>OrigemPagamento</Nome>
                <Valor>Mesa 999</Valor>
            </Parametro>
        </Parametros>
        `);
        i ++;
        idProcesso ++;
    }
    documento.push(`
        </EnviarPagamento>
    </nfce>    
    `);
    documento = documento.join('');
    let doc = `${this.nomenclatura}${idProcesso}_ped_env-pag.xml`
    fs.writeFileSync(this.destino + path.sep + doc, documento);
    $('#idProcessoEnvPag').value = idProcesso;
    console.log(documento);
};
$('#sta_pag').onclick = () => {
    
    let quantidade =  + $('#idQuantidadeStaPag').value;
    let idProcesso = + $('#idProcessoStaPag').value;
    let pag;
    let i = 0;
    documento = [];
    documento.push(
        `<nfce version="1.00">
            <EnviarStatusPagamento>
            <chaveAcessoValidador>25CFE38D-3B92-46C0-91CA-CFF751A82D3D</chaveAcessoValidador>`
    );
    while(i < quantidade){
        pag = ("000" + (i + 1)).slice(-3);
        documento.push(`
            <Parametros idpagamento="pag${pag}">
            <Parametro>
				<Nome>CodigoAutorizacao</Nome>
				<Valor>${(idProcesso * 10)}</Valor>
			</Parametro>
			<Parametro>
				<Nome>Bin</Nome>
				<Valor>1233244</Valor>
			</Parametro>
			<Parametro>
				<Nome>DonoCartao</Nome>
				<Valor>Absbsbsbs</Valor>
			</Parametro>
			<Parametro>
				<Nome>DataExpiracao</Nome>
				<Valor>01/17</Valor>
			</Parametro>
			<Parametro>
				<Nome>InstituicaoFinanceira</Nome>
				<Valor>1</Valor>
			</Parametro>
			<Parametro>
				<Nome>Parcelas</Nome>
				<Valor>1</Valor>
			</Parametro>
			<Parametro>
				<Nome>CodigoPagamento</Nome>
				<Valor>${(idProcesso * 2)}</Valor>
			</Parametro>
			<Parametro>
				<Nome>ValorPagamento</Nome>
				<Valor>2000</Valor>
			</Parametro>
			<Parametro>
				<Nome>IdProcesso</Nome>
				<Valor>${idProcesso}</Valor>
			</Parametro>
			<Parametro>
				<Nome>Tipo</Nome>
				<Valor>1</Valor>
			</Parametro>
			<Parametro>
				<Nome>UltimosQuatroDigitos</Nome>
				<Valor>9876</Valor>
			</Parametro>
        </Parametros>
        `);
        i ++;
        idProcesso ++;
    }
    documento.push(`
        </EnviarStatusPagamento>
    </nfce>   
    `);
    let doc = `${this.nomenclatura}${idProcesso}_ped_sta-pag.xml`
    fs.writeFileSync(this.destino + path.sep + doc, documento);
    $('#idProcessoStaPag').value = idProcesso;
    console.log(documento);
};
$('#resp_fis').onclick = () => {
    let quantidade =  + $('#idQuantidadeRespFis').value;
    let idProcesso = + $('#idProcessoRespFis').value;
    let idChaveRespFis = $('#idChaveRespFis').value;
    let pag;
    let i = 0;
    documento = [];
    documento.push(
        `<nfce version="1.00">
            <RespostaFiscal>
            <chaveAcessoValidador>25CFE38D-3B92-46C0-91CA-CFF751A82D3D</chaveAcessoValidador>`
    );
    while(i < quantidade){
        pag = ("000" + (i + 1)).slice(-3);
        documento.push(`
            <Parametros idpagamento="pag${pag}">
            <Parametro>
				<Nome>IdProcesso</Nome>
				<Valor>${idProcesso}</Valor>
			</Parametro>
			<Parametro>
				<Nome>ChaveAcesso</Nome>
				<Valor>${idChaveRespFis}</Valor>
			</Parametro>
			<Parametro>
				<Nome>Nsu</Nome>
				<Valor>${(idProcesso * 2 + 1)}</Valor>
			</Parametro>
			<Parametro>
				<Nome>NumerodeAprovacao</Nome>
				<Valor>${(idProcesso * 10 + 1)}</Valor>
			</Parametro>
			<Parametro>
				<Nome>Bandeira</Nome>
				<Valor>${(idProcesso % 2 + 1)}</Valor>
			</Parametro>
			<Parametro>
				<Nome>Adquirente</Nome>
				<Valor>1</Valor>
			</Parametro>
			<Parametro>
				<Nome>CNPJ</Nome>
				<Valor>23424234</Valor>
			</Parametro>
			<Parametro>
				<Nome>NumeroDocumento</Nome>
				<Valor>9090</Valor>
			</Parametro>
        </Parametros>
        `);
        i ++;
        idProcesso ++;
    }
    documento.push(`
        </RespostaFiscal>
    </nfce>   
    `);
    let doc = `${this.nomenclatura}${idProcesso}_ped_resp-fis.xml`;
    fs.writeFileSync(this.destino + path.sep + doc, documento);
    $('#idProcessoRespFis').value = idProcesso;
    console.log(documento);
};