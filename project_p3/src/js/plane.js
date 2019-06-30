class Plane extends THREE.Object3D {
  constructor(x, y, z) {
    'use strict';
    super();

    this.addWings(x, y, z);
    this.addHorizontStabilizer(x, y, z);
    this.addVerticalStabilizer(x, y, z);
    this.addFuselage(x, y, z);
    this.addCockpit(x, y, z);
    this.addHelix(x, y, z);

    this.controls = {
      turnLeft : false,
      turnRight: false,
      turnUp: false,
      turnDown: false
    }

    this.direction = new THREE.Vector3(1, 0, 0);
  }

  addWings(x, y, z) {
    'use strict';

    //Left Wing
    //                          v1-v3
    //v4-v6
    //                          v0-v2
    //
    //v5-v7
    //
    var geometry = new THREE.Geometry();

    geometry.vertices.push(new THREE.Vector3(50, 2.5, -20));//0
    geometry.vertices.push(new THREE.Vector3(50, 2.5, -40));//1

    geometry.vertices.push(new THREE.Vector3(50, -2.5, -20));//2
    geometry.vertices.push(new THREE.Vector3(50, -2.5, -40));//3

    geometry.vertices.push(new THREE.Vector3(-50, 2.5, -25));//4
    geometry.vertices.push(new THREE.Vector3(-50, 2.5, 25));//5

    geometry.vertices.push(new THREE.Vector3(-50, -2.5, -25));//6
    geometry.vertices.push(new THREE.Vector3(-50, -2.5, 25));//7

    //Upper Wing
    geometry.faces.push(new THREE.Face3(5, 0, 1));
    geometry.faces.push(new THREE.Face3(1, 4, 5));

    //Lower wing
    geometry.faces.push(new THREE.Face3(7, 6, 3));
    geometry.faces.push(new THREE.Face3(3, 2, 7));

    //Lateral closure
    geometry.faces.push(new THREE.Face3(3, 1, 0));
    geometry.faces.push(new THREE.Face3(0, 2, 3));

    //Internal closure
    geometry.faces.push(new THREE.Face3(7, 5, 4));
    geometry.faces.push(new THREE.Face3(4, 6, 7));

    //Back closure
    geometry.faces.push(new THREE.Face3(6, 4, 1));
    geometry.faces.push(new THREE.Face3(1, 3, 6));

    //Front closure
    geometry.faces.push(new THREE.Face3(7, 2, 0));
    geometry.faces.push(new THREE.Face3(0, 5, 7));

    geometry.computeFaceNormals();
    geometry.computeVertexNormals();

    var leftwing = new THREE.Mesh(geometry, basicMaterials[0]);

    leftwing.position.set(x, y, z);
    leftwing.rotation.y = Math.PI/2;
    leftwing.position.z = -50;
    leftwing.position.x = 30;

    this.add(leftwing);

    //Right Wing
    //                               v4-v6
    //  v1-v3
    //                               v5-v7
    //
    //  v0-v2
    //
    var geometry = new THREE.Geometry();

    geometry.vertices.push(new THREE.Vector3(50, 2.5, 25));//0
    geometry.vertices.push(new THREE.Vector3(50, 2.5, -25));//1

    geometry.vertices.push(new THREE.Vector3(50, -2.5, 25));//2
    geometry.vertices.push(new THREE.Vector3(50, -2.5, -25));//3

    geometry.vertices.push(new THREE.Vector3(-50, 2.5, -40));//4
    geometry.vertices.push(new THREE.Vector3(-50, 2.5, -20));//5

    geometry.vertices.push(new THREE.Vector3(-50, -2.5, -40));//6
    geometry.vertices.push(new THREE.Vector3(-50, -2.5, -20));//7

    //Upper Wing
    geometry.faces.push(new THREE.Face3(5, 0, 1));
    geometry.faces.push(new THREE.Face3(1, 4, 5));

    //Lower wing
    geometry.faces.push(new THREE.Face3(7, 6, 3));
    geometry.faces.push(new THREE.Face3(3, 2, 7));

    //Lateral closure
    geometry.faces.push(new THREE.Face3(3, 1, 0));
    geometry.faces.push(new THREE.Face3(0, 2, 3));

    //Internal closure
    geometry.faces.push(new THREE.Face3(7, 5, 4));
    geometry.faces.push(new THREE.Face3(4, 6, 7));

    //Back closure
    geometry.faces.push(new THREE.Face3(6, 4, 1));
    geometry.faces.push(new THREE.Face3(1, 3, 6));

    //Front closure
    geometry.faces.push(new THREE.Face3(7, 2, 0));
    geometry.faces.push(new THREE.Face3(0, 5, 7));

    geometry.computeFaceNormals();
    geometry.computeVertexNormals();

    var rightwing = new THREE.Mesh(geometry, basicMaterials[0]);

    rightwing.position.set(x, y, z);
    rightwing.rotation.y = Math.PI/2;
    rightwing.position.z = 50;
    rightwing.position.x = 30;
    this.add(rightwing);
  }

  addHorizontStabilizer(x, y, z) {
    'use strict';

    //Right Stabilizer
    var geometry = new THREE.Geometry();

    geometry.vertices.push(new THREE.Vector3(12.5, 2.5, 10));//0
    geometry.vertices.push(new THREE.Vector3(12.5, 2.5, -10));//1

    geometry.vertices.push(new THREE.Vector3(-12.5, 2.5, -10));//2
    geometry.vertices.push(new THREE.Vector3(-12.5, 2.5, 10));//3

    geometry.vertices.push(new THREE.Vector3(-12.5, -2.5, -10));//4
    geometry.vertices.push(new THREE.Vector3(-12.5, -2.5, 10));//5

    geometry.faces.push(new THREE.Face3(1, 2, 3));
    geometry.faces.push(new THREE.Face3(3, 0, 1));

    geometry.faces.push(new THREE.Face3(0, 5, 4));
    geometry.faces.push(new THREE.Face3(4, 1, 0));

    geometry.faces.push(new THREE.Face3(4, 2, 1));
    geometry.faces.push(new THREE.Face3(0, 3, 5));

    geometry.faces.push(new THREE.Face3(2, 4, 5));
    geometry.faces.push(new THREE.Face3(5, 3, 2));

    geometry.computeFaceNormals();
    geometry.computeVertexNormals();

    var rightstabilizer = new THREE.Mesh(geometry, basicMaterials[0]);

    rightstabilizer.position.set(x, y, z);
    rightstabilizer.rotation.y = Math.PI/2;
    rightstabilizer.position.x = x - 30;
    rightstabilizer.position.z = z - 12.5;

    this.add(rightstabilizer);

    //Left Stabilizer
    var geometry = new THREE.Geometry();

    geometry.vertices.push(new THREE.Vector3(12.5, 2.5, 10));//0
    geometry.vertices.push(new THREE.Vector3(12.5, 2.5, -10));//1

    geometry.vertices.push(new THREE.Vector3(12.5, -2.5, -10));//2
    geometry.vertices.push(new THREE.Vector3(12.5, -2.5, 10));//3

    geometry.vertices.push(new THREE.Vector3(-12.5, 2.5, -10));//4
    geometry.vertices.push(new THREE.Vector3(-12.5, 2.5, 10));//5

    geometry.faces.push(new THREE.Face3(1, 4, 5));
    geometry.faces.push(new THREE.Face3(5, 0, 1));

    geometry.faces.push(new THREE.Face3(3, 5, 4));
    geometry.faces.push(new THREE.Face3(4, 2, 3));

    geometry.faces.push(new THREE.Face3(3, 0, 5));
    geometry.faces.push(new THREE.Face3(2, 4, 1));

    geometry.faces.push(new THREE.Face3(2, 3, 0));
    geometry.faces.push(new THREE.Face3(0, 1, 2));

    geometry.computeFaceNormals();
    geometry.computeVertexNormals();

    var leftstabilizer = new THREE.Mesh(geometry, basicMaterials[0]);

    leftstabilizer.rotation.y = Math.PI/2;
    leftstabilizer.position.x = x - 30;
    leftstabilizer.position.z = z + 12.5;

    this.add(leftstabilizer);
  }

  addVerticalStabilizer(x, y, z) {
    'use strict';

    var geometry = new THREE.Geometry();

    //  v1-v3     v0-v2
    //
    //  v4-v6     v5-v7
    geometry.vertices.push(new THREE.Vector3(-5, 15, 2.5));//0
    geometry.vertices.push(new THREE.Vector3(-5, 15, -2.5));//1

    geometry.vertices.push(new THREE.Vector3(10, -15, 2.5));//2
    geometry.vertices.push(new THREE.Vector3(10, -15, -2.5));//3

    geometry.vertices.push(new THREE.Vector3(-10, 15, -2.5));//4
    geometry.vertices.push(new THREE.Vector3(-10, 15, 2.5));//5

    geometry.vertices.push(new THREE.Vector3(-10, -15, -2.5));//6
    geometry.vertices.push(new THREE.Vector3(-10, -15, 2.5));//7

    geometry.faces.push(new THREE.Face3(1, 3, 6));
    geometry.faces.push(new THREE.Face3(6, 4, 1));

    geometry.faces.push(new THREE.Face3(0, 5, 7));
    geometry.faces.push(new THREE.Face3(7, 2, 0));

    geometry.faces.push(new THREE.Face3(5, 4, 6));
    geometry.faces.push(new THREE.Face3(6, 7, 5));

    geometry.faces.push(new THREE.Face3(2, 7, 6));
    geometry.faces.push(new THREE.Face3(6, 3, 2));

    geometry.faces.push(new THREE.Face3(1, 0, 2));
    geometry.faces.push(new THREE.Face3(2, 3, 1));

    geometry.faces.push(new THREE.Face3(1, 4, 5));
    geometry.faces.push(new THREE.Face3(5, 0, 1));

    geometry.computeFaceNormals();
    geometry.computeVertexNormals();

    var verticalstabilizer = new THREE.Mesh(geometry, basicMaterials[0]);

    verticalstabilizer.position.set(x, y, z);
    verticalstabilizer.position.x = x - 30;
    verticalstabilizer.position.y = y + 15;

    this.add(verticalstabilizer);
  }

  addFuselage(x, y, z) {
    'use strict';

    //Tail
    var geometry = new THREE.Geometry();

    geometry.vertices.push(new THREE.Vector3(75, 20, 20));//0
    geometry.vertices.push(new THREE.Vector3(75, 20, -20));//1

    geometry.vertices.push(new THREE.Vector3(75, -20, 20));//2
    geometry.vertices.push(new THREE.Vector3(75, -20, -20));//3

    geometry.vertices.push(new THREE.Vector3(-75, 3, -3));//4
    geometry.vertices.push(new THREE.Vector3(-75, 3, 3));//5

    geometry.vertices.push(new THREE.Vector3(-75, -3, -3));//6
    geometry.vertices.push(new THREE.Vector3(-75, -3, 3));//7

    geometry.vertices.push(new THREE.Vector3(129, 3, 3));//8
    geometry.vertices.push(new THREE.Vector3(129, 3, -3));//9

    geometry.vertices.push(new THREE.Vector3(129, -3, 3));//10
    geometry.vertices.push(new THREE.Vector3(129, -3, -3));//11

    geometry.vertices.push(new THREE.Vector3(109, 20, -20));//12
    geometry.vertices.push(new THREE.Vector3(109, 20, 20));//13

    geometry.vertices.push(new THREE.Vector3(109, -20, -20));//14
    geometry.vertices.push(new THREE.Vector3(109, -20, 20));//15

    //Front tail
    geometry.faces.push(new THREE.Face3(1, 0, 2));
    geometry.faces.push(new THREE.Face3(2, 3, 1));

    //Right tail
    geometry.faces.push(new THREE.Face3(6, 4, 1));
    geometry.faces.push(new THREE.Face3(1, 3, 6));

    //Left tail
    geometry.faces.push(new THREE.Face3(5, 7, 2));
    geometry.faces.push(new THREE.Face3(2, 0, 5));

    //Up tail
    geometry.faces.push(new THREE.Face3(1, 4, 5));
    geometry.faces.push(new THREE.Face3(5, 0, 1));

    //Down tail
    geometry.faces.push(new THREE.Face3(2, 7, 6));
    geometry.faces.push(new THREE.Face3(6, 3, 2));

    //Back tail
    geometry.faces.push(new THREE.Face3(7, 5, 4));
    geometry.faces.push(new THREE.Face3(4, 6, 7));

    //Upper center
    geometry.faces.push(new THREE.Face3(12, 1, 0));
    geometry.faces.push(new THREE.Face3(0, 13, 12));

    //Down center
    geometry.faces.push(new THREE.Face3(14, 15, 2));
    geometry.faces.push(new THREE.Face3(2, 3, 14));

    //Left center
    geometry.faces.push(new THREE.Face3(13, 0, 2));
    geometry.faces.push(new THREE.Face3(2, 15, 13));

    //right center
    geometry.faces.push(new THREE.Face3(3, 1, 12));
    geometry.faces.push(new THREE.Face3(12, 14, 3));

    //front head
    geometry.faces.push(new THREE.Face3(9, 8, 10));
    geometry.faces.push(new THREE.Face3(10, 11, 9));

    //right head
    geometry.faces.push(new THREE.Face3(8, 13, 15));
    geometry.faces.push(new THREE.Face3(15, 10, 8));

    //left head
    geometry.faces.push(new THREE.Face3(14, 12, 9));
    geometry.faces.push(new THREE.Face3(9, 11, 14));

    //up head
    geometry.faces.push(new THREE.Face3(9, 12, 13));
    geometry.faces.push(new THREE.Face3(13, 8, 9));

    //lower head
    geometry.faces.push(new THREE.Face3(10, 15, 14));
    geometry.faces.push(new THREE.Face3(14, 11, 10));

    geometry.computeFaceNormals();
    geometry.computeVertexNormals();

    var tail = new THREE.Mesh(geometry, basicMaterials[1]);



    this.add(tail);

    //Center
    //v1-v4           v0-v5
    //
    //v3-v6           v2-v7
    //
  }

  addCockpit(x, y, z) {
    'use strict';

    var geometry = new THREE.Geometry();

    geometry.vertices.push(new THREE.Vector3(0, 7.5, 0));//0
    geometry.vertices.push(new THREE.Vector3(7.5, -7.5, 7.5));//1
    geometry.vertices.push(new THREE.Vector3(7.5, -7.5, -7.5));//2
    geometry.vertices.push(new THREE.Vector3(-7.5, -7.5, -7.5));//3
    geometry.vertices.push(new THREE.Vector3(-7.5, -7.5, 7.5));//4

    geometry.faces.push(new THREE.Face3(2, 0, 1));
    geometry.faces.push(new THREE.Face3(1, 0, 4));
    geometry.faces.push(new THREE.Face3(4, 0, 3));
    geometry.faces.push(new THREE.Face3(3, 0, 2));

    geometry.faces.push(new THREE.Face3(1, 4, 3));
    geometry.faces.push(new THREE.Face3(3, 2, 1));

    geometry.computeFaceNormals();
    geometry.computeVertexNormals();

    var cockpit = new THREE.Mesh(geometry, basicMaterials[2]);

    cockpit.position.x = x + 125;
    cockpit.position.y = y + 25;
    cockpit.rotation.y = Math.PI/2;

    this.add(cockpit);
  }

  addHelix(x, y, z) {
    'use strict';

    var geometry = new THREE.Geometry();

    geometry.vertices.push(new THREE.Vector3(0, 3, 0));//0
    geometry.vertices.push(new THREE.Vector3(3, -3, 3));//1
    geometry.vertices.push(new THREE.Vector3(3, -3, -3));//2
    geometry.vertices.push(new THREE.Vector3(-3, -3, -3));//3
    geometry.vertices.push(new THREE.Vector3(-3, -3, 3));//4

    geometry.faces.push(new THREE.Face3(2, 0, 1));
    geometry.faces.push(new THREE.Face3(1, 0, 4));
    geometry.faces.push(new THREE.Face3(4, 0, 3));
    geometry.faces.push(new THREE.Face3(3, 0, 2));

    geometry.faces.push(new THREE.Face3(1, 4, 3));
    geometry.faces.push(new THREE.Face3(3, 2, 1));


    geometry.computeFaceNormals();
    geometry.computeVertexNormals();

    var rotator = new THREE.Mesh(geometry, basicMaterials[3]);

    rotator.position.x = x + 30 + 75 + 34 + 20 + 3;
    rotator.rotation.z = -Math.PI/2;
    rotator.rotation.x = Math.PI/2;
    rotator.position.y = y + 0.5;

    this.add(rotator);

    //1st Helix
    var geometry = new THREE.Geometry();

    geometry.vertices.push(new THREE.Vector3(5, 23, 0.5));//0
    geometry.vertices.push(new THREE.Vector3(0.75, -1.5, 0.5));//1
    geometry.vertices.push(new THREE.Vector3(-0.75, -1.5, 0.5));//2
    geometry.vertices.push(new THREE.Vector3(-5, 23, 0.5));//3

    geometry.vertices.push(new THREE.Vector3(5, 23, -0.5));//4
    geometry.vertices.push(new THREE.Vector3(0.75, -1.5, -0.5));//5
    geometry.vertices.push(new THREE.Vector3(-0.75, -1.5, -0.5));//6
    geometry.vertices.push(new THREE.Vector3(-5, 23, -0.5));//7

    geometry.faces.push(new THREE.Face3(0, 2, 1));
    geometry.faces.push(new THREE.Face3(0, 3, 2));

    geometry.faces.push(new THREE.Face3(4, 5, 6));
    geometry.faces.push(new THREE.Face3(4, 6, 7));

    geometry.faces.push(new THREE.Face3(0, 1, 5));
    geometry.faces.push(new THREE.Face3(0, 5, 4));

    geometry.faces.push(new THREE.Face3(7, 6, 2));
    geometry.faces.push(new THREE.Face3(7, 2, 3));

    geometry.faces.push(new THREE.Face3(0, 7, 3));
    geometry.faces.push(new THREE.Face3(0, 4, 7));

    geometry.computeFaceNormals();
    geometry.computeVertexNormals();

    var helix = new THREE.Mesh(geometry, basicMaterials[3]);

    helix.rotation.y = -Math.PI/2;
    helix.position.x = x + 30 + 75 + 34 + 20 + 1;

    this.add(helix);

    //2nd Helix
    var geometry = new THREE.Geometry();

    geometry.vertices.push(new THREE.Vector3(5, 23, 0.5));//0
    geometry.vertices.push(new THREE.Vector3(0.75, -1.5, 0.5));//1
    geometry.vertices.push(new THREE.Vector3(-0.75, -1.5, 0.5));//2
    geometry.vertices.push(new THREE.Vector3(-5, 23, 0.5));//3

    geometry.vertices.push(new THREE.Vector3(5, 23, -0.5));//4
    geometry.vertices.push(new THREE.Vector3(0.75, -1.5, -0.5));//5
    geometry.vertices.push(new THREE.Vector3(-0.75, -1.5, -0.5));//6
    geometry.vertices.push(new THREE.Vector3(-5, 23, -0.5));//7

    geometry.faces.push(new THREE.Face3(0, 2, 1));
    geometry.faces.push(new THREE.Face3(0, 3, 2));

    geometry.faces.push(new THREE.Face3(4, 5, 6));
    geometry.faces.push(new THREE.Face3(4, 6, 7));

    geometry.faces.push(new THREE.Face3(0, 1, 5));
    geometry.faces.push(new THREE.Face3(0, 5, 4));

    geometry.faces.push(new THREE.Face3(7, 6, 2));
    geometry.faces.push(new THREE.Face3(7, 2, 3));

    geometry.faces.push(new THREE.Face3(0, 7, 3));
    geometry.faces.push(new THREE.Face3(0, 4, 7));


    geometry.computeFaceNormals();
    geometry.computeVertexNormals();

    var helix = new THREE.Mesh(geometry, basicMaterials[3]);

    helix.rotation.y = -Math.PI/2;
    helix.rotation.x = 2 * Math.PI/3;
    helix.position.x = x + 30 + 75 + 34 + 20 + 1;

    this.add(helix);

    //3rd Helix
    var geometry = new THREE.Geometry();

    geometry.vertices.push(new THREE.Vector3(5, 23, 0.5));//0
    geometry.vertices.push(new THREE.Vector3(0.75, -1.5, 0.5));//1
    geometry.vertices.push(new THREE.Vector3(-0.75, -1.5, 0.5));//2
    geometry.vertices.push(new THREE.Vector3(-5, 23, 0.5));//3

    geometry.vertices.push(new THREE.Vector3(5, 23, -0.5));//4
    geometry.vertices.push(new THREE.Vector3(0.75, -1.5, -0.5));//5
    geometry.vertices.push(new THREE.Vector3(-0.75, -1.5, -0.5));//6
    geometry.vertices.push(new THREE.Vector3(-5, 23, -0.5));//7

    geometry.faces.push(new THREE.Face3(0, 2, 1));
    geometry.faces.push(new THREE.Face3(0, 3, 2));

    geometry.faces.push(new THREE.Face3(4, 5, 6));
    geometry.faces.push(new THREE.Face3(4, 6, 7));

    geometry.faces.push(new THREE.Face3(0, 1, 5));
    geometry.faces.push(new THREE.Face3(0, 5, 4));

    geometry.faces.push(new THREE.Face3(7, 6, 2));
    geometry.faces.push(new THREE.Face3(7, 2, 3));

    geometry.faces.push(new THREE.Face3(0, 7, 3));
    geometry.faces.push(new THREE.Face3(0, 4, 7));


    geometry.computeFaceNormals();
    geometry.computeVertexNormals();

    var helix = new THREE.Mesh(geometry, basicMaterials[3]);

    helix.rotation.y = -Math.PI/2;
    helix.rotation.x = 4 * Math.PI/3;
    helix.position.x = x + 30 + 75 + 34 + 20 + 1;

    this.add(helix);
  }

  rotateLeft(){
    'use strict';

    if(this.controls.turnLeft){
      var axis = new THREE.Vector3(0, 1, 0);
      var angle = Math.PI/150;

      this.rotateOnAxis(axis, angle);
      this.direction += angle;
    }
  }

  rotateRight(){
    'use strict';

    if(this.controls.turnRight){
      var axis = new THREE.Vector3(0, 1, 0);
      var angle = - Math.PI/150;

      this.rotateOnAxis(axis, angle);
      this.direction += angle;
    }
  }

  rotateUp(){
    'use strict';

    if(this.controls.turnUp){
      var axis = new THREE.Vector3(0, 0, 1);
      var angle = Math.PI/150;

      this.rotateOnAxis(axis, angle);
      this.direction += angle;
    }
  }

  rotateDown(){
    'use strict';

    if(this.controls.turnDown){
      var axis = new THREE.Vector3(0, 0, 1);
      var angle = - Math.PI/150;

      this.rotateOnAxis(axis, angle);
      this.direction += angle;
    }
  }

  createNormals() {
    this.traverse(function (node) {
      if (node instanceof THREE.Mesh) {
        var helper = new THREE.FaceNormalsHelper(node, 50, 0x00ff00, 1 );
        helper.visible = false;
        main.scene.add(helper);
      }
    });
  }

  updateNormals() {
    'use strict';
    if (this.controls.turnDown || this.controls.turnUp || this.controls.turnRight || this.controls.turnLeft) {
      main.scene.traverse(function (node) {
        if (node instanceof THREE.FaceNormalsHelper) {
          node.update();
        }
      });
    }
  }
}
