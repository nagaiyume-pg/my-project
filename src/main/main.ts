import path from "node:path";
const { app, BrowserWindow, ipcMain, dialog } = require('electron');

app.whenReady().then(() => {
    // アプリの起動イベント発火で BrowserWindow インスタンスを作成
    const mainWindow = new BrowserWindow({
        webPreferences: {
            contextIsolation: true,
            // webpack が出力したプリロードスクリプトを読み込み
            preload: path.join(__dirname, "preload.js"),
        },
        width: 600,
        height: 400,
        title: 'MyProject',
    });

    ipcMain.handle('open-dialog', async (_e: any, _arg: any) => {
        return dialog
            .showOpenDialog(mainWindow, {
                properties: ['openFile'],
            })
            .then((result: any) => {
                if (result.canceled) return '';
                return result.filePaths[0];
            });
    });

    mainWindow.webContents.openDevTools({ mode: 'detach' });
    // レンダラープロセスをロード
    mainWindow.loadFile("dist/index.html");
});

// すべてのウィンドウが閉じられたらアプリを終了する
app.once("window-all-closed", () => app.quit());