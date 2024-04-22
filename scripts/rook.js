class Rook extends Piece {
    
    constructor(x, y, color, chessboard) {
        super("rook", x, y, color, chessboard);
        this.dirArr = [[1, 0], [0, 1], [-1, 0], [0, -1]]
    }

    getPossibleMoves() {
        let moves = [];
        for (const dir of this.dirArr) {

            let n = 1
            while (n < 8) {
                let moveX = this.x + n * dir[0];
                let moveY = this.y + n * dir[1];

                

                if (this.isOutside(moveX, moveY)) break;

                if (this.chessboard.board[moveX][moveY] !== null) {
                    if (this.isValidTarget(moveX, moveY)) {
                        moves.push([moveX, moveY]);
                    }
                    break;

                }

                moves.push([moveX, moveY]);

                n++;
                

            }
        }

        return moves;
    }
}