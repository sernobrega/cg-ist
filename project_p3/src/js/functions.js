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
	          	node.material.wireframe = !main.wire;
	          }
	        });
					main.wire = !main.wire;
	      break;

		case 69: //E
			case 101: //e
				main.scene.traverse(function (node) {
						if (node instanceof THREE.AxisHelper) {
								node.visible = !node.visible;
						}
				});
			break;

		case 72: //h
			main.scene.traverse(function (node) {
				if (node instanceof THREE.FaceNormalsHelper) {
					node.visible = !node.visible;
				}
			});
			break;

		case 76: //L
			case 108: //l
				if(main.lightCalc){
					plane.traverse(function (node) {
							if (node.material && (node.material.name == "lamb0" || node.material.name == "pho0")) {
									node.material = basicMaterials[0];
							}
							else if (node.material && (node.material.name == "lamb1" || node.material.name == "pho1")) {
									node.material = basicMaterials[1];
							}
							else if (node.material && (node.material.name == "lamb2" || node.material.name == "pho2")) {
									node.material = basicMaterials[2];
							}
							else if (node.material && (node.material.name == "lamb3" || node.material.name == "pho3")) {
									node.material = basicMaterials[3];
							}
				});
				main.lightCalc = !main.lightCalc;
				break;
			};
			main.lightCalc = !main.lightCalc;
			main.gourard = !main.gourard;

		case 71: //G
			case 103: //g
				if(main.gourard) {
					plane.traverse(function (node) {
							if (node.material && (node.material.name == "lamb0" || node.material.name == "bas0")) {
									node.material = phongMaterials[0];
							}
							else if (node.material && (node.material.name == "lamb1" || node.material.name == "bas1")) {
									node.material = phongMaterials[1];
							}
							else if (node.material && (node.material.name == "lamb2" || node.material.name == "bas2")) {
									node.material = phongMaterials[2];
							}
							else if (node.material && (node.material.name == "lamb3" || node.material.name == "bas3")) {
									node.material = phongMaterials[3];
							}
					});
				}
				else {
					plane.traverse(function (node) {
							if (node.material && (node.material.name == "pho0" || node.material.name == "bas0")) {
									node.material = lambertMaterials[0];
							}
							else if (node.material && (node.material.name == "pho1" || node.material.name == "bas1")) {
									node.material = lambertMaterials[1];
							}
							else if (node.material && (node.material.name == "pho2" || node.material.name == "bas2")) {
									node.material = lambertMaterials[2];
							}
							else if (node.material && (node.material.name == "pho3" || node.material.name == "bas3")) {
									node.material = lambertMaterials[3];
							}
					});
				}
				main.gourard = !main.gourard;
			break;

		case 78: //N
			case 110: //n
				if(directionalLight.intensity)
					directionalLight.intensity = 0;
				else
					directionalLight.intensity = 0.5;
			break;

		case 49: //1
			if(spotlight[0].active)
				main.scene.remove(spotlight[0]);
			else
				main.scene.add(spotlight[0]);

			spotlight[0].active = !(spotlight[0].active)
			break;

		case 50: //2
			if(spotlight[1].active)
				main.scene.remove(spotlight[1]);
			else
				main.scene.add(spotlight[1]);

			spotlight[1].active = !(spotlight[1].active)
			break;

		case 51: //3
			if(spotlight[2].active)
				main.scene.remove(spotlight[2]);
			else
				main.scene.add(spotlight[2]);

			spotlight[2].active = !(spotlight[2].active)
			break;

		case 52: //4
			if(spotlight[3].active)
				main.scene.remove(spotlight[3]);
			else
				main.scene.add(spotlight[3]);

			spotlight[3].active = !(spotlight[3].active)
			break;

		case 37: //left
			plane.controls.turnLeft = true;
			break;

		case 38: //up
			plane.controls.turnUp = true;
			break;

		case 39: //right
			plane.controls.turnRight = true;
			break;

		case 40: //down
			plane.controls.turnDown = true;
			break;

		case 78: // N
			main.sun = !(main.sun);
			break;

	}
}

function KeyUp(e) {
	'use strict';

	switch(e.keyCode) {
		case 37: //left
			plane.controls.turnLeft = false;
			break;

		case 38: //up
			plane.controls.turnUp = false;
			break;

		case 39: //right
			plane.controls.turnRight = false;
			break;

		case 40: //down
			plane.controls.turnDown = false;
			break;
	}
}

/*function Resize() {
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
}*/

function Resize() {
	'use strict'
	main.camera.aspect = window.innerWidth / window.innerHeight;
	main.camera.updateProjectionMatrix();
	main.renderer.setSize( window.innerWidth, window.innerHeight );
}
