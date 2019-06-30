class Ball extends THREE.Object3D {
  constructor() {
    'use strict';
    super();

    this.material;
    this.geometry;
    this.mesh;
    this.orbit = 40;
    this.radius = 15;

    this.move = true;
    this.flag = -1;
    this.velocity = 0;
    this.maxVelocity = 0.005;
    this.minVelocity = 2;
    this.acceleration = 0.0005;
    this.angularVelocity = this.orbit / this.radius * 2*Math.PI;

    this.createGeometry();
  }

  createGeometry() {
    'use strict';
    this.geometry = new THREE.SphereGeometry(this.radius, 32, 32);
    this.material =  materialsComplex[1];
    this.mesh = new THREE.Mesh( this.geometry, this.material );

    this.mesh.position.x = this.orbit;
    this.add(this.mesh);
    this.position.set(0, 15, 0);

  }

  moveBall(delta) {
    'use strict';
    this.velocity += this.acceleration * delta * this.flag;
    if (this.velocity > this.maxVelocity) {
      this.velocity = this.maxVelocity;
    }
    if (this.velocity < 0) {
      this.velocity = 0;
    }
  }

  updateBall(delta) {
    'use strict';

    this.rotation.y += this.velocity * this.angularVelocity;
    this.mesh.rotation.x -= this.velocity * this.angularVelocity;

  }
}
