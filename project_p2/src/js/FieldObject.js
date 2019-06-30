class FieldObject extends THREE.Object3D {
	constructor(x, y, z) {
		'use strict';
		super();

		this.setPosition(x, y, z);
	}

	setPosition(x, y, z) {
    	'use strict';
    	this.position.set(x, y, z);
  	}
}