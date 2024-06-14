
class GameController {
    
    constructor(game) {
        this.game = game;
        this.turn = 'w'; // 'w' for white, 'b' for black
        this.activePiece = null;
        this.gameMode; 
        this.gameOver = false;
    }



    
    initialize(mode) {
        this.game.setupPieces();
        this.turn = 'w'; // 'w' for white, 'b' for black
        this.activePiece = null;
        this.gameMode = mode;
        this.gameOver = false;
    }

    onCheck(callback) {
        if (this.game.isKingInCheck(this.turn)) {
            let king = this.game.findKing(this.turn);

            callback({x: king.x, y: king.y});
            

        }
    }

    isKingActive(kingPos) {
        return this.activePiece && this.activePiece.x === kingPos.x && this.activePiece.y === kingPos.y;
    }

    handleMove(piecePos, move) {
        let piece = this.game.board[piecePos.x][piecePos.y];
        this.game.move(piece, move);
        this.turn = this.turn === 'w'? 'b' : 'w';

    }

    onPieceSelected(piecePos, callback) {
        let piece = this.game.board[piecePos.x][piecePos.y];
        if (piece !== null && piece.color === this.turn) {
            callback(this.game.getLegalMoves(piece));
        }

    }

    onStalemate(callback) {
        if (this.game.isStalemate(this.turn)) {
            this,gameOver = true;
            callback();
        }
    }

    onCheckmate(callback) {
        if (this.game.isCheckmated(this.turn)) {
            this.gameOver= true;
            callback(this.turn === 'w'? 'Black' : 'White');
        }
    }
}

export default GameController;