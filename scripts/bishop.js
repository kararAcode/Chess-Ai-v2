import SlidingPiece from "./slidingPiece.js";
/**
 * Represents a Bishop piece in a chess game. Bishops move diagonally on the board
 * and can continue to move in one of four possible diagonal directions until they are obstructed.
 * This class extends the SlidingPiece to utilize its mechanism for calculating possible sliding moves
 * based on specified direction vectors, suitable for the movement characteristics of a bishop.
 */
class Bishop extends SlidingPiece {
    /**
     * Constructs a Bishop piece with specified initial position and color.
     * @param {number} x The initial x-coordinate (column) on the chessboard where the bishop is placed.
     * @param {number} y The initial y-coordinate (row) on the chessboard where the bishop is placed.
     * @param {string} color The color of the bishop ('w' for white, 'b' for black).
     * @param {Array<Array<Piece|null>>} board The 2D array representing the game board, where each cell may contain a Piece or null.
     */
    constructor(x, y, color, board) {
        // Direction arrays for the bishop: all four possible diagonal directions
        super("bishop", x, y, color, board, [[1, 1], [1, -1], [-1, 1], [-1, -1]]);
    }
}

export default Bishop;