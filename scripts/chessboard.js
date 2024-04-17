class Chessboard {
    constructor() {
        this.board = [];
        
        this.cellWidth = width/8;
        this.cellHeight = height/8;

    

        if (this.cellWidth > this.cellHeight) {
            this.cellWidth = this.cellHeight;
        }

        else {
            this.cellHeight = this.cellWidth;
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

    displayPieces() {
        
    }



    







}
