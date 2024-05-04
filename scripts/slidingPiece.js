import Piece from "./piece.js";
/**
 * SlidingPiece is an abstract class for chess pieces that move in straight lines
 * until they are obstructed (e.g., Rook, Bishop, Queen). It extends the Piece class,
 * utilizing its basic setup and adding direction-based movement capabilities.
 */
class SlidingPiece extends Piece {
    /**
     * Constructs a SlidingPiece with specified directions of movement.
     * @param {string} name The name of the piece (e.g., 'rook', 'bishop', 'queen').
     * @param {number} x The initial x-coordinate (column) on the chessboard.
     * @param {number} y The initial y-coordinate (row) on the chessboard.
     * @param {string} color The color of the piece ('w' for white, 'b' for black).
     * @param {Array<Array<Piece|null>>} board The 2D array representing the game board, where each cell may contain a Piece or null.
     * @param {Array<Array<number>>} dirArr An array of direction vectors indicating 
     * the possible directions in which the piece can move (e.g., [[1, 0], [0, 1]] for a Rook).
     */
    constructor(name, x, y, color, board, dirArr) {
        super(name, x, y, color, board);
        this.dirArr = dirArr;  // Direction vectors are stored to determine movement possibilities.
    }

    /**
     * Calculates all possible moves for the piece based on its directional movement capabilities.
     * It checks each direction and continues moving in that direction until obstructed by another piece
     * or the edge of the chessboard.
     * 
     * @returns {Array<Object>} An array of objects each with properties 'x' and 'y' representing possible moves.
     */
    getPossibleMoves() {
        let moves = [];
        for (const dir of this.dirArr) { // Iterate over each direction the piece can move.
            let n = 1; // Start moving one step at a time in the given direction.
            while (n < 8) { // Continue until the piece can no longer move in this direction.
                let moveX = this.x + n * dir[0]; // Calculate the new x-coordinate.
                let moveY = this.y + n * dir[1]; // Calculate the new y-coordinate.

                if (this.isOutside(moveX, moveY)) break; // If the move is outside the chessboard, stop moving in this direction.

                if (this.board[moveX][moveY] !== null) { // If there is a piece at the calculated position
                    if (this.isValidTarget(moveX, moveY)) { // Check if the piece can be captured (i.e., is of the opposite color)
                        moves.push({ x: moveX, y: moveY }) // If so, add this move as a valid move.
                    }
                    break; // Stop checking further in this direction after encountering any piece.
                }

                moves.push({ x: moveX, y: moveY }) // If the position is empty, add it as a valid move.
                n++; // Increment to check the next position in this direction.
            }
        }
        return moves; // Return all calculated moves.
    }
}

export default SlidingPiece;
