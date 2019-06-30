class SpotlightStructure extends THREE.Object3D {
  constructor() {
    'use strict';
    super();

    this.createLightstructure();
    this.createLamp()
  }

  createLightstructure() {
    //Left Bottom Lamp
    var geometry = new THREE.ConeGeometry(10, 30, 32, 15, 1, true);
    var material =  new THREE.MeshLambertMaterial( {color: 0xffffff} );
    material.side = THREE.DoubleSide;
    var cone = new THREE.Mesh( geometry, material );
    cone.position.set(100, 100, 100);
    cone.rotation.y = 3*Math.PI/4;
    cone.rotation.z = Math.PI/4;
    this.add(cone);

    //Right Bottom Lamp
    var geometry = new THREE.ConeGeometry(10, 30, 32, 15, 1, true);
    var material =  new THREE.MeshLambertMaterial( {color: 0xffffff} );
    material.side = THREE.DoubleSide;
    var cone = new THREE.Mesh( geometry, material );
    cone.position.set(100, 100, -100);
    cone.rotation.y = -3*Math.PI/4;
    cone.rotation.z = Math.PI/4;
    this.add(cone);

    //Right Top Lamp
    var geometry = new THREE.ConeGeometry(10, 30, 32, 15, 1, true);
    var material =  new THREE.MeshLambertMaterial( {color: 0xffffff} );
    material.side = THREE.DoubleSide;
    var cone = new THREE.Mesh( geometry, material );
    cone.position.set(-100, 100, -100);
    cone.rotation.x = -Math.PI/4;
    cone.rotation.z = Math.PI/4;
    this.add(cone);

    //Left Top Lamp
    var geometry = new THREE.ConeGeometry(10, 30, 32, 15, 1, true);
    var material =  new THREE.MeshLambertMaterial( {color: 0xffffff} );
    material.side = THREE.DoubleSide;
    var cone = new THREE.Mesh( geometry, material );
    cone.position.set(-100, 100, 100);
    cone.rotation.x = Math.PI/4;
    cone.rotation.z = Math.PI/4;
    this.add(cone);
  }

  createLamp() {
    var geometry = new THREE.SphereGeometry(4, 10, 10);
    var material =  new THREE.MeshPhongMaterial( {color: 0xffffff} );
    var lamp = new THREE.Mesh(geometry, material);
    lamp.position.set(100, 100, 100);
    this.add(lamp);

    var geometry = new THREE.SphereGeometry(4, 10, 10);
    var material =  new THREE.MeshPhongMaterial( {color: 0xffffff} );
    var lamp = new THREE.Mesh(geometry, material);
    lamp.position.set(100, 100, -100);
    this.add(lamp);

    var geometry = new THREE.SphereGeometry(4, 10, 10);
    var material =  new THREE.MeshPhongMaterial( {color: 0xffffff} );
    var lamp = new THREE.Mesh(geometry, material);
    lamp.position.set(-100, 100, -100);
    this.add(lamp);

    var geometry = new THREE.SphereGeometry(4, 10, 10);
    var material =  new THREE.MeshPhongMaterial( {color: 0xffffff} );
    var lamp = new THREE.Mesh(geometry, material);
    lamp.position.set(100, 100, 100);
    this.add(lamp);
  }
}
