class Wall extends THREE.Object3D {
	constructor(a, x, y, z) {
	   'use strict'
	   super();
	   this.data = new Data();
	   this.createWall(a);
	   this.position.set(x, y, z);
 	}

 	createWall(a) {
 		'use strict';
 		var geometry = new THREE.CubeGeometry(this.data.long_walls_width / a, this.data.walls_height, this.data.walls_depth);
 		var material = new THREE.MeshBasicMaterial({ color: this.data.walls_color, wireframe: true });
 		var wall = new THREE.Mesh(geometry, material);
 		if(a == 2)
 			wall.rotation.y = Math.PI/2;
 		this.add(wall);
 	}
}