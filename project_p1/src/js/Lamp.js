class Lamp extends OfficeObject {
    constructor(x, y, z) {
        'use strict';
        super(x, y, z);
    }

    //
    //createLampBase: method that creates the base of the lamp
    //
    createLampBase() {
        'use strict';
        var legAngle1 = Math.PI/13
        var legAngle2 = Math.PI*2/3;
        var legAngle3 = Math.PI*4/3;
        var material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });

        this.createCylinder(material, 0.4, 0.4, 80, 0, 0, legAngle1, 5, 38.5, 0);
        this.createCylinder(material, 0.4, 0.4, 80, 0, legAngle2, legAngle1, 5*Math.cos(legAngle2), 38.5, -5*Math.sin(legAngle2));
        this.createCylinder(material, 0.4, 0.4, 80, 0, legAngle3, legAngle1, 5*Math.cos(legAngle3), 38.5, -5*Math.sin(legAngle3));
    }

    //
    //createLampBulbSupport: method that creates the lamp bulb support
    //
    createLampBulbSupport() {
        'use strict';
        var angle90 = Math.PI/2;
        var angle180 = Math.PI;
        var angle270 = 3*Math.PI/2;
        var material = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true});

        this.createTorus(material, 5, 0.4, 5, 20, angle90, 0, 77, 0);
        this.createTorus(material, 2, 0.2, 5, 20, angle90, 0, 77, 0);
        this.createCylinder(material, 0.2, 0.2, 3, 0, 0, angle90, 3.2, 77, 0);
        this.createCylinder(material, 0.2, 0.2, 3, 0, angle90, angle90, 0, 77, -3.2);
        this.createCylinder(material, 0.2, 0.2, 3, 0, angle180, angle90, -3.2, 77, 0);
        this.createCylinder(material, 0.2, 0.2, 3, 0, angle270, angle90, 0, 77, 3.2);
    }

    //
    //createLampBulb: method that creates the lamp bulb
    //
    createLampBulb() {
        'use strict';
        var material = new THREE.MeshBasicMaterial({color: 0x00ffff, wireframe: true});

        this.createCylinder(material, 1.8, 1.8, 2.5, 0, 0, 0, 0, 77, 0);
        this.createSphere(material, 4, 50, 50, 0, 81, 0)
    }

    //
    //createLampAbajour: method that creates the lamp abajour
    //
    createLampAbajour() {
        'use strict';
        var angle1 = -Math.PI/16;
        var angle90 = Math.PI/2;
        var angle180 = Math.PI;
        var angle270 = 3*Math.PI/2;
        var material = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true});

        this.createCylinder(material, 0.2, 0.2, 20, 0, 0, angle1, 7, 85.3, 0);
        this.createCylinder(material, 0.2, 0.2, 20, 0, angle90, angle1, 0, 85.3, -7);
        this.createCylinder(material, 0.2, 0.2, 20, 0, angle180, angle1, -7, 85.3, 0);
        this.createCylinder(material, 0.2, 0.2, 20, 0, angle270, angle1, 0, 85.3, 7);
        this.createCylinder(new THREE.MeshBasicMaterial({color: 0x808080, wireframe: true}), 9, 16, 28, 0, 0, 0, 0, 81, 0);
    }
}
