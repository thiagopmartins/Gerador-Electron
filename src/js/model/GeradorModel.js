const jsonfile = require('jsonfile-promised');
const ConfigModel = require('../model/ConfigModel.js');

const fs = require('fs');
const path = require('path');
const dir = './data/';
const filename = 'config.json';

class GeradorModel {
    constructor() {
        configModal = new ConfigModel();
        configModal.pegarDados();
    }
    
}

module.exports = GeradorModel;