// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

import Chessboard from "./scripts/chessboard.js"; 
import ChessUI from "./scripts/chessUI.js";
import StateManager from "./scripts/stateManager.js";
import MainMenuUI from "./scripts/mainmenuUI.js";
import GameOverUI from "./scripts/gameOverUI.js";


const mainSketch = (p) => {
  let chessUI;
  let mainMenuUI;
  let gameOverUI;
  let chessboard;
  let images = {};
  let stateManager;


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
    stateManager = new StateManager("mainmenu");
   

    mainMenuUI = new MainMenuUI(p, stateManager);
    chessUI = new ChessUI(p, images, chessboard, stateManager);
    gameOverUI = new GameOverUI(p, stateManager);
  
  }
  
  p.draw = () =>{

    let state = stateManager.getState();

    if (state === "mainmenu") {
      mainMenuUI.display();
      mainMenuUI.update();
    }

    else if  (state === "play") {
      chessUI.display();
      chessUI.update();
    }

    else if (state === "gameover") {
      gameOverUI.display();
      gameOverUI.update();
    }
    
  }
  
}

new p5(mainSketch);