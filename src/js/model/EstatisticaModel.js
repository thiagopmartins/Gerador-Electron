const fs = require('fs');

class EstatisticaModel {

    totalProcessados(valores) {
        return valores.length;
    }

    totalTempos(valores) {
        return valores.reduce(function (a, b) { return a + b; });
    }

    mediaTempos(valores) {
        return this.totalTempos(valores) / this.totalProcessados(valores);
    }

    tempoMaximo(valores){
		let max = 0;
		for (let i = 0; i < valores.length; i++) {
			if(valores[i] > max)
				max = valores[i];
		}
		return max;		
	}

    mediaTotal(media, qtd) {
        return media / qtd;
    }

    mediaContingencia(contingencia, totalProcessados) {
        if (totalProcessados == 0) {
            return 0;
        } else { 
            return (contingencia * 100) / totalProcessados;
        }
        
    }

    totais(valores) {
        let documentos = 0;
        let media = 0;
        let count = 0;
        for (let i = 0; i < valores.length; i++) {
            if (valores[i][0] !== 0) {
                documentos = documentos + valores[i][0];
                media = media + valores[i][1];
                count++;
            }
        }
        let mediaTotal = this.mediaTotal(media, count).toFixed(3);       
        return ([documentos, mediaTotal]);
    }

}
module.exports = EstatisticaModel;