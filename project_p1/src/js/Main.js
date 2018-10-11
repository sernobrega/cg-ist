class Main {
	constructor() {
		'use strict';

		this.scene;
		this.camera;
		this.renderer;
		this.clock;

		this.table;
		this.lamp;
		this.chair;
	}

	//
	//createScene: method responsible for creating the scene
	//
	createScene() {
		'use strict';
		var scene = new THREE.Scene();
		this.scene = scene;

		//Creates the objects
		this.table = this.createTable(50, 0, 0);
		this.lamp = this.createLamp(80, 0, 80);
		this.chair = this.createChair(0, 35.5, 0);

		this.setTopView(); //Sets topview as default for the camera
	}

	//
	//setTopView:	method responsible for setting the camera of topView
	//
	setTopView() {
		'use strict';
		var ratio = 6;
		var camera = new THREE.OrthographicCamera(window.innerWidth / - ratio, window.innerWidth / ratio, window.innerHeight / ratio, window.innerHeight / - ratio);

		camera.position.set(0, window.innerWidth / 6, 0); //Camera is set on position y = 200
		camera.lookAt(this.scene.position); //Camera looks at the center of the scene (0, 0, 0)
		camera.updateProjectionMatrix();
		this.camera = camera;
	}

	//
	//setFrontView:	method responsible for setting the camera of frontView
	//
	setFrontView() {
		'use strict';
		var ratio = 6;
		var camera = new THREE.OrthographicCamera(window.innerWidth / - ratio, window.innerWidth / ratio, window.innerHeight / ratio, window.innerHeight / - ratio);

		camera.position.set(window.innerWidth / -  6, 45, 0); //Camera is set on the position x = -200, y = 45
		camera.rotation.y = - (Math.PI / 2); //Camera is rotated 90 degrees (default is xy, we want it looking to yz)
		camera.updateProjectionMatrix();
		this.camera = camera;
	}

	//
	//setSideView:	method responsible for setting the camera of sideView
	//
	setSideView() {
		'use strict';
		var ratio = 6;
		var camera = new THREE.OrthographicCamera(window.innerWidth / - ratio, window.innerWidth / ratio, window.innerHeight / ratio, window.innerHeight / - ratio);

		camera.position.set(0, 45, window.innerHeight / 6); //Camera is set to y = 45  and z = 100
		camera.updateProjectionMatrix();
		this.camera = camera;

	}

	//
	//createRenderer:	method responsible for creating the renderer
	//
	createRenderer() {
		this.renderer = new THREE.WebGLRenderer({antialias: true});
  	this.renderer.setSize(window.innerWidth, window.innerHeight);
  	document.body.appendChild(this.renderer.domElement);
	}

	//
	//render: renders the scene with a given camera
	//
	render() {
		'use strict';
		this.renderer.render(this.scene, this.camera);
	}

	//
	//createTable: method responsible for creating the table
	//Arguments:	 x, y, z - position of the table
	//
	createTable(x, y, z) {
		'use strict';
		var table = new Table(x, y, z);

		table.createTableLeg(-35, 30, -50);
		table.createTableLeg(-35, 30, 50);
		table.createTableLeg(35, 30, -50);
		table.createTableLeg(35, 30, 50);
		table.createTableTop();
		this.scene.add(table);
		return table;
	}

	//
	//createLamp: method responsible for creating the lamp
	//Arguments:	 x, y, z - position of the lamp
	//
	createLamp(x, y, z) {
		'use strict';
		var lamp = new Lamp(x, y, z);

		lamp.createLampBase();
		lamp.createLampBulbSupport();
		lamp.createLampBulb();
		lamp.createLampAbajour();
		this.scene.add(lamp);
		return lamp;
	}

	//
	//createChair: method responsible for creating the chair
	//Arguments:	 x, y, z - position of the chair
	//
	createChair(x, y, z) {
		'use strict';
		var chair = new Chair(x, y, z);
		this.scene.add(chair);
		return chair;
	}

	//
	//init: 			method responsible for initiating - creates the renderer, the scene, starts the clock and has the addEventListener
	//Arguments:	x, y, z - position of the table
	//
	init() {
		'use strict';
		this.createRenderer();
		this.createScene();

		this.clock = new THREE.Clock;
        this.clock.start();


		window.addEventListener("keydown", KeyDown);
        window.addEventListener("keyup", KeyUp);
	}

	//
	//animate:	function responsible for updating the display constantly
	//
	//
	animate() {
		'use strict';

		//Gets delta
		if(this.clock.running)
			var delta = this.clock.getDelta();

		this.chair.rotatingLeft(delta);
		this.chair.rotationRight(delta);
		this.chair.movingForward(delta);
  	this.chair.movingBackward(delta);
  	this.chair.speedDecay(delta);
		this.chair.updateDirection(delta);


  	this.render();
		requestAnimationFrame(this.animate.bind(this));
	}
}
