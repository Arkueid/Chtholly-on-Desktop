// 自定义的信号

const { ipcRenderer } = require('electron')

// 显示移动按钮
ipcRenderer.on('move-enabled', (ev, on) => {
	console.log(ev, on)
	let attr = null
	if (on) {
		console.log('move')
		attr = '1'
	}else {
		console.log('no move')
		attr = '0'
	}
	document.getElementById("drag").style['opacity'] = attr
})