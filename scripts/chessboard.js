/**
 * Represents a chessboard in a chess game, managing the state of the game,
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
        // this.setupPieces()

        this.board[7][4] = new King(7, 4, 'b', this);

        // White Queen placed at e7 to checkmate the Black King
        this.board[6][4] = new Queen(6, 4, 'w', this);

        // Optional: White King at e1 for completeness of game setup
        this.board[0][4] = new King(0, 4, 'w', this);

        // Other supporting pieces that could be blocking escape squares or contributing to the checkmate could be added here
        // Example: Adding a White Rook at h8, assuming row 7, column 7 for simplicity
        this.board[7][7] = new Rook(7, 7, 'w', this);


        // console.log(this.board);

        console.log(this.detectCheckmate("w"))

        this.cellWidth = width / 8;
        this.cellHeight = height / 8;

        // Ensure that cells are always square
        if (this.cellWidth > this.cellHeight) {
            this.cellWidth = this.cellHeight;
        } else {
            this.cellHeight = this.cellWidth;
        }
    }

    /**
     * Initializes the pieces on the board to their standard starting positions.
     * Places pawns and major pieces (rooks, knights, bishops, queens, and kings)
     * for both black and white sides.
     */
    setupPieces() {
        const mainForces = [Rook, Knight, Bishop, Queen, King, Bishop, Knight, Rook];
        for (let i = 0; i < mainForces.length; i++) {
            this.board[0][i] = new mainForces[i](0, i, "b", this);
            this.board[1][i] = new Pawn(1, i, "b", this);
            this.board[6][i] = new Pawn(6, i, "w", this);
            this.board[7][i] = new mainForces[i](7, i, "w", this);
        }
    }

    /**
     * Retrieves all pieces of a specified color from the board.
     * 
     * @param {string} color The color of the pieces to filter for ('w' for white, 'b' for black).
     * @param {Array} board Optional parameter for the board from which to retrieve pieces; defaults to the main board.
     * @returns {Array} An array containing all pieces of the specified color.
     */
    getPieces(color, board = this.board) {
        return board.flatMap(row => row.filter(piece => piece && piece.color === color));
    }

    /**
     * Clones the current state of the board, creating a new board array that can be modified without affecting the original.
     * 
     * @returns {Array} A new 8x8 board array cloned from the current board.
     */
    cloneBoard() {
        
        let newBoard = Array(8).fill(null).map(() => Array(8).fill(null));
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {

                if (this.board[i][j] !== null) {
                    let clonedPiece = this.board[i][j].clone();
                    newBoard[i][j] = clonedPiece;

                }

            }
        }
        return newBoard;
    }

    /**
     * Attempts to detect checkmate for a specified color by simulating all possible moves for that color.
     * 
     * @param {string} color The color to check for potential checkmate.
     * @returns {boolean} True if checkmate is detected, otherwise false.
     */
    detectCheckmate(color) {
        let simulatedBoard = this.cloneBoard();
        let pieces = this.getPieces(color, simulatedBoard);
        console.log(simulatedBoard);
        for (const piece of pieces) {
            let piecesMoves = piece.getPossibleMoves();
            let oldX = piece.x;
            let oldY = piece.y;
            for (const pieceMove of piecesMoves) {
                let capturedPiece = simulatedBoard[pieceMove.x][pieceMove.y];
                this.move(piece, pieceMove, simulatedBoard);
                

                if (!this.isOpponentKingInDanger(color, simulatedBoard)) {
                    return false;
                }
                // Reset the move
                simulatedBoard[pieceMove.x][pieceMove.y] = capturedPiece;
                simulatedBoard[oldX][oldY] = piece;
                piece.x = oldX;
                piece.y = oldY;
            }
        }
        return true;
    }

    /**
     * Finds the king of a given color on a specified board or the main board.
     * 
     * @param {string} color Color of the king to find ('w' for white, 'b' for black).
     * @param {Array} board Optional parameter for the board to check; defaults to the main board.
     * @returns {Piece|null} The king piece of the specified color, or null if the king is not found.
     */
    findKing(color, board = this.board) {
        for (let row of board) {
            for (let piece of row) {
                if (piece instanceof King && piece.color === color) {
                    return piece;
                }
            }
        }
        return null;
    }

    /**
     * Checks if the opponent's king is in danger of being captured on the next move,
     * effectively determining if the king is in check. This method evaluates all possible
     * moves for all pieces of the given color to see if any can capture the opposing king.
     *
     * @param {string} color The color of the pieces to check the moves for.
     * @param {Array} board Optional parameter for the board to check; defaults to the main board.
     * @returns {boolean} True if the opponent's king is in check, otherwise false.
     */
    isOpponentKingInDanger(color, board = this.board) {
        let opponentColor = color === "w" ? "b" : "w";
        let opponentKing = this.findKing(opponentColor, board);
        let pieces = this.getPieces(color, board);
        for (const piece of pieces) {
            let piecesMoves = piece.getPossibleMoves();
            for (const move of piecesMoves) {
                if (opponentKing && move.x === opponentKing.x && move.y === opponentKing.y) {
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
     * @param {Array} board Optional parameter for the board on which to make the move; defaults to the main board.
     */
    move(piece, move, board = this.board) {
        if (piece instanceof Pawn) {
            piece.firstTurn = false;
        }
        board[piece.x][piece.y] = null;
        board[move.x][move.y] = piece;
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
