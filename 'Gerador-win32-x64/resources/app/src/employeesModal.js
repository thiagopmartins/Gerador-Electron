const EmployeesModel = require('./js/model/EmployeesModel.js');

let employeesModel;

window.onload = function(){
    let $ = document.querySelector.bind(document);
    employeesModel = new EmployeesModel();
    employeesModel.funcionarios;
};
