//
//keyDown:	function that acts when a key is pressed down
//
function KeyDown(e) {
	'use strict';
	switch(e.keyCode) {
		case 65: //A
	    case 97: //a
	        main.scene.traverse(function (node) {
	            if (node instanceof THREE.Mesh) {
	                node.material.wireframe = !node.material.wireframe;
	            }
	        });
	        break;
		case 49: //1
			main.setTopView();
			break;
		case 50: //2
			main.setPerspectiveView();
			break;
		case 51: //3
			main.setFollowView();
			break;
	}
}