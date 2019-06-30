class Data {
  constructor() {
    'use strict';
    //CAMERA

    this.camera_ratio = 6;
    this.camera_position = [0, 200, 0];
    this.camera_lookat = [0, 100, 0];

    //FIELD

    this.floor_color = 0xffffff;
    this.floor_size = [200, 100]; // EVERYTHING DEPENDS ON THESE NUMBERS
    this.floor_position = [0, 0, 0];

    this.walls_color = 0xffffff;
    this.walls_depth = 5;

    this.walls_height = Math.sqrt(Math.pow(this.floor_size[0], 2) + Math.pow(this.floor_size[1], 2))/10;    //
    this.long_walls_width = this.floor_size[0] + this.walls_depth;                                          //
    this.short_walls_width = this.floor_size[1] + this.walls_depth;                                         //  DO NOT
    this.right_position = [this.floor_size[0]/2, this.walls_height/2, 0];                                   //  CHANGE
    this.left_position = [-this.floor_size[0]/2, this.walls_height/2, 0];                                   //
    this.front_position = [0, this.walls_height/2, this.floor_size[1]/2];                                   //
    this.back_position = [0, this.walls_height/2, -this.floor_size[1]/2];                                   //

    //BALLS

    this.n_balls = 10;

    this.radius = this.walls_height/2;
    this.ball_position_x = this.getRandom(-this.floor_size[0]/2 + this.radius + this.walls_depth/2, this.floor_size[0]/2 - this.radius - this.walls_depth/2);
    this.ball_position_z = this.getRandom(-this.floor_size[1]/2 + this.radius + this.walls_depth/2, this.floor_size[1]/2 - this.radius - this.walls_depth/2);
    this.ball_position = [this.ball_position_x, this.radius, this.ball_position_z];
    this.ball_color = this.getRandomColor();
  }


  getRandom(min, max) {
    return Math.random() * (max - min) + min;
  }

  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
