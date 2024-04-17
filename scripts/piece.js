class Piece {
    constructor(name, x, y, color) {
        this.name = name;
        this.color = color;
        this.img = loadImage(`${this.color}_${this.name}_2x_ns.png`);
        this.x = x;
        this.y = y;
    }

    display() {
        image(this.img, this.x, this.y);
    }
}