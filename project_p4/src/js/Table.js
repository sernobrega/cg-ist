class Table extends THREE.Object3D {
  constructor() {
    'use strict';
    super();
    this.geometry;
    this.material;
    this.mesh;
    this.createGeometry();
  }

  createGeometry() {
    'use strict';
    this.geometry = new THREE.BoxGeometry(150, 150, 2);
    this.material =  materialsComplex[0];
    this.mesh = new THREE.Mesh( this.geometry, this.material );
    this.mesh.rotation.x = - Math.PI /2;
    this.mesh.position.y = -1;
    this.add(this.mesh);
  }
}
