const baseImg = new Image();
baseImg.src = "../source/img/base.png";

const nightImg = new Image();
nightImg.src = "../source/img/Night.png";

export default class GameField {

    private context: CanvasRenderingContext2D;
    private x: number = 0;
    private y: number = 0;
    private img: HTMLImageElement;

    constructor(canvas: HTMLCanvasElement) {
        this.context = canvas.getContext('2d');
        this.img = nightImg;
    }

    draw(): void {

        this.context.drawImage(this.img, this.x, this.y);
        this.context.drawImage(baseImg, 384, 640);

    }
}
