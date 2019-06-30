# 4th project laboratory - Computer Graphics

**Final grade**: 3.0/4.0

## Improvement points
1. There's a bug that in some cases when showing the message and restarting the game the ball will disappear, we couldn't
figure what it was.
2. `Resize` function wasn't implemented;

## Project and commands
The purpose of this project was to develop a chess board with a rubik cube, a billiard ball on top and a hidden. The idea was to work with
textures and messages.

To run this project you need to run `python3 -m http.server` in the folder, due to the images and textures.

You can show and hide the wires with `A`. `B` will get the ball rolling around the Rubik's cube and stop. `D` will turn on/off the 
directiona light and `P` the point light. `L` will turn on/off the illumination calculations. `S` will stop and show a message. 
`R` will restart the chess board. OrbitControls have been implemented (drag the mouse).
