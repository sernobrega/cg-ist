class Spotlight extends THREE.Object3D {
  constructor(x, y, z) {
    'use strict';
    super();
    this.active = false;
    this.createLight(x, y, z);
  }

  createLight(x, y, z) {
    'use strict';

    var spotlight = new THREE.SpotLight(0xffffff, 0.5, 400, Math.PI/2);
    spotlight.position.set(x, y, z);
    spotlight.castShadow = true;
    spotlight.shadow.mapSize.width = 1024;
    spotlight.shadow.mapSize.height = 1024;

    spotlight.shadow.camera.near = -200;
    spotlight.shadow.camera.far = 1000;
    spotlight.shadow.camera.fov = 300;

    this.add(spotlight);
  }
}
