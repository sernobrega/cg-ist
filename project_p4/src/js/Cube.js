class Cube extends THREE.Object3D {
  constructor() {
    'use strict';
    super();
    this.geometry;
    this.texture;
    this.materials;
    this.mesh;
    this.build();
  }

  build () {

    var geometry = new THREE.BoxGeometry(30, 30, 30);
    /*var j = 0;
    for (var i = 0; i < 12; i++) {
      geometry.faces[i].materialIndex = j;
    }*/
    geometry.faces[0].materialIndex = 0;
    geometry.faces[1].materialIndex = 0;
    geometry.faces[2].materialIndex = 1;
    geometry.faces[3].materialIndex = 1;
    geometry.faces[4].materialIndex = 2;
    geometry.faces[5].materialIndex = 2;
    geometry.faces[6].materialIndex = 3;
    geometry.faces[7].materialIndex = 3;
    geometry.faces[8].materialIndex = 4;
    geometry.faces[9].materialIndex = 4;
    geometry.faces[10].materialIndex = 5;
    geometry.faces[11].materialIndex = 5;

    this.geometry = geometry;
    this.materials = materialsComplex[2];
    this.mesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(this.materials));

    this.mesh.position.set(0, 15, 0);

    this.add(this.mesh);
  }

}
