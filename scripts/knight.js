import Piece from "./piece.js";
/**
 * Represents a Knight piece in a chess game. Knights have a unique non-linear movement pattern 
 * that allows them to "jump" over other pieces. They move in an L-shape pattern: two squares 
 * in one direction and one square perpendicular, or one square in one direction and two squares
 * perpendicular. This class extends the Piece class, utilizing its basic setup and adding
 * specialized movement capabilities for the Knight.
 */
class Knight extends Piece {
    /**
     * Constructs a Knight piece with specified initial position and color.
     * @param {number} x The initial x-coordinate (column) on the chessboard where the knight is placed.
     * @param {number} y The initial y-coordinate (row) on the chessboard where the knight is placed.
     * @param {string} color The color of the knight ('w' for white, 'b' for black).
     * @param {Array<Array<Piece|null>>} board The 2D array representing the game board, where each cell may contain a Piece or null.
     */
    constructor(x, y, color, board) {
        super("knight", x, y, color, board); // Call the parent class constructor
    }

    /**
     * Calculates all possible moves for the knight from its current position, based on its unique
     * movement abilities. The knight can move to any of the 8 possible L-shaped positions around its
     * current position, provided the move does not place the knight outside the chessboard.
     * 
     * @returns {Array<Object>} An array of objects each with properties 'x' and 'y' representing possible moves.
     */
    getPossibleMoves() {
        let dirArr = [
            [2, 1],   // Move two squares up, one square right
            [2, -1],  // Move two squares up, one square left
            [-2, 1],  // Move two squares down, one square right
            [-2, -1], // Move two squares down, one square left
            [1, 2],   // Move one square up, two squares right
            [1, -2],  // Move one square up, two squares left
            [-1, 2],  // Move one square down, two squares right
            [-1, -2]  // Move one square down, two squares left
        ];

        let moves = [];
       
        for (const dir of dirArr) {
            let moveX = this.x + dir[0];
            let moveY = this.y + dir[1];

            if (this.isOutside(moveX, moveY)) {
                continue; // Skip if the move is outside the board
            }
            
            if (this.board[moveX][moveY] === null || this.isValidTarget(moveX, moveY)) {
                moves.push({ x: moveX, y: moveY }) // Add move if the square is empty or contains an opponent's piece
            }
        }

        return moves; // Return the list of valid moves
    }
}

export default Knight;
