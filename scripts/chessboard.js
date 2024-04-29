/**
 * Represents the chessboard in a chess game, managing the state of the game,
 * including piece positions, and providing methods for setting up the board,
 * moving pieces, and rendering the board visually.
 */
class Chessboard {
    /**
     * Constructs a new Chessboard instance. Initializes an 8x8 board,
     * sets up the initial placement of pieces, and calculates cell dimensions
     * based on provided width and height.
     * 
     * @param {number} width The width of the canvas where the board is displayed.
     * @param {number} height The height of the canvas where the board is displayed.
     */
    constructor(width, height) {
        this.board = Array(8).fill(null).map(() => Array(8).fill(null));
        this.setupPieces();
        
        this.cellWidth = width / 8;
        this.cellHeight = height / 8;

        // Ensure that cells are always square by adjusting dimensions
        if (this.cellWidth > this.cellHeight) {
            this.cellWidth = this.cellHeight;
        } else {
            this.cellHeight = this.cellWidth;
        }
    }

    /**
     * Initializes the pieces on the board in their standard starting positions.
     * Places pawns and major pieces (rooks, knights, bishops, queens, and kings)
     * for both black and white sides.
     */
    setupPieces() {
        const mainForces = [Rook, Knight, Bishop, Queen, King, Bishop, Knight, Rook];
        // Set up pieces for black and white
        for (let i = 0; i < mainForces.length; i++) {
            this.board[0][i] = new mainForces[i](0, i, "b", this);
            this.board[1][i] = new Pawn(1, i, "b", this);
            this.board[6][i] = new Pawn(6, i, "w", this);
            this.board[7][i] = new mainForces[i](7, i, "w", this);
        }
    }

    /**
     * Moves a piece on the board from its current position to a new position.
     * Also handles the state change for pawns on their first move.
     * 
     * @param {Piece} piece The piece to move.
     * @param {Object} move An object containing the x and y coordinates of the move's destination.
     */
    move(piece, move) {
        if (piece instanceof Pawn) {
            piece.firstTurn = false;
        }
        this.board[piece.x][piece.y] = null;
        this.board[move.x][move.y] = piece;
        piece.x = move.x;
        piece.y = move.y;
    }

    /**
     * Renders the chessboard on the canvas, drawing each cell and alternately coloring them.
     * Adjusts cell positions based on the board's dimensions to ensure the board is centered.
     */
    display() {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                fill((i + j) % 2 === 0 ? "rgb(238, 238, 210)" : "rgb(118, 150, 86)");
                rect(this.cellWidth * j + width / 2 - this.cellWidth * 4, this.cellHeight * i, this.cellWidth, this.cellHeight);
            }
        }
    }
}
