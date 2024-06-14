class Button {
    constructor({x, y, width, height, text, textColor, bgColor, p, callback=()=>{}}) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.text = text;
        this.textColor = textColor;
        this.bgColor = bgColor;
        this.p = p;
        this.callback = callback;
    }   

    display() {
        this.p.fill(this.bgColor);
        this.p.rect(this.x, this.y, this.width, this.height);
        this.p.fill(this.textColor);
        this.p.textAlign(this.p.CENTER, this.p.CENTER);
        this.p.text(this.text, this.x + this.width / 2, this.y + this.height / 2);
    }

    update() {

        if (this.p.mouseX > this.x && this.p.mouseX < this.x + this.width && this.p.mouseY > this.y && this.p.mouseY < this.y + this.height && this.p.mouseIsPressed) {
            this.callback();
        }
    }
}

export default Button;