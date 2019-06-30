class Ball extends THREE.Object3D {
  constructor() {
    'use strict';
    super();
    this.data = new Data();
    this.createBall();

    //Speed and acceleration variables
    this.speed = 10;
    this.maxSpeed = 280;
    this.acceleration = 100;

    //Friction related variables
    this.mass = 10;
    this.frictionForce = this.mass * 90;

    //Direction variables
    this.direction = new THREE.Vector3((Math.random() * 2) - 1, 0, (Math.random() * 2) - 1).normalize();

    this.setPosition(this.data.ball_position[0], this.data.ball_position[1], this.data.ball_position[2]);

  }

  setPosition(x, y, z) {
    'use strict';
    this.position.set(x, y, z);
  }

  setDirection(vector) {
    'use strict';
    this.direction.copy(vector);
  }

  createBall() {
    'use strict';
    var material = new THREE.MeshBasicMaterial({color: this.data.ball_color, wireframe: true});
    var geometry = new THREE.SphereGeometry(this.data.radius, 20, 20);
    var ball = new THREE.Mesh(geometry, material);
    this.add(new THREE.AxisHelper(10));
    this.add(ball);
  }

  increaseSpeed(delta) {
    'use strict';
    this.speed += 10 * Math.random();
  }

  updateBallMovement(delta) {
    'use strict';

    var angle = -this.speed / ( Math.PI * this.data.radius ) * 2;
    var axis = new THREE.Vector3();
    axis.copy(this.direction);
    axis.cross(THREE.Object3D.DefaultUp);
    this.rotateOnAxis(axis, angle);

    var directionvector = new THREE.Vector3();
    directionvector.copy(this.direction); //Copies the vector to allow manipulation
    var ds = directionvector.multiplyScalar(this.speed); //Multiplies the direcvtion by the speed of the chair
    this.position.add(ds.multiplyScalar(delta)); //Multiplies by the time elapsed and adds to the current position
  }

}
