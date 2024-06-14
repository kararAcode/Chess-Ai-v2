import Button from "./button.js";
import StateManager from "./stateManager.js";

/**
 * Handles the game over screen in a chess game using p5.js.
 * Displays a game over message and a button to return to the main menu.
 */
class GameOverUI {
    /**
     * Constructs a new GameOverUI instance.
     * @param {p5} p - The p5 instance used for drawing.
     * @param {StateManager} stateManager - The state manager to handle game states.
     */
    constructor(p, stateManager) {
        this.p = p;
        this.stateManager = stateManager;
        this.gameOverText = "";

        this.backToMenuBtn = new Button({
            x: this.p.width / 2 - this.p.width / 8,
            y: this.p.height / 2,
            width: this.p.width / 4,
            height: this.p.height / 10,
            text: "Menu",
            textColor: "white",
            bgColor: "rgb(118, 150, 86)",
            p: this.p,
            callback: () => {
                stateManager.setState("mainmenu");
            }
        });

        this.uiComponents = [this.backToMenuBtn];

        // Subscribe to the 'gameover' state to update the game over text
        this.stateManager.on('gameover', ({ gameOverText }) => {
            this.gameOverText = gameOverText;
        });
    }

    /**
     * Displays the game over screen.
     * Renders the game over message and the button to return to the main menu.
     */
    display() {
        this.p.background(255);
        this.p.fill("rgb(118, 150, 86)");
        this.p.textAlign(this.p.CENTER, this.p.CENTER);
        this.p.textSize(this.p.width / 15);
        this.p.text(this.gameOverText, this.p.width / 2, this.p.height / 5);
        this.uiComponents.forEach(component => component.display());
    }

    /**
     * Updates the UI components.
     * Checks for interactions with the button to return to the main menu.
     */
    update() {
        this.uiComponents.forEach(component => component.update());
    }
}

export default GameOverUI;
