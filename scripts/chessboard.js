import Pawn from "./pawn.js";
import Rook from "./rook.js";
import Knight from "./knight.js";
import Bishop from "./bishop.js";
import Queen from "./queen.js";
import King from "./king.js";
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
            this.board[0][i] = new mainForces[i](0, i, "b", this.board);
            this.board[1][i] = new Pawn(1, i, "b", this.board);
            this.board[6][i] = new Pawn(6, i, "w", this.board);
            this.board[7][i] = new mainForces[i](7, i, "w", this.board);
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
                    let clonedPiece = this.board[i][j].clone(newBoard);
                    newBoard[i][j] = clonedPiece;

                }

            }
        }
        return newBoard;
    }

    /**
     * Checks if the opponent is in checkmate, meaning the opponent's king is in check and no legal moves can remove the king from check.
     *
     * @param {string} color The color of the player making the move, used to determine the opponent.
     * @returns {boolean} True if the opponent is checkmated, otherwise false.
     */
    isOpponentCheckmated(color) {

        let simulatedBoard = this.cloneBoard();
        let opponentColor = color === "w" ? "b" : "w";
    
        let pieces = this.getPieces(opponentColor, simulatedBoard);
        for (let piece of pieces) {
            let piecesMoves = piece.getPossibleMoves();
            let oldX = piece.x;
            let oldY = piece.y;
            for (const pieceMove of piecesMoves) {
                let capturedPiece = simulatedBoard[pieceMove.x][pieceMove.y];

                this.move(piece, pieceMove, simulatedBoard);

    
               
                if (!this.isKingInCheck(opponentColor, simulatedBoard)) {
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
     * Checks if the king of the specified color is in check.
     * This method evaluates all possible moves for all pieces of the opponent's color
     * to see if any can capture the king of the specified color.
     *
     * @param {string} color The color of the king to check for check.
     * @param {Array<Array<Piece|null>>} board Optional parameter for the board to check; defaults to the main board.
     * @returns {boolean} True if the king of the specified color is in check, otherwise false.
     */
    isKingInCheck(color, board = this.board) {
        let opponentColor = color === "w" ? "b" : "w"; // Determine the opponent's color based on the given color
        let king = this.findKing(color, board); // Find the king of the specified color on the board
        let opponentPieces = this.getPieces(opponentColor, board); // Get all pieces of the opponent's color

        for (const piece of opponentPieces) {
            let possibleMoves = piece.getPossibleMoves(); // Get all possible moves for each opponent piece
            for (const move of possibleMoves) {
                if (king && move.x === king.x && move.y === king.y) {
                    return true; // The king is in check if any move can capture the king
                }
            }
        }
        return false; // Return false if no moves put the king in check
    }


    isValidMove(piece, move) {
        let simulatedBoard = this.cloneBoard();
        this.move(piece, move, simulatedBoard);
        return !this.isKingInCheck(piece.color, simulatedBoard);
       
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
    display(p) {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                p.fill((i + j) % 2 === 0 ? "rgb(238, 238, 210)" : "rgb(118, 150, 86)");
                p.rect(this.cellWidth * j + p.width / 2 - this.cellWidth * 4, this.cellHeight * i, this.cellWidth, this.cellHeight);
            }
        }
    }
}

export default Chessboard;