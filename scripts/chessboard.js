class Chessboard {
    constructor() {
        this.board = Array(8).fill(null).map(() => Array(8).fill(null));
        this.setupPieces();
        
        this.cellWidth = width/8;
        this.cellHeight = height/8;

    

        if (this.cellWidth > this.cellHeight) {
            this.cellWidth = this.cellHeight;
        }

        else {
            this.cellHeight = this.cellWidth;
        }   




    }


    setupPieces() {
        const mainForces = [Rook, Knight, Bishop, Queen, King, Bishop, Knight, Rook];


        //setup black pieces
        for (let i = 0; i < mainForces.length; i++) {
            this.board[0][i] = new mainForces[i](0, i, "b", this);
            this.board[1][i] = new Pawn(1, i, "b", this);

        }

        //setup white pieces
        for (let i = 0; i < mainForces.length; i++) {
            this.board[6][i] = new Pawn(6, i, "w", this);
            this.board[7][i] = new mainForces[i](7, i, "w", this);
        }


    }
    
    

    display() {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                fill((i+j) % 2 === 0 ? "rgb(238, 238, 210)": "rgb(118, 150, 86)")
                rect(this.cellWidth*j + width/2 - this.cellWidth*4, this.cellHeight * i, this.cellWidth, this.cellHeight) 
            }
        }
    }

    



}
