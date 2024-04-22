/**
 * Represents a pawn piece in a chess game. Pawns have unique movement rules:
 * they move forward one square, but can move two squares from their initial position.
 * They capture diagonally.
 */
class Pawn extends Piece {
    /**
     * Constructs a pawn piece.
     * @param {number} x The x-coordinate (column) of the pawn on the chessboard.
     * @param {number} y The y-coordinate (row) of the pawn on the chessboard.
     * @param {string} color The color of the pawn ('w' for white, 'b' for black).
     * @param {Chessboard} chessboard The chessboard on which the pawn is placed.
     */
    constructor(x, y, color, chessboard) {
        super("pawn", x, y, color, chessboard); // Call to the parent class constructor
        this.firstTurn = true; // Indicates if the pawn is making its first move
        this.dir = this.color == "b" ? 1 : -1; // Direction of movement, based on color
    }

    /**
     * Calculates and returns all possible moves for this pawn from its current position,
     * considering its specific movement and capture rules.
     * @returns {Array<Array<number>>} An array of coordinate pairs [x, y] representing possible moves.
     */
    getPossibleMoves() {
        let moves = [];
        let forwardOne = this.x + this.dir;
        let forwardTwo = this.x + this.dir * 2;

        // Move one square forward if it's not occupied and within board limits
        if (this.chessboard.board[forwardOne][this.y] == null && !this.isOutside(forwardOne, this.y)) {
            moves.push([forwardOne, this.y]);
        }

        // Move two squares forward on the first turn if it's not occupied and within board limits
        if (this.chessboard.board[forwardTwo][this.y] == null && this.firstTurn && !this.isOutside(forwardTwo, this.y)) {
            moves.push([forwardTwo, this.y]);
        }

        // Capture diagonally left if there is an opponent piece and it's within board limits
        if (this.isValidTarget(forwardOne, this.y - 1) && !this.isOutside(forwardOne, this.y - 1)) {
            moves.push([forwardOne, this.y - 1]);
        }

        // Capture diagonally right if there is an opponent piece and it's within board limits
        if (this.isValidTarget(forwardOne, this.y + 1) && !this.isOutside(forwardOne, this.y + 1)) {
            moves.push([forwardOne, this.y + 1]);
        }

        this.firstTurn = false; // After moving, it is no longer the pawn's first turn

        return moves;
    }
}
