class OfficeObject extends THREE.Object3D {
	constructor(x, y, z) {
		'use strict'; //Avoids creating global variables
		super(); //Properties of Object3D
		this.setPosition(x, y, z); //Method of the class
	}

	//
	//setPosition: method responsible for setting the position of an Office Object
	//Arguments:	 receives x, y, z
	//
	setPosition(x, y, z) {
		'use strict';
		this.position.set(x, y, z);
	}

	//
	//createBox: 	method responsible for creating a box in THREE.js
	//Arguments:	receives the material, dimensions and position
	//
	createBox(material, width, height, depth, x, y, z) {
		'use strict';
	    var geometry = new THREE.CubeGeometry(width, height, depth);
	    var mesh = new THREE.Mesh(geometry, material);

	    mesh.position.set(x, y, z);
	    this.add(mesh);

			return mesh;
	}

	//
	//createTorus: 	method responsible for creating a Torus in THREE.js
	//Arguments:	receives the material, dimensions and position
	//
	createTorus(material, rad, tube, radSeg, tubeSeg, xRotation, x, y, z) {
		'use strict';
	    var geometry = new THREE.TorusGeometry(rad, tube, radSeg, tubeSeg);
	    var mesh = new THREE.Mesh(geometry, material);

	    mesh.position.set(x, y, z);
	    mesh.rotation.x = xRotation;
	    this.add(mesh);

			return mesh;
	}

	//
	//createCylinder: 	method responsible for creating a cylinder in THREE.js
	//Arguments:				receives the material, dimensions, rotations and position
	//
	createCylinder(material, radiusTop, radiusBottom, height, xRotation, yRotation, zRotation, x, y, z){
		'use strict';
		var geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, 30, 1, open);
		var mesh = new THREE.Mesh(geometry, material);

		mesh.rotation.set(xRotation, yRotation, zRotation);
		mesh.position.set(x, y, z);
		this.add(mesh);

		return mesh;
	}

	//
	//createSphere: 	method responsible for creating a sphere in THREE.js
	//Arguments:			receives the material, dimensions and position
	//
	createSphere(material, rad, width, height, x, y, z) {
		'use strict';
		var geometry = new THREE.SphereGeometry(rad, width, height);
		var mesh = new THREE.Mesh(geometry, material);

		mesh.position.set(x, y, z);
		this.add(mesh);

		return mesh;
	}

}
