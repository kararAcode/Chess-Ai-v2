import SlidingPiece from "./slidingPiece.js";

/**
 * Represents a Rook piece in a chess game. Rooks can move any number of squares
 * vertically or horizontally until obstructed. This class extends SlidingPiece to
 * utilize its mechanism for calculating possible sliding moves based on given direction vectors.
 */
class Rook extends SlidingPiece {
    /**
     * Constructs a Rook piece with specified initial position and color.
     * @param {number} x The initial x-coordinate (column) on the chessboard where the rook is placed.
     * @param {number} y The initial y-coordinate (row) on the chessboard where the rook is placed.
     * @param {string} color The color of the rook ('w' for white, 'b' for black).
     * @param {Array<Array<Piece|null>>} board The 2D array representing the game board, where each cell may contain a Piece or null.
     */
    constructor(x, y, color, board) {
        // Direction arrays for the rook: right, up, left, down
        super("rook", x, y, color, board, [[1, 0], [0, 1], [-1, 0], [0, -1]]);
    }
}

export default Rook;