class Main {
  constructor() {
    'use strict';

    this.scene;
    this.currentCamera;
    this.prespCamera;
    this.ortoCamera;
    this.controls;
    this.renderer;
    this.lightCalc;
    this.pause;
    this.frame;
    this.message;
    this.init();

  }

  //
	//createScene: method responsible for creating the scene
	//
  createScene() {
    'use strict';
    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    this.scene = scene;

    this.lightCalc = true;
    this.pause = false;

    //Directional and point light
    //Directional light
    directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(50, 50, 50);
    this.scene.add(directionalLight);

    //Point light
    pointLight = new THREE.PointLight( 0xffffff, 1, 200 );
    pointLight.position.set( -50, 60, 50 );
    this.scene.add(pointLight);

    //Creates the object
    table = new Table();
    cube = new Cube();
    ball = new Ball();

    this.scene.add(cube);
    this.scene.add(ball);
    this.scene.add(table);

    this.addMessage();

    this.setPerspectiveView(); //creates prespective camera
    this.setOrtographicView(); //creates ortographic camera
    this.currentCamera = this.prespCamera; //Sets the perspective view as default for the camera
    this.controls = this.createControls();

    this.controls = this.createControls();
    this.scene.add(new THREE.AxisHelper(30));
  }

  addMessage(){
    var plane = new THREE.PlaneGeometry(100, 100);
    var material = new THREE.MeshBasicMaterial( {map: pauseTexture, side: THREE.DoubleSide });
    var mesh = new THREE.Mesh(plane, material);

    mesh.position.set(1500, 0, 1500);
    mesh.rotation.y = Math.PI/2;

    this.message = mesh;
    this.scene.add(this.message);

  }

  setPerspectiveView() {
    'use strict';

    this.viewportWidth = window.innerWidth;
    this.viewportHeight = window.innerHeight;
    this.aspectRatio = window.innerWidth / window.innerHeight;
    this.horizontalFOV = this.calculateHorizontalFOV();
    this.radVerticalFOV = 90;

    var camera = new THREE.PerspectiveCamera(this.radVerticalFOV, this.aspectRatio, 1, 1000);

    camera.position.set(-80, 80, -80);
    camera.lookAt(this.scene.position);
    camera.updateProjectionMatrix();
    this.prespCamera = camera;
  }

  setOrtographicView() {
    'use strict';

    var ratio = 6;
    var camera = new THREE.OrthographicCamera(window.innerWidth / - ratio, window.innerWidth / ratio, window.innerHeight / ratio, window.innerHeight / - ratio);

    camera.position.set(0, 50, 1500);
    camera.lookAt(this.message.position); //Camera looks at the message plane
    camera.updateProjectionMatrix();
    this.ortoCamera = camera;
  }

  calculateHorizontalFOV() {
    let radVerticalFOV = this.radVerticalFOV * Math.PI/180;
    let radHorizontalFOV = 2 * Math.atan(Math.tan(radVerticalFOV/2) * this.aspectRatio);
    let horizontalFOV = radHorizontalFOV * 180/Math.PI;
    return horizontalFOV;
  }

  //
	//createRenderer:	method responsible for creating the renderer
	//
  createRenderer() {
    'use strict';
    this.renderer = new THREE.WebGLRenderer({antialias: true});
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
  }

  createControls() {
    var controls = new THREE.OrbitControls(this.currentCamera);
    return controls;
  }

  render() {
    'use strict';
    this.renderer.render(this.scene, this.currentCamera);
  }

  //
	//animate:	function responsible for updating the display constantly
	//
  animate() {
    'use strict';

    //Gets delta
    if(this.clock.running){
      var delta = this.clock.getDelta();
    }

    this.controls.update();
    //this.controls.autoRotate = true;
    ball.moveBall(delta);
    ball.updateBall(delta);
    this.render();

    this.frame = requestAnimationFrame(this.animate.bind(this));
  }

  //
	//init: method responsible for initiating - creates the renderer,
  //the scene, starts the clock and has the addEventListener
	//
  init() {
    'use strict';
    this.clock = new THREE.Clock;
    this.clock.start();

    this.createScene();
    this.createRenderer();
    this.render();
    this.animate();

    window.addEventListener("keydown", KeyDown);
    window.addEventListener("resize", Resize);
  }
}
