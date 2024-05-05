/**
 * ChessUI handles all user interface aspects for a chess game using p5.js. It manages drawing the chessboard,
 * pieces, and handling user interactions like mouse clicks.
 * 
 * @param {p5} p - The p5 instance, used for drawing.
 * @param {Object} images - An object containing preloaded p5 Image objects organized by color and type of chess pieces.
 * @param {ChessGame} game - The game logic handler which includes the current state of the chessboard.
 */
class ChessUI {
    constructor(p, images, game) {
        this.p = p;
        this.images = images;
        this.game = game;

        // Calculate cell dimensions to ensure the board fits in the canvas and cells are square.
        this.cellWidth = p.width / 8;
        this.cellHeight = p.height / 8;

        // Adjust cell dimensions to maintain aspect ratio as square.
        if (this.cellWidth > this.cellHeight) {
            this.cellWidth = this.cellHeight;
        } else {
            this.cellHeight = this.cellWidth;
        }
    }

    /**
     * Renders the chessboard on the canvas. It draws each cell with alternating colors to create a classic
     * chessboard appearance. The board is centered on the canvas.
     */
    displayBoard() {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                // Alternate colors for the chessboard squares
                this.p.fill((i + j) % 2 === 0 ? "rgb(238, 238, 210)" : "rgb(118, 150, 86)");
                // Draw each square of the chessboard
                this.p.rect(this.cellWidth * j + this.p.width / 2 - this.cellWidth * 4, this.cellHeight * i, this.cellWidth, this.cellHeight);
            }
        }
    }

    /**
     * Renders all chess pieces on the board based on their current positions in the game logic.
     * It calls displayPiece for each piece that is not null in the game board array.
     */
    displayPieces() {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (this.game.board[i][j] !== null) {
                    this.displayPiece(this.game.board[i][j]);
                }
            }
        }
    }

    /**
     * Draws a single chess piece on the board using its image, position, and the calculated cell dimensions.
     * 
     * @param {Piece} piece - The piece to be displayed
     */
    displayPiece(piece) {
        // Note: Adjust the argument order if necessary based on actual attribute names
        this.p.image(
            this.images[piece.color][piece.name], 
            this.cellWidth * piece.y + this.p.width / 2 - this.cellWidth * 4, 
            this.cellHeight * piece.x, 
            this.cellWidth, 
            this.cellHeight
        );
    }
}

export default ChessUI;
