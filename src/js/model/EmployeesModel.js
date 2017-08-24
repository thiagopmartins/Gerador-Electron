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
        let name;
        let login;
        for(funcionario in data ){
            Object.getOwnPropertyNames(data[funcionario]).forEach(function(val, idx, array) {
                if(val == 'employeeLogon') {
                    document.getElementById("showEmployeesList").innerHTML += '<ul class="listEmployees"><li class="viewEmployees"><img src="http://172.31.255.126/BusinessCard/Images/faces/' + data[funcionario][val] + '.jpg?n=54"><p class="employeesNames">' + data[funcionario][val] + '</p></li></ul>';     
                }              
            });
                                
        } 
        console.log(Object.keys(data).length);        
    }
}
module.exports = EmployeesModal;