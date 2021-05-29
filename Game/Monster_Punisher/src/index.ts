import Game from "./scripts/Game";
import './css/style.css';

const canvas: HTMLCanvasElement = document.getElementById('GameFieldID') as HTMLCanvasElement;
let isGame = false;

function ready() {
    if (!isGame) {
        const game: Game = new Game(canvas);
        isGame = true;
    }
}

let startGameButton = document.getElementById("StartButton").addEventListener("click", ready);
let game = new Game(canvas);
window.onload = function () {
    window.setInterval(function () {
        game.setTimeOfTimer(game.getTimeOfTimer() - 1);
        document.getElementById("time").innerHTML = game.getTimeOfTimer().toString(); //Эта функция для отображения таймера,не идеальна и из-за нее
                                                                                               // не получился некоторый функционал
    }, game.getInterval());
};


