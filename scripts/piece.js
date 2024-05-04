class Piece {
    /**
     * Constructor for a Piece.
     * @param {string} name Name of the chess piece.
     * @param {number} x Initial x-coordinate on the chessboard.
     * @param {number} y Initial y-coordinate on the chessboard.
     * @param {string} color Color of the piece ('w' for white, 'b' for black).
     * @param {Chessboard} chessboard Reference to the chessboard holding this piece.
     */
    constructor(name, x, y, color, board) {
        this.name = name;
        this.color = color;
        // this.img = loadImage(`../asssets/${this.color}_${this.name}_2x_ns.png`);
        this.x = x;
        this.y = y;
        this.board = board;
    }

    /**
     * Displays the piece at its current position. Implementation should render the piece's image.
     */
    display() {
        // image(this.img, this.cellWidth*j + width/2 - this.cellWidth*4, this.cellHeight * i,);
    }

    /**
     * Checks if the piece at the specified coordinates is of the opposite color, 
     * indicating if it is capturable.
     * @param {number} x X-coordinate of the target cell.
     * @param {number} y Y-coordinate of the target cell.
     * @return {boolean} True if the target contains an opponent's piece that can be captured, otherwise false.
     */
    isValidTarget(x, y) {
        if (this.board[x][y] == null) {
            return false; // No piece to capture.
        }
        let oppositeColor = this.color === "w" ? "b" : "w";
        return this.board[x][y].color === oppositeColor;
    }

    /**
     * Checks if the coordinates are outside the bounds of the chessboard.
     * @param {number} x X-coordinate to check.
     * @param {number} y Y-coordinate to check.
     * @return {boolean} True if the position is outside the 8x8 board, otherwise false.
     */
    isOutside(x, y) {
        return !(x >= 0 && x < 8 && y >= 0 && y < 8);
    }

    clone(board){
        return new this.constructor(this.x, this.y, this.color, board);
    }


}

export default Piece;



