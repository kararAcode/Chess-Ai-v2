// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

import Chessboard from "./scripts/chessboard.js"; 
import ChessUI from "./scripts/chessUI.js";
const mainSketch = (p) => {
  let chessUI;
  let chessboard;
  let images = {};

  p.preload = () =>{
    const pieceNames = ["king", "queen", "bishop", "knight", "rook", "pawn"];
    const colors = ["b", "w"];
    
    colors.forEach(color => {
      images[color] = {};
      pieceNames.forEach(name => {
          const path = `../assets/${color}_${name}.png`;
          images[color][name] = p.loadImage(path);
      });
    });
  }

  p.setup = () =>{
    p.createCanvas(p.windowWidth, p.windowHeight);
    chessboard = new Chessboard();
    chessboard.setupPieces();
    chessUI = new ChessUI(p, images, chessboard);
  
  
  }
  
  p.draw = () =>{

    chessUI.display();
    chessUI.update();
  }
  
}

new p5(mainSketch);