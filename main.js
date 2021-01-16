'use strict';
const fs = require('fs');
module.exports = {

	load() 
	{
		try {
		  if (Editor.Window.main.nativeWin.webContents.__injected_handle_widget) {
			// in case plugin if reloaded
			return;
		  }
		} catch(error) {
		  // usually happen when creator is just started and main window is not created
		  Editor.log(error);
		}
	
		// todo: 如果插件是中途加载的，判断webContents如果就绪了就注入
		const electron = require('electron');
		electron.app.on('web-contents-created', (sender, webContents) => {
			webContents.on('dom-ready', (e) => {
				this.injectFn(e.sender);
			});
		});
	},

	// 往web环境里写代码，添加键盘监听事件
	injectFn(webContents){
		if (webContents.__injected_handle_widget) {
			// already injected
			return;
		  }
		  webContents.__injected_handle_widget = true;
		
		  let hackCode = fs.readFileSync(Editor.url('packages://simple-handle-node/panel/hackCode.js')).toString();
		  webContents.executeJavaScript(hackCode, function(result) {
		  });
	},

	unload() {
	},

	messages: {
		'set-active'() {
			Editor.Scene.callSceneScript('simple-handle-node', 'set-active', {});
		},
	},
};