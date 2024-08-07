import SlidingPiece from "./slidingPiece.js";

/**
 * Represents a Queen piece in a chess game. The queen combines the power of the rook and bishop
 * and can move any number of squares along a rank, file, or diagonal, until she is obstructed.
 * This class extends SlidingPiece to utilize its mechanism for calculating possible sliding moves
 * based on given direction vectors.
 */
class Queen extends SlidingPiece {
    /**
     * Constructs a Queen piece with specified initial position and color.
     * @param {number} x The initial x-coordinate (column) on the chessboard where the queen is placed.
     * @param {number} y The initial y-coordinate (row) on the chessboard where the queen is placed.
     * @param {string} color The color of the queen ('w' for white, 'b' for black).
     * @param {Array<Array<Piece|null>>} board The 2D array representing the game board, where each cell may contain a Piece or null.
     */
    constructor(x, y, color, board) {
        // Direction arrays for the queen: includes horizontal, vertical, and diagonal directions
        super("queen", x, y, color, board, [[1, 0], [0, 1], [-1, 0], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]]);
    }
}

export default Queen;