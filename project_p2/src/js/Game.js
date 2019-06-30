class Game {
  constructor() {
    'use strict';
    this.data = new Data();
    this.scene;
    this.direction = new THREE.Vector3();
    this.cameraDirection = new THREE.Vector3();
    this.camera;
    this.controls;
    this.renderer;
    this.cameraFollow = false;
    this.ball = [];
    this.wall;
    this.last = 0;
    this.now;
  }

  createScene() {
    'use strict';
    var scene = new THREE.Scene();
    this.scene = scene;

    this.createFloor();
    this.createWalls();
    this.createBalls();
    this.setTopView();

    this.controls = this.createControls();
    //scene.add(new THREE.AxisHelper(10));
  }

  //
  //setTopView: method responsible for setting the camera of topView
  //
  setTopView() {
    'use strict';
    this.cameraFollow = false;
    var ratio = this.data.camera_ratio;
    var camera = new THREE.OrthographicCamera(window.innerWidth / - ratio, window.innerWidth / ratio, window.innerHeight / ratio, window.innerHeight / - ratio);

    camera.position.set(0, window.innerWidth / 6, 0); //Camera is set on position y = 200
    camera.lookAt(this.scene.position); //Camera looks at the center of the scene (0, 0, 0)
    camera.updateProjectionMatrix();
    this.camera = camera;
  }

  //
  //setPerspectiveView: method responsible for setting the camera of perspectiveView
  //
  setPerspectiveView() {
    'use strict';
    this.cameraFollow = false;
    var ratio = this.data.camera_ratio;
    var camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);

    camera.position.set(200, 100, 0); //Camera is set on the position x = -200, y = 45
    camera.lookAt(this.scene.position);
    camera.updateProjectionMatrix();
    this.camera = camera;
  }

  //
  //setFollowView: method responsible for setting the camera to follow a ball
  //
  setFollowView() {
    'use strict';
    //var cameraOffset = relativeCameraOffset.applyMatrix4(MovingCube.matrixWorld);

    var ratio = this.data.camera_ratio;
    var camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);

    camera.position.x = this.ball[0].position.x + 20;
    camera.position.y = this.ball[0].position.y + 40;
    camera.position.z = this.ball[0].position.z;
    console.log(this.ball[0].position);
    camera.lookAt(this.ball[0].position);
    this.camera = camera;
    this.cameraFollow = true;
  }

  //
  //updateCameraLook: method responsible for updating the camera when following a ball
  //
  updateCameraLook() {
    'use strict';
    if(this.cameraFollow) {

      var cameraOffset = new THREE.Vector3(0, 40, 20);

      this.camera.position.x = this.ball[0].position.x + 20;
      this.camera.position.y = this.ball[0].position.y + 40;
      this.camera.position.z = this.ball[0].position.z;

      this.camera.lookAt(this.ball[0].position);
    }
  }


  createRenderer() {
    'use strict';
    this.renderer = new THREE.WebGLRenderer({antialias: true});
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
  }

  createControls() {
    'use strict';
    var controls = new THREE.OrbitControls(this.camera);
    return controls;
  }

  createFloor() {
    'use strict';
    var field = new Field();
    this.scene.add(field);
  }

  createWalls() {
    'use strict';
    var walls = [];
    walls[0] = new Wall(2, this.data.right_position[0], this.data.right_position[1], this.data.right_position[2]);
    walls[1] = new Wall(2, this.data.left_position[0], this.data.left_position[1], this.data.left_position[2]);
    walls[2] = new Wall(1, this.data.front_position[0], this.data.front_position[1], this.data.front_position[2]);
    walls[3] = new Wall(1, this.data.back_position[0], this.data.back_position[1], this.data.back_position[2]);

    for(var i = 0; i < 4; i++) {
      this.scene.add(walls[i]);
    }

    this.wall = walls;
  }

  randFloat(low, high) {
    'use strict';
    return low + Math.random() * ( high - low );
  }

  createBalls() {
    'use strict';
    var balls = [];
    for (var i = 0; i < this.data.n_balls; i++) {
      do {
        var positionCorrection = false;
        var x = this.randFloat(-99+this.data.radius, 99-this.data.radius);
        var z = this.randFloat(-49+this.data.radius, 49-this.data.radius);
        //console.log("X:" + x + " Z:" + z);

        var len = this.ball.length;
        for(var t = 0; t < len; t++) {
          //console.log(t);
          //console.log(this.ball[t].position);
          if(x - this.ball[t].position.x != 0 && z - this.ball[t].position.z != 0) {
            if(Math.pow(x - this.ball[t].position.x, 2) + Math.pow(z - this.ball[t].position.z, 2) <= Math.pow(2*this.data.radius, 2))
              positionCorrection = true;
          }
        }
      //console.log(positionCorrection);
      }while(positionCorrection);

      balls[i] = new Ball();
      balls[i].setPosition(x, this.data.ball_position[1], z);

      this.scene.add(balls[i]);
      this.ball = balls;
    }

  }

  staticCollision() {
    'use strict';
    for(var ball1 in this.ball){
      for(var ball2 in this.ball) {
          if(this.ball[ball1] != this.ball[ball2] && this.ball[ball1].position.distanceTo(this.ball[ball2].position) < 2*this.data.radius) {
            var theta = Math.atan2((this.ball[ball1].position.z - this.ball[ball2].position.z), (this.ball[ball1].position.x - this.ball[ball2].position.x));
            var overlap = 2*this.data.radius - this.ball[ball1].position.distanceTo(this.ball[ball2].position);
            this.ball[ball2].position.x -= overlap * Math.cos(theta);
            this.ball[ball2].position.z -= overlap * Math.sin(theta);
          }
      }
    }
  }

  hasCollision() {
    'use strict';
    //colisões entre bolas
    for(var ball1 in this.ball){
      for(var ball2 in this.ball) {
        if(this.ball[ball1] != this.ball[ball2] && this.ball[ball1].position.distanceTo(this.ball[ball2].position) <= 2*this.data.radius) {
          var v1 = new THREE.Vector3();
          v1.copy(this.ball[ball1].direction);
          v1.multiplyScalar(this.ball[ball1].speed);

          var v2 = new THREE.Vector3();
          v2.copy(this.ball[ball2].direction);
          v2.multiplyScalar(this.ball[ball2].speed);

          var m1 = this.ball[ball1].mass;
          var m2 = this.ball[ball2].mass;

          var c1 = new THREE.Vector3();
          c1.copy(this.ball[ball1].position);
          var c2 = new THREE.Vector3();
          c2.copy(this.ball[ball2].position);

          var norma = c1.distanceTo(c2);
          var m = 2*m2 / (m1 + m2);

          var new_v1 = new THREE.Vector3();
          new_v1.copy(v1);

          c1.sub(c2);
          v1.sub(v2);
          v1.multiply(c1);
          v1.divideScalar(Math.pow(norma, 2));
          v1.multiply(c1);
          v1.multiplyScalar(m);

          new_v1.sub(v1);
          new_v1.normalize();

          var new_v2 = new THREE.Vector3();
          new_v2.copy(new_v1);
          new_v2.multiplyScalar(-1);

          /*c2.sub(c1);
          v2.sub(v1_r);
          v2.multiply(c2);
          v2.divideScalar(Math.pow(norma, 2));
          v2.multiply(c2);
          v2.multiplyScalar(m);

          new_v2.sub(v2);
          new_v2.normalize();*/
          console.log(new_v1);
          this.ball[ball1].setDirection(new_v1);
          this.ball[ball2].setDirection(new_v2);

          var separate = (2*this.data.radius - norma) / 2;

          this.ball[ball1].position.add(new_v1.multiplyScalar(separate));
          this.ball[ball2].position.add(new_v2.multiplyScalar(separate));
        }
      }

      var right_limit = this.data.right_position[0] - this.data.walls_depth/2;
      var left_limit = this.data.left_position[0] + this.data.walls_depth/2;
      var back_limit = this.data.back_position[2] + this.data.walls_depth/2;
      var front_limit = this.data.front_position[2] - this.data.walls_depth/2;

      var radius = this.data.radius;

      var ball_x = this.ball[ball1].position.x;
      var ball_z = this.ball[ball1].position.z;

      //new ball direction
      if(ball_x + radius > right_limit || ball_x - radius < left_limit){
        this.ball[ball1].direction.setX(-this.ball[ball1].direction.x);
      }

      if(ball_z + radius > front_limit || ball_z - radius < back_limit){
        this.ball[ball1].direction.setZ(-this.ball[ball1].direction.z);
      }

      //correcting ball position
      if(ball_x + radius > right_limit){
        this.ball[ball1].position.setX(right_limit - radius);
      }

      if(ball_x - radius < left_limit){
        this.ball[ball1].position.setX(left_limit + radius);
      }

      if(ball_z + radius > front_limit){
        this.ball[ball1].position.setZ(front_limit - radius);
      }

      if(ball_z - radius < back_limit){
        this.ball[ball1].position.setZ(back_limit + radius);
      }
    }
    return false;
  }

  //
  //render: renders the scene with a given camera
  //
  render() {
  	'use strict';
  	this.renderer.render(this.scene, this.camera);
  }

  //
  //init: method responsible for initiating - creates the renderer, the scene,
  //starts the clock and has the addEventListener
  //
  init() {
    'use strict';
    this.createScene();
    this.createRenderer();

    this.clock = new THREE.Clock;
    this.clock.start();

    this.render();
    this.animate();

    window.addEventListener("keydown", KeyDown);
    window.addEventListener("resize", Resize);
  }

  //
  //animate: function responsible for updating the display constantly
  //

  animate(now) {
    'use strict';
    // var elapsed = this.clock.getElapsedTime();

    // if(Math.floor(elapsed) > 0 && elapsed % 5 < 0.05 ) {
    //   this.ball[1].increaseSpeed(elapsed);
    //   this.clock.getDelta();
    // }

    if(!this.last || now - this.last >= 3*1000) {
      this.last = now;
      for(var i = 0; i < this.data.n_balls; i++) {
        this.ball[i].increaseSpeed();
      }
    }

    var delta = this.clock.getDelta();

    for(var i = 0; i < this.data.n_balls; i++) {
      this.ball[i].updateBallMovement(delta);
    }

    this.hasCollision();
    this.staticCollision();

    this.updateCameraLook();

    this.controls.update();
    this.render();
    requestAnimationFrame(this.animate.bind(this));
  }

}
