'use strict';

let eventFuncs = 
{
	'set-active'(event){
		let nodes = Editor.Selection.curSelection('node');
		if (nodes && nodes.length != 0)
		{
			let active = cc.engine.getInstanceById(nodes[0]).active;
			for (let i = 0; i < nodes.length; i++) 
			{
				const id = nodes[i];
				let node = cc.engine.getInstanceById(id)
				if(node){
					node.active = !active;
				}
			}
		}
	}

};

module.exports = eventFuncs;