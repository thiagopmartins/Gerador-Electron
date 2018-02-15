const log4js = require('log4js');

let logger = null;
class Log {
    constructor(){
        log4js.configure({
          appenders: { gerador: { type: 'file', filename: 'logs/gerador.log' } },
          categories: { default: { appenders: ['gerador'], level: 'info' } }
        });
        logger = log4js.getLogger('gerador');
    }
    escreve(texto) {
        logger.info(texto);
    }
    escreveError(texto) {
        logger.error(texto);
    }
}
module.exports = Log;