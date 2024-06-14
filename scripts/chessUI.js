import Chessboard from "./chessboard.js";
import Piece from "./piece.js";
import GameController from "./gamecontroller.js";
const TILESTATE = {
    MOVE: 0,
    ACTIVE: 1,
    CHECK: 2,
};

class ChessUI {
    /**
     * Constructs a ChessUI instance which handles all user interface aspects for a chess game using p5.js.
     * It manages drawing the chessboard, pieces, and handling user interactions like mouse clicks.
     * 
     * @param {p5} p - The p5 instance, used for drawing.
     * @param {Object} images - An object containing preloaded p5 Image objects organized by color and type of chess pieces.
     * @param {Chessboard} game - The game logic handler which includes the current state of the chessboard.
     */
    constructor(p, images, game, stateManager) {
        this.p = p;
        this.images = images;
        this.game = game;
        this.GameController = new GameController(this.game);
        this.stateManager = stateManager;

        // Calculate cell dimensions to ensure the board fits in the canvas and cells are square.
        this.cellWidth = this.cellHeight = Math.min(p.width / 8, p.height / 8);

        this.activePiecePos = null;
        this.tileMatrix = Array(8).fill(false).map(() => Array(8).fill(false)); // Matrix to keep track of which cells are currently highlighted

        this.stateManager.on('play', ({ gamemode }) => {
            this.GameController.initialize(gamemode);
            this.tileMatrix = Array(8).fill(false).map(() => Array(8).fill(false));        
        })

    }   

    /**
     * Renders the chessboard on the canvas. It draws each cell with alternating colors to create a classic
     * chessboard appearance. The board is centered on the canvas.
     */
    display() {
        this.p.background(255);

        this.displayBoard();
        this.displayPieces();
    
    }

   
    /**
     * Renders the chessboard, drawing each cell with alternating colors to visually represent the board.
     */
    displayBoard() {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                this.p.noStroke();

                this.fillTile(i, j);
                this.p.rect(this.cellWidth * j + this.p.width / 2 - this.cellWidth * 4, this.cellHeight * i, this.cellWidth, this.cellHeight);
            }
        }
    }

    fillTile(x, y) {
        switch (this.tileMatrix[x][y]) {
            case TILESTATE.ACTIVE:
                this.p.fill("yellow");
                break;

            case TILESTATE.CHECK:
                this.p.fill("red");
                break;

            case TILESTATE.MOVE:
                this.p.fill("lightgreen"); 
                break;

            default:
                this.p.fill((x + y) % 2 === 0 ? "rgb(238, 238, 210)" : "rgb(118, 150, 86)");
            }
    }

    /**
     * Renders all chess pieces on the board based on their current positions as defined in the game logic.
     */
    displayPieces() {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (this.game.board[i][j] !== null) {
                    this.displayPiece(this.game.board[i][j]);
                }
            }
        }
    }

    /**
     * Draws a single chess piece on the board using its image and position.
     * 
     * @param {Piece} piece - The piece to be displayed.
     */
    displayPiece(piece) {
        this.p.image(
            this.images[piece.color][piece.name], 
            this.cellWidth * piece.y + this.p.width / 2 - this.cellWidth * 4, 
            this.cellHeight * piece.x, 
            this.cellWidth, 
            this.cellHeight
        );
    }


    /**
     * Update method to handle user interactions during gameplay, such as selecting and moving chess pieces.
     */
    update() {

        let pos = this.getCurrentPosition();
  
        if (this.p.mouseIsPressed && !this.isOutside(pos.x, pos.y)) {
            this.handleCheckState();
            this.handlePieceSelected(pos);

            if (this.tileMatrix[pos.x][pos.y] === TILESTATE.MOVE) {

                this.GameController.handleMove(this.activePiecePos, pos)

                this.tileMatrix = Array(8).fill(false).map(() => Array(8).fill(false)); // Reset highlight matrix

                this.handleGameOverStates();
                
                this.activePiecePos = null;
             
            }
        }
    }


    setGameOverState(msg) {
        setTimeout(() => {
            this.stateManager.setState("gameover", {gameOverText: msg});
        }, 2000);
    }

    handleGameOverStates() {
        this.GameController.onCheckmate((winner) => {
            this.setGameOverState(`Game Over! ${winner} wins!`);
        });
        
        this.GameController.onStalemate(() => {
            this.setGameOverState("Stalemate");
        });
    }

    handlePieceSelected(pos) {
        this.GameController.onPieceSelected(pos, (moves) => {
            this.activePiecePos = pos;
            this.highlightPieceMoves(this.activePiecePos, moves);
        });
    }

    handleCheckState() {
        this.GameController.onCheck((kingPos) => {
            this.highlightCheck(kingPos);
        });
    }

    

    isActive(pos) {
        return this.activePiecePos === pos;
    }

    /**
     * Highlights possible moves for the selected piece on the chessboard.
     * 
     * @param {Piece} piece - The currently active piece to highlight possible moves for.
     */
    highlightPieceMoves(activePiecePos, moves) {
        this.resetMoveHighlights();
        
        this.tileMatrix[activePiecePos.x][activePiecePos.y] = TILESTATE.ACTIVE;

        for (const move of moves) {
            this.tileMatrix[move.x][move.y] = TILESTATE.MOVE;
        }


    }

    resetMoveHighlights() {
        for (let row = 0; row < this.tileMatrix.length; row++) {
            for (let col = 0; col < this.tileMatrix[row].length; col++) {
                if (this.tileMatrix[row][col] !== TILESTATE.CHECK) {
                    this.tileMatrix[row][col] = false;
                }
            }
        }
    }

    highlightCheck(pos) {
        
        this.tileMatrix[pos.x][pos.y] = TILESTATE.CHECK;
        
    }



    /**
     * Calculates the current position of the mouse relative to the chessboard and translates it to board coordinates.
     * 
     * @returns {Object} An object containing the row and column indices (x, y) of the tile under the mouse.
     */
    getCurrentPosition() {
        let originX = this.p.width / 2 - this.cellWidth * 4;
        let mouseXRelativeToBoard = this.p.mouseX - originX;
        let mouseYRelativeToBoard = this.p.mouseY;

        let col = Math.floor(mouseXRelativeToBoard / this.cellWidth);
        let row = Math.floor(mouseYRelativeToBoard / this.cellHeight);

        return { x: row, y: col };
    }

    /**
     * Determines if the given board coordinates are outside the valid range of the chessboard.
     * 
     * @param {number} x - The row index to check.
     * @param {number} y - The column index to check.
     * @returns {boolean} True if the coordinates are outside the chessboard, false otherwise.
     */
    isOutside(x, y) {
        return !(x >= 0 && x < 8 && y >= 0 && y < 8);
    }
}

export default ChessUI;
