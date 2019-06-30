//
//keyDown:	function that acts when a key is pressed down
//
function KeyDown(e) {
	'use strict';

	switch(e.keyCode) {
		case 65: //A
		    case 119: //a
					table.mesh.material.wireframe = !table.mesh.material.wireframe;
					ball.mesh.material.wireframe = !ball.mesh.material.wireframe;
					for (var i = 0; i < 6; i++) {
						cube.mesh.material.materials[i].wireframe = !cube.mesh.material.materials[i].wireframe;
					}
	      break;

		case 69: //E
			case 101: //e
				main.scene.traverse(function (node) {
						if (node instanceof THREE.AxisHelper) {
								node.visible = !node.visible;
						}
				});
			break;

		case 76: //L
			case 108: //l
				if(main.lightCalc) {
					table.mesh.material = materialsBasic[0];
					ball.mesh.material = materialsBasic[1];
					cube.mesh.material.materials = materialsBasic[2];
					console.log(cube.mesh.material.materials);
				}

				else{
					table.mesh.material = materialsComplex[0];
					ball.mesh.material = materialsComplex[1];
					cube.mesh.material.materials = materialsComplex[2];
				}

				main.lightCalc = !main.lightCalc;
				break;

		case 68: //D
			case 100: //d
				if(directionalLight.intensity)
					directionalLight.intensity = 0;
				else
					directionalLight.intensity = 0.6;
			break;

		case 80: //P
			case 112: //p
				if(pointLight.intensity)
					pointLight.intensity = 0;
				else
					pointLight.intensity = 1;
			break;

		case 66: //B
			case 98: //b
				ball.flag = -ball.flag;
				break;

		case 83: //S
			case 115: //s

				main.pause = !main.pause;
				if(main.pause) {
					main.clock.stop();
					cancelAnimationFrame(main.frame);
					main.currentCamera = main.ortoCamera;
					main.render();
				}
				else {
					main.currentCamera = main.prespCamera;
					main.clock.start();
					main.frame = requestAnimationFrame(main.animate.bind(main));
				}
				break;

		case 82: //r
				main.createScene();
				main.clock.start();
				main.frame = requestAnimationFrame(main.animate.bind(main));
		break;

		}
}


function Resize() {
	'use strict';

	let oldHeight = main.viewportHeight;
	let oldWidth = main.viewportWidth;
	let newHeight = window.innerHeight;
	let newWidth = window.innerWidth;

	main.viewportHeight = newHeight;
	main.viewportWidth = newWidth;
	main.aspectRatio = newWidth / newHeight;

	let oldRadFOV = main.radVerticalFOV * Math.PI/180;
	let newRadVertFOV = 2 * Math.atan(Math.tan(oldRadFOV/2) * newHeight/oldHeight);
	main.radVerticalFOV = newRadVertFOV * 180/Math.PI;

	main.calculateHorizontalFOV();
	main.camera.aspect = main.aspectRatio;
	main.camera.updateProjectionMatrix();
	main.renderer.setSize(window.innerWidth, window.innerHeight);
}
