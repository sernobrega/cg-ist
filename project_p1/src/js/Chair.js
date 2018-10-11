class Chair extends OfficeObject {
	constructor(x, y, z) {
		'use strict';

		super(x, y, z);

		//Controls indicate the state of pressing the keys down or not
		this.controls = {
			turnLeft : false,
			turnRight : false,
			moveForward : false,
			moveBackward : false
		}

		//Direction variables
		this.direction = new THREE.Vector3(1, 0, 0);
		this.wheelDirection = 0;

		//Speed and acceleration variables
		this.speed = 0;
		this.maxSpeed = 280;
		this.maxBackwardsSpeed = - this.maxSpeed * 0.5
		this.acceleration = 100;

		//Friction related variables
		this.mass = 10;
		this.frictionForce = this.mass * 90;

		//Object parts
    this.chairBase = this.createChairBase();
		this.chairLegs = this.createChairLegs();

    this.wheelFr = this.createChairWheel(12.5, -32.5, 0);
    this.wheelBa = this.createChairWheel(-12.5, -32.5, 0);
    this.wheelRi = this.createChairWheel(0, -32.5, 12.5);
    this.wheelLe = this.createChairWheel(0, -32.5, -12.5);
	}

	//
	//createChairBase: method responsible for creating the base of the chair (seat and back)
	//Arguments:				receives the coordinates of the wheel having the center of the chair as reference
	//Returns: 			 returns an OfficeObject
	//
	createChairBase() {
		'use strict';
    var base = new OfficeObject(0, 0, 0);
    var material = new THREE.MeshBasicMaterial({ color: 0x00cccc, wireframe: true });

    base.createBox(material, 5, 20, 40, -20, 25, 0);
    base.createBox(material, 5, 30, 5, -25, 12.5, 0);
    base.createBox(material, 5, 5, 5, -20, 0, 0);
    base.createBox(new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true}), 40, 5, 40, 0, 0, 0);
    this.add(base);

    return base;
	}

	//
	//createChairLegs: method responsible for creating the legs of the chair
	//Arguments:				receives the coordinates of the wheel having the center of the chair as reference
	//Returns: 			 returns an OfficeObject
	//
	createChairLegs() {
		'use strict';
		this.chairLegs = new OfficeObject(0, 0, 0);
		var legs = new OfficeObject(0, 0, 0);
		var material = new THREE.MeshBasicMaterial({ color: 0x00cccc, wireframe: true });

	  legs.createBox(material, 5, 20, 5, 0, -12.5, 0);
	  legs.createBox(material, 30, 5, 5, 0, -22.5, 0);
	  legs.createBox(material, 5, 5, 30, 0, -22.5, 0);
	  legs.createBox(material, 5, 5, 5, 12.5, -27.5, 0);
	  legs.createBox(material, 5, 5, 5, -12.5, -27.5, 0);
	  legs.createBox(material, 5, 5, 5, 0, -27.5, 12.5);
	  legs.createBox(material, 5, 5, 5, 0, -27.5, -12.5);

		this.chairLegs.add(legs);

		this.add(this.chairLegs);

		return legs;
  	}

	//
	//createChairWheel: method responsible for creating a wheel of the chair
	//Arguments:				receives the coordinates of the wheel having the center of the chair as reference
	//Returns: 			  	returns the mesh of the wheel
	//
  createChairWheel(x, y, z) {
	  'use strict';
    var wheel = new OfficeObject(0, 0, 0);
		var geometry = new THREE.TorusGeometry(1, 2, 5, 9);
		var mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({color: 0x808080, wireframe: true}));

		mesh.position.set(x, y, z);
		this.add(mesh);

    return mesh;
  }

	//
	//movingForward: method responsible for calculating the speed of the chair if upArrow is pressed
	//Arguments: 		 receives delta
	//
  movingForward(delta) {
  	'use strict';
  	if(this.controls.moveForward) { //Key is being pressed
	  	if(this.speed < this.maxSpeed) { //If speed is lower than maximum speed allowed
	  			var addedSpeed = this.acceleration * delta; //v = a*t

	  			if(this.speed + addedSpeed > this.maxSpeed) //If the sum is more than the maximum, the maximum will be the resulting speed
	  				this.speed = this.maxSpeed;
	  			else
	  				this.speed += addedSpeed;
	  		}
  	}
  }

	//
	//movingBackwards: method responsible for calculating the speed of the chair if downArrow is pressed
	//Arguments: 			 receives delta
	//
  movingBackward(delta) {
		'use strict';
 		if(this.controls.moveBackward) {

  		if(this.speed > this.maxBackwardsSpeed) {
  			var addedSpeed = - this.acceleration * delta;

  			if(this.speed + addedSpeed < this.maxBackwardsSpeed)
  				this.speed = this.maxBackwardsSpeed;
  			else
  				this.speed += addedSpeed;
  		}
  	}
  }

	//
	//rotatingLeft: method responsible for rotating the chair when leftArrow is being pressed
	//
  rotatingLeft() {
  	'use strict';
  	if(this.controls.turnLeft) {
      var axis = new THREE.Vector3(0, 1, 0);
      var angle = Math.PI / 150;

      this.direction.applyAxisAngle(axis, angle); //Updates direction with the angle with the (0,1,0) axis
      this.chairBase.rotateOnAxis(axis, angle); //Also rotates the chairBase
			this.wheelDirection += angle; //Stores the angle in the wheelDirection
  	}
  }

	//
	//rotatingRight: method responsible for rotating the chair when downKey is being pressed
	//
  rotationRight(delta) {
  	'use strict';
  	if(this.controls.turnRight) {
      var axis = new THREE.Vector3(0, 1, 0).normalize();
      var angle = - Math.PI / 150;

      this.direction.applyAxisAngle(axis, angle);
      this.chairBase.rotateOnAxis(axis, angle);
			this.wheelDirection += angle;
  	}
  }

	//
	//wheelRotationForward: method responsible for rotating the wheels forward
	//
	wheelRotationForward() {
		//Formula: d = v / 2*pi*r
		this.wheelFr.rotation.z += this.speed / Math.PI * 2 * 2.5;
		this.wheelBa.rotation.z += this.speed / Math.PI * 2 * 2.5;
		this.wheelRi.rotation.z += this.speed / Math.PI * 2 * 2.5;
		this.wheelLe.rotation.z += this.speed / Math.PI * 2 * 2.5;
	}

	//
	//wheelRotationBackwards: method responsible for rotating the wheels backwards
	//
	wheelRotationBackwards() {
		this.wheelFr.rotation.z -= this.speed / Math.PI * 2 * 2.5;
		this.wheelBa.rotation.z -= this.speed / Math.PI * 2 * 2.5;
		this.wheelRi.rotation.z -= this.speed / Math.PI * 2 * 2.5;
		this.wheelLe.rotation.z -= this.speed / Math.PI * 2 * 2.5;
	}

	//
	//wheelRotationAxis:	method responsible for giving the wheelDirection to the several Wheels
	//
	wheelRotationAxis() {
		this.wheelFr.rotation.y = this.wheelDirection;
		this.wheelLe.rotation.y = this.wheelDirection;
		this.wheelBa.rotation.y = this.wheelDirection;
		this.wheelRi.rotation.y = this.wheelDirection;
	}

	//
	//speedDecay:	method responsible for decaying the speed as the time passes if upArrow, downArrow and speed are different than 0
	//Arguments:	receives delta
	//
  speedDecay(delta) {
  	'use strict';

  	if(!(this.controls.moveBackward || this.controls.moveForward || this.speed == 0)) {
      if(this.speed > 0 && this.speed > (this.acceleration*this.mass - this.frictionForce) * delta) //Formula is v = v0 - (ma - fa)*t
        this.speed -= (this.acceleration*this.mass - this.frictionForce) * delta;
      else if(this.speed < 0 && this.speed < (this.acceleration*this.mass + this.frictionForce) * delta)
        this.speed += (this.acceleration*this.mass - this.frictionForce) * delta;
  		else
        this.speed = 0;
  	}
  }

	//
	//updateDirection: method responsible for constantly update the position of the chair (x, y, z) and the rotation of the Wheels
	//Arguments:			 receives delta
	//
	updateDirection(delta) {
  	'use strict';

  	if(this.controls.moveBackward || this.controls.moveForward || this.speed != 0) {
			var angle = Math.PI / 150;

	 		var directionvector = new THREE.Vector3();
	  	directionvector.copy(this.direction); //Copies the vector to allow manipulation
			var ds = directionvector.multiplyScalar(this.speed); //Multiplies the direcvtion by the speed of the chair
	  	this.position.add(ds.multiplyScalar(delta)); //Multiplies by the time elapsed and adds to the current position

			this.wheelRotationAxis();

			if(this.speed > 0)
				this.wheelRotationForward();
			else
				this.wheelRotationBackwards();
	 	}
  }
}
