# 2nd project laboratory - Computer Graphics

**!! We do not recommend using this project as a base for your own !!**

**Final grade**: 3.5/5.0

## Improvement points

1. breaking a lot of crucial OO principles - the main class contain functions that detect ball collisions using `for cycles` instead of having the balls checking their own collisions, 
this separation in the code originated a lot of problems afterwards and difficults code reading.
2. when collision is detected the function sends the balls the opposite way of collision but if they are intersecting in more than 1 pixel
with other ball they will keep bouncing together until they bounce with only 1 (they appear to be stuck together for a while).
3. the camera 3 was supposed to follow a ball from the same exact point so, if the ball hits the wall and changes direction,
the camera should change too, this was not implemented.
4. `Resize` function is poorly implemented

## Project and commands

The purpose of this project was to develop a field of balls to implement collision with moving and static objects and implement
a moving camera.

You can switch between the 3 cameras by pressing `1`, `2` and `3`. `E` shows the axis of each ball. `A` fills the mesh.



