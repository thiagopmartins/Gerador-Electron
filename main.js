const { app, BrowserWindow, ipcMain } = require('electron')

const path = require('path')
const url = require('url')


let mainWindow = null;
let modalWindow = null;

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 750,
    autoHideMenuBar: true,
    icon: path.join(__dirname, 'img/logo.png')
  });

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  mainWindow.on('closed', () => { mainWindow = null })
  
  //mainWindow.openDevTools();
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
  if(modalWindow == null){
    modalWindow = new BrowserWindow({
      width: 500,
      height: 500,
      resizable:  true,
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