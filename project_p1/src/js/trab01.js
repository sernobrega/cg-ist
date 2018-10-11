/*Variable Definition for objects*/
var renderer, scene, camera, controls;
var geometry, material, mesh;

/*Object constructor related functions*/
function createBox(obj, dim_x, dim_y, dim_z, x, y, z) {
    geometry = new THREE.CubeGeometry(dim_x, dim_y, dim_z);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function createTorus(obj, rad, tub, rad_seg, tube_seg, rot_x, x, y, z) {
    geometry = new THREE.TorusGeometry(rad, tub, rad_seg, tube_seg);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    mesh.rotation.x = rot_x;
    obj.add(mesh);
    return mesh;
}

function createCilinder(obj, open, rad_1, rad_2, h, rot_x, rot_y, rot_z, x, y, z){
  geometry = new THREE.CylinderGeometry(rad_1, rad_2, h, 30, 1, open);
  mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.set(rot_x, rot_y, rot_z);
  mesh.position.set(x, y, z);
  obj.add(mesh);
}

function createPlane(obj, comp, larg, x, y, z) {
  geometry = new THREE.PlaneGeometry(comp, larg, 50, 50);
  mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y, z);
  obj.add(mesh);
}

function createSphere(obj, rad, w_seg, h_seg, x, y, z) {
  geometry = new THREE.SphereGeometry(rad, w_seg, h_seg);
  mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y, z);
  obj.add(mesh);
}

/*function createCone(x, y, z) {
  geometry = new THREE.ConeGeometry()
}*/

/*var table = {
	position_x : 0,
	position_y : 0,
	position_z : 0,

	createTable: function(){

    }
}*/

function createTable(x, y, z) {
    var table = new THREE.Object3D();

    //tableTOP
    material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });

    createBox(table,80,5,120,0,0,0);

    //tableLEGS
    material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });

    createCilinder(table, open, 2, 2, 60, 0, 0, 0, -35, -32, -50);
    createCilinder(table, open, 2, 2, 60, 0, 0, 0, -35, -32, 50);
    createCilinder(table, open, 2, 2, 60, 0, 0, 0, 35, -32, 50);
    createCilinder(table, open, 2, 2, 60, 0, 0, 0, 35, -32, -50);

    table.position.set(x,y,z);

    scene.add(table);
}


function createFloor(x, y, z) {
  var floor = new THREE.Object3D();
  material = new THREE.MeshBasicMaterial({color: 0xffff00, wireframe: true});

  createPlane(floor, 200, 200, 0, 0, 0);

  floor.rotation.x = Math.PI / 2;
  floor.position.set(x, y, z);
  scene.add(floor);
}


function createLamp(x, y, z) {
    var lamp = new THREE.Object3D();

    //BASE

    var incl = Math.PI/13;
    var angle_1 = Math.PI*2/3;
    var angle_2 = Math.PI*4/3;

    material = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true});

    createCilinder(lamp, false, 0.4, 0.4, 80, 0, 0, incl, 5, 0, 0);
    createCilinder(lamp, false, 0.4, 0.4, 80, 0, angle_1, incl, 5*Math.cos(angle_1), 0, -5*Math.sin(angle_1));
    createCilinder(lamp, false, 0.4, 0.4, 80, 0, angle_2, incl, 5*Math.cos(angle_2), 0, -5*Math.sin(angle_2));

    //BULB SUPPORT

    incl = Math.PI/2;
    angle_1 = 0;
    angle_2 = Math.PI/2;
    var angle_3 = Math.PI;
    var angle_4 = 3*Math.PI/2;

    createTorus(lamp, 5, 0.4, 5, 20, Math.PI/2, 0, 39, 0);
    createTorus(lamp, 2, 0.2, 5, 20, Math.PI/2, 0, 39, 0);
    createCilinder(lamp, false, 0.2, 0.2, 3, 0, angle_1, incl, 3.2, 39, 0);
    createCilinder(lamp, false, 0.2, 0.2, 3, 0, angle_2, incl, 0, 39, -3.2);
    createCilinder(lamp, false, 0.2, 0.2, 3, 0, angle_3, incl, -3.2, 39, 0);
    createCilinder(lamp, false, 0.2, 0.2, 3, 0, angle_4, incl, 0, 39, 3.2);

    //ABAJOUR

    incl = -Math.PI/16;

    createCilinder(lamp, false, 0.2, 0.2, 20, 0, angle_1, incl, 7, 49, 0);
    createCilinder(lamp, false, 0.2, 0.2, 20, 0, angle_2, incl, 0, 49, -7);
    createCilinder(lamp, false, 0.2, 0.2, 20, 0, angle_3, incl, -7, 49, 0);
    createCilinder(lamp, false, 0.2, 0.2, 20, 0, angle_4, incl, 0, 49, 7);

    material = new THREE.MeshBasicMaterial({color: 0x808080, wireframe: true});

    createCilinder(lamp, true, 9, 16, 28, 0, 0, 0, 0, 45.5, 0);


    //BULB

    material = new THREE.MeshBasicMaterial({color: 0x00ffff, wireframe: true});

    createCilinder(lamp, false, 1.8, 1.8, 2.5, 0, 0, 0, 0, 40, 0);
    createSphere(lamp, 4, 50, 50, 0, 44, 0)


    lamp.position.set(x, y, z);

    scene.add(lamp);
}


