import Button from "./button.js";
import StateManager from "./stateManager.js";
/**
 * Handles the main menu UI for a chess game using p5.js.
 * Displays a button to start the game.
 */
class MainMenuUI {
    /**
     * Constructs a new MainMenuUI instance.
     * @param {p5} p - The p5 instance used for drawing.
     * @param {StateManager} stateManager - The state manager to handle game states.
     */
    constructor(p, stateManager) {
        this.p = p;
        this.stateManager = stateManager;

        this.playBtn = new Button({
            x: this.p.width / 2 - this.p.width / 8,
            y: this.p.height / 2 - this.p.height / 20,
            width: this.p.width / 4,
            height: this.p.height / 10,
            text: "Play",
            textColor: "white",
            bgColor: "rgb(118, 150, 86)",
            p: this.p,
            callback: () => {
                stateManager.setState("play", { gamemode: 'normal' });
            }
        });

        this.uiComponents = [this.playBtn];
    }

    /**
     * Displays the main menu screen.
     * Renders the title and the play button.
     */
    display() {
        this.p.background(255);
        this.p.fill("rgb(118, 150, 86)");
        this.p.textAlign(this.p.CENTER, this.p.CENTER);
        this.p.textSize(this.p.width / 15);
        this.p.text("Chess", this.p.width / 2, this.p.height / 5);
        this.uiComponents.forEach(component => component.display());
    }

    /**
     * Updates the UI components.
     * Checks for interactions with the play button.
     */
    update() {
        this.uiComponents.forEach(component => component.update());
    }
}

export default MainMenuUI;
