class Table extends OfficeObject {
  constructor(x, y, z) {
    'use strict';
    super(x, y, z);
  }

  //
  //createTableLeg: function responsible for creating a leg of the table
  //Arguments:      x, y, z
  //
  createTableLeg(x, y, z) {
    'use strict';
    this.createCylinder(new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true }), 2, 2, 60, 0, 0, 0, x, y, z);
  }

  //
  //createTableLeg: function responsible for creating the table top
  //
  createTableTop() {
    'use strict';
    this.createBox(new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true }), 80, 5, 120, 0, 62.5, 0);
  }
}
