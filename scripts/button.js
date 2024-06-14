/**
 * Represents a clickable button in a p5.js sketch.
 * The button can display text and perform a callback action when clicked.
 */
class Button {
    /**
     * Constructs a new Button instance.
     * @param {Object} config The configuration object for the button.
     * @param {number} config.x The x-coordinate of the button's top-left corner.
     * @param {number} config.y The y-coordinate of the button's top-left corner.
     * @param {number} config.width The width of the button.
     * @param {number} config.height The height of the button.
     * @param {string} config.text The text to display on the button.
     * @param {string} config.textColor The color of the text.
     * @param {string} config.bgColor The background color of the button.
     * @param {p5} config.p The p5.js instance used for drawing.
     * @param {Function} [config.callback=()=>{}] The callback function to execute when the button is clicked.
     */
    constructor({ x, y, width, height, text, textColor, bgColor, p, callback = () => {} }) {
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

    /**
     * Displays the button on the canvas.
     */
    display() {
        this.p.fill(this.bgColor);
        this.p.rect(this.x, this.y, this.width, this.height);
        this.p.fill(this.textColor);
        this.p.textAlign(this.p.CENTER, this.p.CENTER);
        this.p.text(this.text, this.x + this.width / 2, this.y + this.height / 2);
    }

    /**
     * Updates the button's state and checks for mouse interactions.
     * If the button is clicked, it executes the callback function.
     */
    update() {
        if (this.p.mouseX > this.x && this.p.mouseX < this.x + this.width && this.p.mouseY > this.y && this.p.mouseY < this.y + this.height && this.p.mouseIsPressed) {
            this.callback();
        }
    }
}

export default Button;
