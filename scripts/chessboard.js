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
     * sets up the initial placement of pieces
     */
    constructor() {
        this.board = Array(8).fill(null).map(() => Array(8).fill(null));
        this.turn = 'w'; // 'w' for white, 'b' for black
        
        // Optionally initialize the board with pieces
        // this.setupPieces();
    }

    /**
     * Initializes the pieces on the board to their standard starting positions.
     */
    setupPieces() {


        const mainForces = [Rook, Knight, Bishop, Queen, King, Bishop, Knight, Rook];
        for (let i = 0; i < 8; i++) {
            this.board[0][i] = new mainForces[i](0, i, 'b', this.board);
            this.board[1][i] = new Pawn(1, i, 'b', this.board);
            this.board[6][i] = new Pawn(6, i, 'w', this.board);
            this.board[7][i] = new mainForces[i](7, i, 'w', this.board);
        }
    }

    /**
     * Retrieves all pieces of a specified color from the board.
     * @param {string} color The color of the pieces to filter for ('w' for white, 'b' for black).
     * @param {Array<Array<Piece|null>>} board Optional parameter for the board from which to retrieve pieces; defaults to the main board.
     * @returns {Array<Piece>} An array containing all pieces of the specified color.
     */
    getPieces(color, board = this.board) {
        return board.flatMap(row => row.filter(piece => piece && piece.color === color));
    }

    /**
     * Finds the king of a given color on the specified board or the main board.
     * @param {string} color Color of the king to find ('w' for white, 'b' for black).
     * @param {Array<Array<Piece|null>>} board Optional parameter for the board to check; defaults to the main board.
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
     * Clones the current state of the board, creating a new board array that can be modified without affecting the original.
     * @returns {Array<Array<Piece|null>>} A new 8x8 board array cloned from the current board.
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
     * Moves a piece on the board from its current position to a new position.
     * Also handles the state change for pawns on their first move.
     * @param {Piece} piece The piece to move.
     * @param {Object} move An object containing the x and y coordinates of the move's destination.
     * @param {Array<Array<Piece|null>>} board Optional parameter for the board on which to make the move; defaults to the main board.
     */
    move(piece, move, board = this.board) {
        if (piece instanceof Pawn && piece.firstTurn) {
            piece.firstTurn = false;
        }
        board[piece.x][piece.y] = null;
        board[move.x][move.y] = piece;
        piece.x = move.x;
        piece.y = move.y;

        

    }

    /**
     * Checks if the king of the specified color is in check.
     * This method evaluates all possible moves for all pieces of the opponent's color
     * to see if any can capture the king of the specified color.
     * @param {string} color The color of the king to check for check.
     * @param {Array<Array<Piece|null>>} board Optional parameter for the board to check; defaults to the main board.
     * @returns {boolean} True if the king of the specified color is in check, otherwise false.
     */
    isKingInCheck(color, board = this.board) {
        let opponentColor = color === "w" ? "b" : "w";
        let king = this.findKing(color, board);
        let opponentPieces = this.getPieces(opponentColor, board);

        for (const piece of opponentPieces) {
            let possibleMoves = piece.getPossibleMoves();
            for (const move of possibleMoves) {
                if (king && move.x === king.x && move.y === king.y) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * Checks if the opponent is in checkmate, meaning the opponent's king is in check and no legal moves can remove the king from check.
     *
     * @param {string} color The color of the player making the move, used to determine the opponent.
     * @returns {boolean} True if the opponent is checkmated, otherwise false.
     */
    isCheckmated(color) {

        let simulatedBoard = this.cloneBoard();

        let pieces = this.getPieces(color, simulatedBoard);
        for (let piece of pieces) {
            let piecesMoves = piece.getPossibleMoves();
            let oldX = piece.x;
            let oldY = piece.y;
            for (const pieceMove of piecesMoves) {
                let capturedPiece = simulatedBoard[pieceMove.x][pieceMove.y];

                this.move(piece, pieceMove, simulatedBoard);


                
                if (!this.isKingInCheck(color, simulatedBoard)) {
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
     * Determines if a stalemate condition exists for the specified color. A stalemate occurs when the king is not in check,
     * but the player has no legal moves available. This function checks all possible moves for all pieces of the given color
     * to verify if any legal move can be made.
     * @param {string} color The color of the pieces to check for stalemate. This should be either 'w' for white or 'b' for black.
     * @returns {boolean} Returns true if a stalemate condition is detected, meaning the player of the specified color
     * has no legal moves and their king is not in check. Returns false if the king is in check or if at least one legal move exists.
     */
    isStalemate(color) {
        if (this.isKingInCheck(color)) {
            return false;
        }

        let pieces = this.getPieces(color);
        for (let piece of pieces) {
            let piecesMoves = piece.getPossibleMoves();
            for (const pieceMove of piecesMoves) {
                if (this.isValidMove(piece, pieceMove)) {
                    return false;  // If there's at least one legal move, it's not a stalemate
                }
            }
        }
        return true;  // No legal moves found, it's a stalemate
    }

    /**
     * Evaluates whether a proposed move for a given piece is valid. The validity of the move is determined primarily by ensuring that executing the move would not leave the player's king in check. This method simulates the move on a cloned version of the current game board to check the resulting game state without affecting the actual game board.
     * 
     * @param {Piece} piece The piece that is being moved. This should be a reference to the piece object from the actual game board.
     * @param {Object} move An object containing the target coordinates for the move. It should have 'x' and 'y' properties representing the row and column indices on the board, respectively.
     * @returns {boolean} Returns true if the move is legal (does not result in the player's king being in check); returns false otherwise.
     */
    isValidMove(piece, move) {
        // Clone the current board to simulate the move without affecting the real game state
        let simulatedBoard = this.cloneBoard();

        // Perform the move on the cloned board using the piece's current position
        // 'piece' is from the actual board, so its equivalent on the cloned board is at the same coordinates
        this.move(simulatedBoard[piece.x][piece.y], move, simulatedBoard);

        // Check if making this move places the player's king in check
        return !this.isKingInCheck(piece.color, simulatedBoard);
    }

    getLegalMoves(piece) {
        let possibleMoves = piece.getPossibleMoves(); // From the Piece class
        let legalMoves = possibleMoves.filter(move => this.isValidMove(piece, move));
        return legalMoves;
    }


   
}


export default Chessboard;