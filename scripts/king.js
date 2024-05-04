import Piece from "./piece.js";
/**
 * Represents a King piece in a chess game. The king can move one square in any direction:
 * horizontally, vertically, or diagonally. This class extends the Piece class, utilizing its basic setup
 * and adding specialized movement capabilities for the king.
 */
class King extends Piece {
    /**
     * Constructs a King piece with specified initial position and color.
     * @param {number} x The initial x-coordinate (column) on the chessboard where the king is placed.
     * @param {number} y The initial y-coordinate (row) on the chessboard where the king is placed.
     * @param {string} color The color of the king ('w' for white, 'b' for black).
     * @param {Chessboard} chessboard The chessboard instance to which this king belongs.
     */
    constructor(x, y, color, board) {
        super("king", x, y, color, board); // Call to the parent class constructor
    }

    /**
     * Calculates all possible moves for the king from its current position, considering that the king
     * can move only one square in any direction. The method checks each potential move for boundaries
     * and blockages and adds it to the list of valid moves if the target square is either unoccupied
     * or occupied by an opponent's piece.
     * 
     * @returns {Array<Array<number>>} An array of coordinate pairs [x, y] representing possible moves.
     */
    getPossibleMoves() {
        let dirArr = [
            [1, 0],   // Right
            [0, 1],   // Up
            [-1, 0],  // Left
            [0, -1],  // Down
            [1, 1],   // Up-right diagonal
            [1, -1],  // Down-right diagonal
            [-1, 1],  // Up-left diagonal
            [-1, -1]  // Down-left diagonal
        ];

        let moves = [];
       
        for (const dir of dirArr) {
            let moveX = this.x + dir[0];
            let moveY = this.y + dir[1];

            // Continue if the move is outside the board boundaries
            if (this.isOutside(moveX, moveY)) {
                continue;
            }

            // Add move if the square is empty or contains an opponent's piece
            if (this.board[moveX][moveY] === null || this.isValidTarget(moveX, moveY)) {
                moves.push({ x: moveX, y: moveY });
            }
        }

        return moves; // Return the list of valid moves
    }
}

export default King;