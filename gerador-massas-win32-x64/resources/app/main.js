const { app, BrowserWindow, ipcMain } = require('electron')

const path = require('path')
const url = require('url')
const fs = require('fs');

let mainWindow = null;
let modalWindow = null;
let ModalCnpj = null;
let ModalEmployees = null;

if (handleSquirrelEvent(app)) {
    // squirrel event handled and app will exit in 1000ms, so don't do anything else
    return;
}


function createWindow () {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 650,
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
    if(fs.existsSync(dir)){
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
  if(modalWindow == null){
    modalWindow = new BrowserWindow({
      width: 700,
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
  modalWindow.openDevTools();
  modalWindow.on('closed', () => { modalWindow = null });  
});
ipcMain.on('ModalCnpj', () => {
  if(ModalCnpj == null){
    ModalCnpj = new BrowserWindow({
      width: 700,
      height: 600,
      resizable:  true,
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
  ModalCnpj.openDevTools();
  ModalCnpj.on('closed', () => { ModalCnpj = null; });  
});

ipcMain.on('ModalEmployees', () => {
  if(ModalEmployees == null){
    ModalEmployees = new BrowserWindow({
      width: 770,
      height: 500,
      resizable:  true,
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
  ModalEmployees.openDevTools();
  ModalEmployees.on('closed', () => { ModalEmployees = null });  
});
function handleSquirrelEvent(application) {
  if (process.argv.length === 1) {
      return false;
  }

  const ChildProcess = require('child_process');
  const path = require('path');

  const appFolder = path.resolve(process.execPath, '..');
  const rootAtomFolder = path.resolve(appFolder, '..');
  const updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'));
  const exeName = path.basename(process.execPath);

  const spawn = function(command, args) {
      let spawnedProcess, error;

      try {
          spawnedProcess = ChildProcess.spawn(command, args, {
              detached: true
          });
      } catch (error) {}

      return spawnedProcess;
  };

  const spawnUpdate = function(args) {
      return spawn(updateDotExe, args);
  };

  const squirrelEvent = process.argv[1];
  switch (squirrelEvent) {
      case '--squirrel-install':
      case '--squirrel-updated':
          // Optionally do things such as:
          // - Add your .exe to the PATH
          // - Write to the registry for things like file associations and
          //   explorer context menus

          // Install desktop and start menu shortcuts
          spawnUpdate(['--createShortcut', exeName]);

          setTimeout(application.quit, 1000);
          return true;

      case '--squirrel-uninstall':
          // Undo anything you did in the --squirrel-install and
          // --squirrel-updated handlers

          // Remove desktop and start menu shortcuts
          spawnUpdate(['--removeShortcut', exeName]);

          setTimeout(application.quit, 1000);
          return true;

      case '--squirrel-obsolete':
          // This is called on the outgoing version of your app before
          // we update to the new version - it's the opposite of
          // --squirrel-updated

          application.quit();
          return true;
  }
};