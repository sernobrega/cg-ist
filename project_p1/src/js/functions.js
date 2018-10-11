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
			main.setSideView();
			break;
		case 51: //3
			main.setFrontView();
			break;
		case 37: //left
	        main.chair.controls.turnLeft = true;
	        break;
	   	case 39: //right
	        main.chair.controls.turnRight = true;
	        break;
	    case 38: //front
	        main.chair.controls.moveForward = true;
	        break;
	    case 40: //back
	        main.chair.controls.moveBackward = true;
	        break;
	}
}

//
//keyDown:	function that acts when a key is up
//
function KeyUp(e) {
	'use strict';
    switch(e.keyCode) {
      case 37: //left
        main.chair.controls.turnLeft = false;
        break;
      case 39: //right
        main.chair.controls.turnRight = false;
        break;
      case 38: //front
        main.chair.controls.moveForward = false;
        break;
      case 40: //back
        main.chair.controls.moveBackward = false;
        break;
    }
}
