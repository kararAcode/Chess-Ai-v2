import Chessboard from "./chessboard.js";
class GameController {
    /**
     * Constructs a new GameController instance.
     * @param {Chessboard} game - The game logic handler which includes the current state of the chessboard.
     */
    constructor(game) {
        this.game = game;
        this.turn = 'w'; // 'w' for white, 'b' for black
        this.activePiece = null;
        this.gameMode = null;
        this.gameOver = false;
    }

    /**
     * Initializes the game with the specified mode.
     * Resets the game state to its initial configuration.
     * @param {string} mode - The game mode to initialize (e.g., 'normal', 'ai').
     */
    initialize(mode) {
        this.game.setupPieces();
        this.turn = 'w';
        this.activePiece = null;
        this.gameMode = mode;
        this.gameOver = false;
    }

    /**
     * Checks if the current player's king is in check and executes the callback if true.
     * @param {Function} callback - The callback function to execute if the king is in check.
     */
    onCheck(callback) {
        if (this.game.isKingInCheck(this.turn)) {
            let king = this.game.findKing(this.turn);
            callback({ x: king.x, y: king.y });
        }
    }

    /**
     * Checks if the currently active piece is the king at the specified position.
     * @param {Object} kingPos - The position of the king.
     * @param {number} kingPos.x - The row index of the king.
     * @param {number} kingPos.y - The column index of the king.
     * @returns {boolean} True if the active piece is the king at the specified position, otherwise false.
     */
    isKingActive(kingPos) {
        return this.activePiece && this.activePiece.x === kingPos.x && this.activePiece.y === kingPos.y;
    }

    /**
     * Handles moving a piece to a new position and updates the game state.
     * @param {Object} piecePos - The current position of the piece.
     * @param {number} piecePos.x - The row index of the piece.
     * @param {number} piecePos.y - The column index of the piece.
     * @param {Object} move - The target position for the move.
     * @param {number} move.x - The row index of the target position.
     * @param {number} move.y - The column index of the target position.
     */
    handleMove(piecePos, move) {
        if (this.gameOver) return; // Prevent moves if the game is over

        let piece = this.game.board[piecePos.x][piecePos.y];
        this.game.move(piece, move);
        this.turn = this.turn === 'w' ? 'b' : 'w';

        if (this.gameMode === 'ai') {

            setTimeout(() => {
                let {piece, move} = this.game.generateAIMove(this.game.board, 3, false); 
                this.game.move(piece, move);
                this.turn = this.turn === 'w'? 'b' : 'w';
            }, 1000)

        }
    }

    /**
     * Handles the selection of a piece and executes the callback with the piece's legal moves.
     * @param {Object} piecePos - The position of the selected piece.
     * @param {number} piecePos.x - The row index of the piece.
     * @param {number} piecePos.y - The column index of the piece.
     * @param {Function} callback - The callback function to execute with the piece's legal moves.
     */
    onPieceSelected(piecePos, callback) {
        if (this.gameOver || (this.gameMode === 'ai' && this.turn === "b")) return; // Prevent selection if the game is over or if it's the AI's turn

        let piece = this.game.board[piecePos.x][piecePos.y];
        if (piece !== null && piece.color === this.turn) {
            callback(this.game.getLegalMoves(piece));
        }
    }

    /**
     * Checks if the game is in a stalemate condition and executes the callback if true.
     * @param {Function} callback - The callback function to execute if the game is in stalemate.
     */
    onStalemate(callback) {
        if (this.game.isStalemate(this.turn)) {
            this.gameOver = true;
            callback();
        }
    }

    /**
     * Checks if the game is in a checkmate condition and executes the callback if true.
     * @param {Function} callback - The callback function to execute if the game is in checkmate.
     */
    onCheckmate(callback) {
        if (this.game.isCheckmated(this.turn)) {
            this.gameOver = true;
            callback(this.turn === 'w' ? 'Black' : 'White');
        }
    }
}



export default GameController;
