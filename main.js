const { app, BrowserWindow, Menu, Tray, ipcMain } = require('electron')

app.on('window-all-closed', ()=>{
    if (process.platform !== 'darwin')
        app.quit()
})

const createWindow = ()=>{
    const win = new BrowserWindow({
        width: 360,
        height: 530,
        frame: false,
        transparent: true,
        resizable: false,
        webPreferences: {
            preload: __dirname + '/plugin.js'
        }
    })

    if (process.platform !== 'darwin') win.setSkipTaskbar(true)
    else app.dock.hide()

    win.loadFile('./index.html')

    const handleHideClick = (t, w, e) => {
        if (t.checked) win.hide()
        else win.show()
    }

    const handleTransClick = (t, w, e) => {
        win.setIgnoreMouseEvents(t.checked, {forward: true})
    }

    const handleQuitClick = (t, w, e) => {
        app.quit()
    }

    const handleMoveClick = (t, w, e) => {
        win.webContents.send('move-enabled', t.checked)
    }

    const handleOnTopClick = (t, w, e) => {
        win.setAlwaysOnTop(t.checked)
    }

    const tray = new Tray(__dirname + '/favicon.jpg')
    const menu = Menu.buildFromTemplate([
        { label: '隐藏', type: 'checkbox', click: handleHideClick },
        { label: '置顶', type: 'checkbox', click: handleOnTopClick },
        { label: '穿透', type: 'checkbox', click: handleTransClick },
        { label: '移动', type: 'checkbox', click: handleMoveClick },
        {type: 'separator'},
        { label: '退出', type: 'normal', click: handleQuitClick }
    ])
    tray.setContextMenu(menu)
}

app.whenReady().then(()=>{
    createWindow()
})