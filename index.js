const { app, BrowserWindow } = require('electron');

let mainWindow;


function craeteWindow() {
    
    mainWindow = new BrowserWindow({
    webPreferences: {
        nodeIntegration: true
    },
        width: 1080,
        height: 1080
    });
    mainWindow.loadURL(`file://${__dirname}/index.html`);
    mainWindow.on('closed', onClosed);
}

function onClosed() {
    mainWindow = null;
}


app.on('window-all-closed', () => {
    app.quit();
});

app.on('activate', () => {
    if(!mainWindow) craeteWindow();
});

app.on('ready', () => {
    craeteWindow();
});