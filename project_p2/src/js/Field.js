class Field extends THREE.Object3D {
  constructor() {
    'use strict'
    super();
    this.data = new Data();
    this.createFloor();
  }

  createFloor() {
    var material = new THREE.MeshBasicMaterial({ color: this.data.floor_color, wireframe: true });
    var geometry = new THREE.PlaneGeometry(this.data.floor_size[0], this.data.floor_size[1], 20, 20);
    var floor = new THREE.Mesh(geometry, material);
    floor.rotation.x += Math.PI/2;
    floor.position.set(this.data.floor_position[0], this.data.floor_position[1], this.data.floor_position[2]);
    this.add(floor);
  }
}
