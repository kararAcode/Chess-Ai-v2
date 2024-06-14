import Button from "./button.js";

class GameOverUI {
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

        this.stateManager.on('gameover', ({gameOverText}) => {
            this.gameOverText = gameOverText;
        })

    }

    display() {
        this.p.background(255);
        this.p.fill("rgb(118, 150, 86)");
        this.p.textAlign(this.p.CENTER, this.p.CENTER);
        this.p.textSize(this.p.width / 15);
        this.p.text(this.gameOverText, this.p.width / 2, this.p.height / 5);
        this.uiComponents.forEach((component => component.display()));

    }

    update() {
        this.uiComponents.forEach(component => component.update());
    }
}

export default GameOverUI;