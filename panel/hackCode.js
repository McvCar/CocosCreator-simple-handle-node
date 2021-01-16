(() => 
{
	const inputType = {"text":1,"password":1,"number":1,"date":1,"color":1,"range":1,"month":1,"week":1,"time":1,"email":1,"search":1,"url":1,"textarea":1}

	// 不是输入状态时
	function inputTypeChk(e){
		if (e.path[0] ){
			let type = e.path[0].type ;
			if ( inputType[type]){
				return true
			}
		}
	}

	let div = document.createElement('div');
	div.id = 'simple-handle-node'
	document.body.appendChild(div);
	
	div.addEventListener("keydown", (e) => 
	{
		if(e.key == 's' && !inputTypeChk(e)){
			e.preventDefault();// 吞噬捕获事件
			Editor.Scene.callSceneScript('simple-handle-node', 'set-active', {});
			return true
		}
	}, false);
})();