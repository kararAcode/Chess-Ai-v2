class Piece {
    constructor(name, x, y, color, chessboard) {
        this.name = name;
        this.color = color;
        // this.img = loadImage(`../asssets/${this.color}_${this.name}_2x_ns.png`);
        this.x = x;
        this.y = y;
        this.chessboard = chessboard
    }

    display() {
        // image(this.img, this.cellWidth*j + width/2 - this.cellWidth*4, this.cellHeight * i,);
    }

    isValidTarget(x, y) {
        if (board[x][y] == null) {
            return false;
        }

        let oppositeColor = this.color === "w" ? "b" : "w"

        return this.chessboard.board[x][y].color === oppositeColor;
    }

    isOutside(x, y) {
        return !(x >= 0 && x < 8 &&  y >= 0 && y < 8) 
    }

} 