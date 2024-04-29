// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let chessboard;

function setup() {
  createCanvas(windowWidth, windowHeight);
  chessboard = new Chessboard(width, height)

}

function draw() {
  background(255);
  chessboard.display()
}

