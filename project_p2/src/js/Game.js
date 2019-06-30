class Game {
  constructor() {
    'use strict';
    this.data = new Data();
    this.scene;
    this.camera;
    this.controls;
    this.renderer;
    this.cameraFollow = false;
    this.ball = [];
    this.wall;
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
    scene.add(new THREE.AxisHelper(10));
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
    var cameraOffset = new THREE.Vector3(0, 40, 20);
    //var cameraOffset = relativeCameraOffset.applyMatrix4(MovingCube.matrixWorld);

    var ratio = this.data.camera_ratio;
    var camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);

    camera.position.x = cameraOffset.x;
    camera.position.y = cameraOffset.y;
    camera.position.z = cameraOffset.z;
    console.log(this.ball[0].position);
    camera.lookAt(this.ball[0].position);
    this.camera = camera;
    this.cameraFollow = true;
  }

  //
  //updateCameraLook: method responsible for updating the camera when following a ball
  //
  updateCameraLook() {
    if(this.cameraFollow)
      this.camera.lookAt(this.ball[0].position);
  }


  createRenderer() {
    'use strict';
    this.renderer = new THREE.WebGLRenderer({antialias: true});
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
  }

  createControls() {
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
        console.log("X:" + x + " Z:" + z);

        var len = this.ball.length;
        for(var t = 0; t < len; t++) {
          console.log(t);
          console.log(this.ball[t].position);
          if(x - this.ball[t].position.x != 0 && z - this.ball[t].position.z != 0) {
            if(Math.pow(x - this.ball[t].position.x, 2) + Math.pow(z - this.ball[t].position.z, 2) <= Math.pow(2*this.data.radius, 2))
              positionCorrection = true;
          }
        }
        console.log(positionCorrection);
      }while(positionCorrection);

      balls[i] = new Ball();
      balls[i].setPosition(x, this.data.ball_position[1], z);

      this.scene.add(balls[i]);
      this.ball = balls;
    }
    
  }

  hasCollision(object, origPos) {
    //colisões entre bolas
    for(var i = 0; i < this.ball.length; i++) {
      if(this.ball[i] != object) {
        if(object.position.x - this.ball[i].position.x != 0 && object.position.z - this.ball[i].position.z != 0)
          if(object.position.distanceTo(this.ball[i].position) <= 2*this.data.radius) {
            object.handleCollision(this.ball[i], origPos);
          }
      }
    }

    for(i = 0; i < 4; i++) {
      if(this.wall[i].position.x == this.data.floor_size[0]/2 || this.wall[i].position.x == - this.data.floor_size[0]/2)
      {
        if(Math.abs(object.position.x - this.wall[i].position.x) <= this.data.radius + this.data.walls_depth){
          return true;
        }
      }
      else{
        if(Math.abs(object.position.z - this.wall[i].position.z) <= this.data.radius + this.data.walls_depth)
          return true;
      }
    }

    return false;
  }

  calculateIntersection(object) {
    console.log()
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
  }

  //
  //animate: function responsible for updating the display constantly
  //
  animate() {
    'use strict';
    // var elapsed = this.clock.getElapsedTime();

    // if(Math.floor(elapsed) > 0 && elapsed % 5 < 0.05 ) {
    //   this.ball[1].increaseSpeed(elapsed);
    //   this.clock.getDelta();
    // }

    var delta = this.clock.getDelta();
    for(var i = 0; i < this.data.n_balls; i++) {
      this.ball[i].updateBallMovement(delta);
      this.hasCollision(this.ball[i], this.ball[i].position);
    }

    this.updateCameraLook();

    this.controls.update();
    this.render();
    requestAnimationFrame(this.animate.bind(this));
  }

}
