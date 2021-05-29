import Monster from "./entity/Monster";
import Soldier from "./entity/Soldier";
import GameField from "./entity/GameField";
import Double from "./entity/Double";


export default class Game {

    private context: CanvasRenderingContext2D;
    private canvass: HTMLCanvasElement;
    private soldier: Soldier;
    private gameField: GameField;
    private slow: Double;
    private maxScore: number;
    private monsterMas: Monster[];
    private amountOfMonster: number;
    private monsterCount: number;
    private box: number;
    private roundTime: number;
    private scoreNeed: number;
    private finalScore: number;
    private interval: number;
    private timeOfTimer: number;

    constructor(canvas: HTMLCanvasElement) {

        this.context = canvas.getContext('2d');
        this.canvass = canvas;
        this.monsterMas = [];
        this.slow = new Double(canvas);
        this.soldier = new Soldier(canvas);
        this.gameField = new GameField(canvas);
        this.box = 64;
        this.interval = 1000;
        this.monsterCount = 4;
        this.amountOfMonster = 0;
        this.scoreNeed = this.monsterCount;
        this.timeOfTimer = 10;

        if (localStorage.getItem("key") != null) {
            this.maxScore = parseInt(localStorage.getItem("key"));
        } else {
            this.maxScore = 0;
        }
        this.roundTime = 10000;
        this.finalScore = 0;
        this.start();
        this.lose();

    }

    private countOfMonster(size: number): void {
        for (let i = 0; i < size; i++) {
            this.monsterMas[i] = new Monster(this.canvass);
            this.monsterMas[i].draw();
        }
    }

    public getInterval(): number {
        return this.interval
    }

    public setTimeOfTimer(time: number): void {
        this.timeOfTimer = time;
    }

    public getTimeOfTimer(): number {
        return this.timeOfTimer;
    }

    private restartGame(): void {
        this.gameField.draw();
        for (let i = 0; i < this.monsterCount; i++) {
            this.monsterMas[i].newMonster();
        }
        this.slow.newDouble();
        this.scoreNeed += this.monsterCount;
        this.soldier.draw();
        this.lose();
    }

    private scoreUpdateByKill(): void {
        for (let i = 0; i < this.monsterCount; i++) {
            if (!this.monsterMas[i].getCondition()) {
                if (this.monsterMas[i].getX() == this.soldier.getX() && this.monsterMas[i].getY() == this.soldier.getY()) {
                    this.monsterMas[i].removeMonster();
                    this.monsterMas[i].murdered(true);
                    if (this.slow.getMurdered()) {
                        this.finalScore += 2;
                    } else if (!this.slow.getMurdered()) {
                        this.finalScore++;
                    }
                    this.amountOfMonster++;
                    if (this.finalScore > this.maxScore) {
                        localStorage.setItem("key", this.finalScore.toString());
                    }
                    document.getElementById("score").innerHTML = this.finalScore.toString();
                    let audio = new Audio();
                    audio.src = '../source/sounds/Eaten.mp3';
                    audio.autoplay = true;
                }
            }
        }
    }

    private slowKill(): void {
        if (!this.slow.getMurdered()) {
            if (this.slow.getX() == this.soldier.getX() && this.slow.getY() == this.soldier.getY()) {
                this.slow.removeSlow();
                this.slow.setMurdered(true);
                let audio = new Audio();
                audio.src = '../source/sounds/Eaten.mp3';
                audio.autoplay = true;
            }
        }
    }


    private refresh(): void {
        this.gameField.draw();
        this.soldier.draw();
        this.slow.draw();
        for (let i = 0; i < this.monsterCount; i++) {
            this.monsterMas[i].draw();
        }
    };

    private attachKeyboard(): void {
        document.addEventListener('keydown', e => {
            this.checkKeyEndMove(e.code);
        });
    }

    private checkKeyEndMove(e: string): void {

        switch (e) {

            case "KeyW":
                if (this.soldier.getY() != 0) {
                    this.soldier.remove();
                    this.soldier.setY(this.soldier.getY() - this.box);
                    this.scoreUpdateByKill();
                    this.slowKill();
                    this.refresh();
                }
                break;

            case "KeyS":
                if (this.soldier.getY() != this.soldier.getMaxY() - this.box) {
                    this.soldier.remove();
                    this.soldier.setY(this.soldier.getY() + this.box);
                    this.scoreUpdateByKill();
                    this.slowKill();
                    this.refresh();
                }
                break;

            case "KeyA":
                if (this.soldier.getX() != 0) {
                    this.soldier.remove();
                    this.soldier.setX(this.soldier.getX() - this.box);
                    this.scoreUpdateByKill();
                    this.slowKill();
                    this.refresh();
                }
                break;

            case "KeyD":
                if (this.soldier.getX() != this.soldier.getMaxX() - this.box) {
                    this.soldier.remove();
                    this.soldier.setX(this.soldier.getX() + this.box);
                    this.scoreUpdateByKill();
                    this.slowKill();
                    this.refresh();
                }
                break;

        }

    }

    public start(): void {
        document.getElementById("score").innerHTML = this.amountOfMonster.toString();
        this.gameField.draw();
        this.soldier.draw();
        this.slow.draw();
        this.attachKeyboard();
        this.countOfMonster(this.monsterCount);
    }

    private lose(): void {

        setTimeout(() => {

            if (this.soldier.getX() == 6 * this.box && this.soldier.getY() == 10 * this.box && this.amountOfMonster == this.scoreNeed) {
                this.timeOfTimer = 10;
                this.interval = 1000;
                this.roundTime = 10000;
                this.restartGame();
            } else {
                alert("You lose!");
                alert("Ваш счет:" + this.finalScore + "\n" + "Ваш максимальный счет:" + this.maxScore);
                window.location.reload();
            }
        }, this.roundTime);

    }

}
