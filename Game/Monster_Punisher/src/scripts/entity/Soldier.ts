const soldierImg = new Image();
soldierImg.src = "../source/img/gun.png";

export default class Soldier {

    private context: CanvasRenderingContext2D;
    private maxX: number = 832;
    private maxY: number = 832;
    private box: number = 64;
    private x: number = 6 * this.box;
    private y: number = 10 * this.box;

    constructor(canvas: HTMLCanvasElement) {

        this.context = canvas.getContext('2d');
    }

    draw(): void {
        this.context.drawImage(soldierImg, this.x, this.y);
    }

    getX(): number {
        return this.x;
    }

    getY(): number {
        return this.y;
    }

    getMaxX(): number {
        return this.maxX;
    }

    getMaxY(): number {
        return this.maxY;
    }

    setX(x: number): void {
        this.x = x;
    }

    remove(): void {
        this.context.clearRect(this.x, this.y, this.box, this.box);
    }

    setY(y: number): void {
        this.y = y;
    }
}
