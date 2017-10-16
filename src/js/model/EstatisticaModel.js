const fs = require('fs');

class EstatisticaModel {
      
        totalProcessados(valores){
		return valores.length;
        }
        
        totalTempos(valores) {
                return valores.reduce(function(a, b) { return a + b; });
        }

        mediaTempos(valores){
                return this.totalTempos(valores)/this.totalProcessados(valores);
        }

}
module.exports = EstatisticaModel;