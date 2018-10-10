const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

const phpBin = (process.platform !== 'darwin') ? "/bin-win/php" : "/bin-mac/php";
const connect = require("gulp-connect-php");
const address = "127.0.0.1";
const port = 5000;
const con = connect.server({
	port: port,
	hostname: address,
	base: path.resolve(__dirname),
	keepalive: false,
	open: false,
	bin: path.resolve(__dirname)+phpBin,
	root: "/",
	stdio: "inherit"
})

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win
let webContents

function createWindow () {
	// Create the browser window.
	win = new BrowserWindow({
		width: 3840,
		height: 1080,
		x: 0,
		y: 0,//0
		frame: false,//false
		resizable: false,
		movable: true,//false
		minimizable: false,
		maximizable: false,
		closable: true,//false
		alwaysOnTop: false,//true
		fullscreen: false,
		fullscreenable: false,
		kiosk: false,//true
		title: "Algographe",
		acceptFirstMouse: true,
		enableLargerThanScreen: true,
		transparent: false,
		thickFrame: false,
		backgroundThrottling: false,
		webPreferences:
		{
 			nodeIntegration: false
 		}
	})

	win.setSize(3840, 1080)

	// and load the index.html of the app.
	// win.loadURL(url.format({
	// 	pathname: path.join(__dirname, 'index.php'),
	// 	protocol: 'file:',
	// 	slashes: true
	// }))
	//win.loadURL("http://"+address+":"+port+"/app")
	setTimeout(function(){
		win.loadURL("http://"+address+":"+port+"/app")
	}, 5000)

	// Open the DevTools.
	//win.webContents.openDevTools()
	webContents = win.webContents
	webContents.on('did-finish-load', () => {
		webContents.setZoomFactor(1)
		webContents.setVisualZoomLevelLimits(1, 1)
		webContents.setLayoutZoomLevelLimits(0, 0)
	})

	// Emitted when the window is closed.
	win.on('closed', () => {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		win = null
	})
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
	// On macOS it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (win === null) {
		createWindow()
	}
})

app.commandLine.appendSwitch('touch-events', 'enabled');

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.