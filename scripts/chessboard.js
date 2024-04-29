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

        this.board[0][0] = new Rook(0, 0, "b", this);
        this.board[7][0] = new King(7, 0, "w", this);

        console.log(this.isOpponentKingInDanger("b"));

        // this.setupPieces();
        
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
     * Retrieves all pieces of a specified type and optionally a specified color from the board.
     * 
     * @param {string} [color] The color of the pieces to filter for ('w' for white, 'b' for black).
     * @returns {Array} An array containing all pieces of the specified type and color.
     */
    getPieces(color) {
        return this.board.flatMap(row => row.filter(piece => piece && piece.color === color));
    }
    

    /**
     * Finds the king of a given color.
     * 
     * @param {string} color Color of the king to find ('w' or 'b').
     * @returns {Piece} The king piece of the specified color.
     */
    findKing(color) {
        for (let row of this.board) {
            for (let piece of row) {
                if (piece instanceof King && piece.color === color) {
                    return piece; // Return the first found king of the specified color
                }
            }
        }
        return null; // Return null if no king is found
    }

    /**
     * Checks if the opponent's king is in danger of being captured on the next move,
     * effectively determining if the king is in check. This method evaluates all possible
     * moves for all pieces of the given color to see if any can capture the opposing king.
     *
     * @param {string} color The color of the pieces to check the moves for. This should
     *        be 'w' for white or 'b' for black. The function will check if these pieces
     *        can put the opposite color's king in check.
     * @returns {boolean} True if the opponent's king is in check, otherwise false.
     */
    isOpponentKingInDanger(color) {
        let opponentColor = color === "w" ? "b" : "w"
        let opponentKing = this.findKing(opponentColor);

        let pieces = this.getPieces(color);

        for (const piece of pieces) {
            let piecesMoves = piece.getPossibleMoves();

            for (const move of piecesMoves) {
                if (opponentKing.x === move.x && opponentKing.y === move.y) {
                    return true;
                }
            }
        }

        return false;
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
