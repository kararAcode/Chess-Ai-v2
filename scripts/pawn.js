class Pawn extends Piece {
    constructor(x, y, color, chessboard) {
        super("pawn", x, y, color, chessboard);
        this.firstTurn = true;
        this.dir = this.color == "b" ? 1 : -1
    
    }

    getPossibleMoves() {
        let moves = [];

        let forwardOne = this.x + this.dir;
        let forwardTwo = this.x + this.dir*2;


        if (this.chessboard.board[forwardOne][this.y] == null && !this.isOutside(forwardOne, this.y)) {
            moves.push([forwardOne, this.y])
        }   

        if (this.chessboard.board[forwardTwo][this.y] == null && this.firstTurn && !this.isOutside(forwardTwo, this.y)){
            moves.push([forwardTwo, this.y])
        }   

        if (this.isValidTarget(forwardOne, this.y-1) && !this.isOutside(forwardOne, this.y-1)) {
            moves.push([forwardOne, this.y-1])
        }   

        if (this.isValidTarget(forwardOne, this.y+1) && !this.isOutside(forwardOne, this.y+1)) {
            moves.push([forwardOne, this.y+1])
        }   

        this.firstTurn = false;

        return moves;
    }

    
      

} 