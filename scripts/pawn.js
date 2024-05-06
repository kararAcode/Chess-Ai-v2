import Piece from "./piece.js";
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
     * @param {Array<Array<Piece|null>>} board The 2D array representing the game board, where each cell may contain a Piece or null.
     */
    constructor(x, y, color, board) {
        super("pawn", x, y, color, board); // Call to the parent class constructor
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
        if (!this.isOutside(forwardOne, this.y) && this.board[forwardOne][this.y] === null ) {
            moves.push({x: forwardOne, y: this.y});
        }

        // Move two squares forward on the first turn if it's not occupied and within board limits
        if (!this.isOutside(forwardTwo, this.y) && this.board[forwardTwo][this.y] === null && this.board[forwardOne][this.y] === null && this.firstTurn) {
            moves.push({x: forwardTwo, y: this.y});
        }

        // Capture diagonally left if there is an opponent piece and it's within board limits
        if (!this.isOutside(forwardOne, this.y - 1) && this.isValidTarget(forwardOne, this.y - 1)) {
            moves.push({x: forwardOne, y: this.y - 1});
        }

        // Capture diagonally right if there is an opponent piece and it's within board limits
        if (!this.isOutside(forwardOne, this.y + 1) && this.isValidTarget(forwardOne, this.y + 1) ) {
            moves.push({x: forwardOne, y: this.y + 1});
        }

        return moves;
    }

}

export default Pawn;