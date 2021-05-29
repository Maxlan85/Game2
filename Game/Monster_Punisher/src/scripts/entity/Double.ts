const box = 64;
const slow = new Image();
slow.src = "../source/img/can.png";

export default class Double {

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
            this.context.drawImage(slow, this.x, this.y);
        }
    }

    newDouble(): void {
        this.dead = false;
        this.x = Math.floor(Math.random() * 13) * box;
        this.y = Math.floor(Math.random() * 13) * box;
        this.draw();
    }

    public removeSlow(): void {
        this.context.clearRect(this.x, this.y, box, box);
    }

    getMurdered(): boolean {
        return this.dead;
    }

    getX(): number {
        return this.x;
    }

    getY(): number {
        return this.y;
    }

    setMurdered(died: boolean): void {
        this.dead = died;
    }
}
