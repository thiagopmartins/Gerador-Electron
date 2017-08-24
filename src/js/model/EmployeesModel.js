const jsonfile = require('jsonfile-promised');
let data;
class EmployeesModal{    
    constructor(){
        let xmlhttp=new XMLHttpRequest();
        xmlhttp.open("GET", "http://172.31.255.126/BusinessCardAPI/api/Employees/getOff", false);
        xmlhttp.send();
        data = JSON.parse(xmlhttp.responseText);     
    }
    get funcionarios(){
        let funcionario;
        for(funcionario in data ){
            Object.getOwnPropertyNames(data[funcionario]).forEach(function(val, idx, array) {
                if(val == 'employeeName')
                    console.log(val + ' -> ' + data[funcionario][val]);
            });
                                
        } 
        console.log(Object.keys(data).length);        
    }
}
module.exports = EmployeesModal;