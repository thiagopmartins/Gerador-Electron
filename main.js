const { app, BrowserWindow, ipcMain } = require('electron')

const path = require('path')
const url = require('url')
const fs = require('fs');

let mainWindow = null;
let modalWindow = null;
let ModalCnpj = null;
let ModalEmployees = null;
let integradorWindow = null;


function createWindow() {
  mainWindow = new BrowserWindow({
    width: 950,
    height: 750,
    autoHideMenuBar: true,
    icon: path.join(__dirname, 'img/logo.png')
  });

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  mainWindow.on('closed', () => {
    let dir = './data/arquivo.tmp';
    mainWindow = null;
    if (fs.existsSync(dir)) {
      fs.unlinkSync(dir);
    }
  });
  mainWindow.openDevTools();
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('ModalArquivo', () => {
  if (modalWindow == null) {
    modalWindow = new BrowserWindow({
      width: 700,
      height: 500,
      resizable: true,
      movable: false,
      minimizable: false,
      modal: true,
      autoHideMenuBar: true,
      parent: mainWindow,
      icon: path.join(__dirname, 'img/logo.png')
    });
    modalWindow.loadURL(url.format({
      pathname: path.join(__dirname, 'views/ArquivoBaseModal.html'),
      protocol: 'file:',
      slashes: true
    }));
  }
  modalWindow.on('closed', () => { modalWindow = null });
});
ipcMain.on('integradorWindow', () => {
  if (integradorWindow == null) {
    integradorWindow = new BrowserWindow({
      width: 600,
      height: 400,
      resizable: true,
      movable: true,
      minimizable: true,
      modal: true,
      autoHideMenuBar: true,
      icon: path.join(__dirname, 'img/logo.png')
    });
    integradorWindow.loadURL(url.format({
      pathname: path.join(__dirname, 'views/integrador.html'),
      protocol: 'file:',
      slashes: true
    }));
  }
  integradorWindow.on('closed', () => { integradorWindow = null });
});

ipcMain.on('atualizarIntegrador', (event, arg) => {
  if (integradorWindow != null) {
    integradorWindow.webContents.send('atualizarIntegrador', arg);
    console.log(arg);
  }
});

ipcMain.on('ModalCnpj', () => {
  if (ModalCnpj == null) {
    ModalCnpj = new BrowserWindow({
      width: 700,
      height: 600,
      resizable: true,
      movable: false,
      minimizable: false,
      modal: true,
      autoHideMenuBar: true,
      parent: mainWindow,
      icon: path.join(__dirname, 'img/logo.png')
    });
    ModalCnpj.loadURL(url.format({
      pathname: path.join(__dirname, 'views/CnpjModal.html'),
      protocol: 'file:',
      slashes: true
    }));
  }
  ModalCnpj.on('closed', () => { ModalCnpj = null; });
});

ipcMain.on('ModalEmployees', () => {
  if (ModalEmployees == null) {
    ModalEmployees = new BrowserWindow({
      width: 770,
      height: 500,
      resizable: true,
      movable: false,
      minimizable: false,
      modal: true,
      autoHideMenuBar: true,
      parent: mainWindow,
      icon: path.join(__dirname, 'img/logo.png')
    });
    ModalEmployees.loadURL(url.format({
      pathname: path.join(__dirname, 'views/EmployeesModal.html'),
      protocol: 'file:',
      slashes: true
    }));
  }
  ModalEmployees.on('closed', () => { ModalEmployees = null });
});