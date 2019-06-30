class Main {
  constructor() {
    'use strict';

    this.scene;
    this.camera;
    this.controls;
    this.renderer;
    this.plane;

    this.lightCalc = false;
    this.gourard = true;
    this.wire = false;
  }

  //
	//createScene: method responsible for creating the scene
	//
  createScene() {
    'use strict';
    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    this.scene = scene;



    this.scene.add(spotlightstruct);
    this.scene.add(directionalLight);

    //Creates the objects
    plane.createNormals();
    this.scene.add(plane);


    this.setPerspectiveView(); //Sets the perspective view as default for the camera

    this.controls = this.createControls();
    this.scene.add(new THREE.AxisHelper(50));
  }

  setPerspectiveView() {
    'use strict';
    var ratio = 6;
    var camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1, 1000);

    camera.position.set(200, 100, 0); //Camera is set on the position x = -200, y = 45
    camera.lookAt(this.scene.position);
    camera.updateProjectionMatrix();
    this.camera = camera;

    this.controls = this.createControls();
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
    var controls = new THREE.OrbitControls(this.camera);
    return controls;
  }

  render() {
    'use strict';
    this.renderer.render(this.scene, this.camera);
  }

  //
	//animate:	function responsible for updating the display constantly
	//
  animate() {
    'use strict';

    plane.rotateLeft();
    plane.rotateRight();
    plane.rotateUp();
    plane.rotateDown();
    plane.updateNormals();

    this.controls.update();
    this.render();
    requestAnimationFrame(this.animate.bind(this));
  }

  //
	//init: method responsible for initiating - creates the renderer,
  //the scene, starts the clock and has the addEventListener
	//
  init() {
    'use strict';
    this.createScene();
    this.createRenderer();
    this.render();
    this.animate();

    window.addEventListener("keydown", KeyDown);
    window.addEventListener("keyup", KeyUp);
    window.addEventListener("resize", Resize);
  }
}
