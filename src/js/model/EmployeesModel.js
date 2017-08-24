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
                let nome = "";
                let login = "";

                login = data[funcionario]['EmployeeLogon'];
                nome = data[funcionario]['EmployeeName'];
     
                document.getElementById("showEmployeesList").innerHTML += '<ul class="listEmployees"><li class="viewEmployees"><img src="http://172.31.255.126/BusinessCard/Images/faces/' + login + '.jpg?n=54"><p class="employeesNames">' + nome + '</p></li></ul>';         
            });
                                
        } 
        console.log(Object.keys(data).length);        
    }
}
module.exports = EmployeesModal;