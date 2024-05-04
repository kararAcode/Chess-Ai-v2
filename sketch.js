// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

import Chessboard from "./scripts/chessboard.js"; 


const mainSketch = (p) => {
  let chessboard;

  p.setup = () =>{
    p.createCanvas(p.windowWidth, p.windowHeight);
    chessboard = new Chessboard(p.width, p.height);
    chessboard.setupPieces();
    
  
  
  }
  
  p.draw = () =>{
    p.background(255);
    chessboard.display(p)
  }
  
}

new p5(mainSketch);