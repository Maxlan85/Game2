const box = 64;

let monsterImg = new Image();
monsterImg.src = "../source/img/monster.png";

export default class Monster {

    context: CanvasRenderingContext2D;
    private x: number;
    private y: number;
    private dead: boolean;

    constructor(canvas: HTMLCanvasElement) {
        this.context = canvas.getContext('2d');
        this.dead = false;
        this.x = Math.floor(Math.random() * 13) * box;
        this.y = Math.floor(Math.random() * 13) * box;
    }

    draw(): void {
        if (!this.dead) {
            this.context.drawImage(monsterImg, this.x, this.y);
        }
    }

    newMonster(): void {
        this.dead = false;
        this.x = Math.floor(Math.random() * 13) * box;
        this.y = Math.floor(Math.random() * 13) * box;
        this.draw();
    }

    murdered(died: boolean): void {
        this.dead = died;
    }

    getCondition(): boolean {
        return this.dead;
    }

    getX(): number {
        return this.x;
    }

    getY(): number {
        return this.y;
    }

    public removeMonster(): void {
        this.context.clearRect(this.x, this.y, box, box);
    }

}
