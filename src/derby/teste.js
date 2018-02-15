const JDBC = require('jdbc');
const jinst = require('jdbc/lib/jinst');

var config = {
    url: 'jdbc:derby://localhost:1527/myDB;create=true;user=me;password=mine',

    drivername: 'my.jdbc.DriverName',
    minpoolsize: 10,
    maxpoolsize: 100,
    user: 'SA',
    password: '',
    properties: {}
};

class Teste {

    constructor() {
        if (!jinst.isJvmCreated()) {
            jinst.addOption("-Xrs");
            jinst.setupClasspath([
                './drivers/derby.jar']);
        }
        var hsqldb = new JDBC(config);

        hsqldb.initialize(function (err) {
            if (err) {
                console.log(err);
            }
        });
    }
}

module.exports = Teste;