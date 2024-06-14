import Button from "./button.js"

class MainMenuUI {
    constructor(p, stateManager) {
        this.p = p;
        
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
                stateManager.setState("play", {gamemode: 'normal'});
            }
        });

        this.uiComponents = [this.playBtn];

    }

    display() {
        this.p.background(255);
        this.p.fill("rgb(118, 150, 86)");
        this.p.textAlign(this.p.CENTER, this.p.CENTER);
        this.p.textSize(this.p.width / 15);
        this.p.text("Chess", this.p.width / 2, this.p.height / 5);
        this.uiComponents.forEach((component => component.display()));
    }

    update() {
        this.uiComponents.forEach((component => component.update()));
    }

}

export default MainMenuUI;