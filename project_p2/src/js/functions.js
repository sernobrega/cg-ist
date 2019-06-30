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
		case 69: //E
			case 101: //e
				main.scene.traverse(function (node) {
						if (node instanceof THREE.AxisHelper) {
								node.visible = !node.visible;
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

function Resize() {
  'use strict';

	main.renderer.setSize(window.innerWidth, window.innerHeight);

	var size = main.renderer.getSize();
	var ratio = size.width / size.height;

	var width = 300;
	var height = 150;

	if(main.camera instanceof THREE.OrthographicCamera) {
		if(ratio > (width/height)) {
			main.camera.left = (height * ratio)/(-2);
			main.camera.right = (height * ratio) / 2;
			main.camera.top = height / 2;
			main.camera.bottom = height / (-2);
		}

		else {
			main.camera.left = width / (-2);
			main.camera.right = width / 2;
			main.camera.top = (width / ratio) / 2;
			main.camera.bottom = (width / ratio) / (-2);
		}
	}

	else {
		main.camera.aspect = ratio;
	}

	main.camera.updateProjectionMatrix();
}