function createChair(x, y, z) {
    var chair = new THREE.Object3D();

    material = new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe: true});

    //Back
    createBox(chair, 5, 20, 40, -20, 25, 0)
    createBox(chair, 5, 30, 5, -25, 12.5, 0);
    createBox(chair, 5, 5, 5, -20, 0, 0);

    //Base
    createBox(chair, 40, 5, 40, 0, 0, 0);

    //Legs
    createBox(chair, 5, 20, 5, 0, -12.5, 0);
    createBox(chair, 30, 5, 5, 0, -22.5, 0);
    createBox(chair, 5, 5, 30, 0, -22.5, 0);
    createBox(chair, 5, 5, 5, 12.5, -27.5, 0);
    createBox(chair, 5, 5, 5, -12.5, -27.5, 0);
    createBox(chair, 5, 5, 5, 0, -27.5, 12.5);
    createBox(chair, 5, 5, 5, 0, -27.5, -12.5);

    //Wheels
    createTorus(chair, 1, 2, 50, 100, 0, 12.5, -32.5, 0);
    createTorus(chair, 1, 2, 50, 100, 0, -12.5, -32.5, 0);
    createTorus(chair, 1, 2, 50, 100, 0, 0, -32.5, 12.5);
    createTorus(chair, 1, 2, 50, 100, 0, 0, -32.5, -12.5);

    chair.position.set(x, y, z);

    scene.add(chair);
}


function KeyDown(e) {
	//THE CODE IS GOING TO BE SIMPLIFIED- OrtographicCamera needs to be set every time due to the fact that we have a perspective one
	switch(e.keyCode) {
		case 65: //A
	    case 97: //a
	        scene.traverse(function (node) {
	            if (node instanceof THREE.Mesh) {
	                node.material.wireframe = !node.material.wireframe;
	            }
	        });
	        break;
		case 49: //1
			camera = new THREE.OrthographicCamera(window.innerWidth / - 8, window.innerWidth / 8, window.innerHeight / 8, window.innerHeight / - 8, 0.1, 1000); //To remove with perspective
			camera.position.set(0, 200, 0);
			camera.lookAt(scene.position);
			camera.updateProjectionMatrix();
			break;
		case 50: //2
			camera = new THREE.OrthographicCamera(window.innerWidth / - 8, window.innerWidth / 8, window.innerHeight / 8, window.innerHeight / - 8, 0.1, 1000); //To remove with perspective
			camera.position.set(0, 45, 100);

			camera.updateProjectionMatrix();
			break;
		case 51: //3
			camera = new THREE.OrthographicCamera(window.innerWidth / - 8, window.innerWidth / 8, window.innerHeight / 8, window.innerHeight / - 8, 0.1, 1000); //To remove with perspective
			camera.position.set(-100, 45, 0);
			camera.rotation.y = - (90 * Math.PI / 180);
			camera.updateProjectionMatrix();
			break;
	}

}

/*Init Function*/
function init() {
  renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  scene = new THREE.Scene();
  scene.add(new THREE.AxisHelper(10));


  createChair(0, 35.5, 0);
  createFloor(0, 0, 0);
  createLamp(80, 39, 80);
  createTable(50, 62, 0);

 	camera = new THREE.OrthographicCamera(window.innerWidth / -8, window.innerWidth / 8, window.innerHeight / 8, window.innerHeight / - 8, 0.1, 1000);
 	camera.position.set(0, 200, 0);
  camera.lookAt(scene.position);

  //controls = new THREE.OrbitControls(camera);

  renderer.render(scene, camera);

  window.addEventListener("keydown", KeyDown);

}

function animate() {
	renderer.render(scene, camera);
  	//controls.update();
	requestAnimationFrame(animate);
}
