import Map, { Block } from "./map";

export default class {

    private map: Map;
    public playerX: number
    public playerY: number;

    constructor() {
        this.map = new Map();
        this.playerX = Math.floor(this.map.width / 2);
        this.playerY = Math.floor(this.map.height / 2) - 1;
    }

    update() {
        if (this.map.grid[this.playerY + 1][this.playerX + 1] === Block.Air)
            this.playerY++;
    }

    draw(w: number, h: number) {
        let str = '';

        const hw = Math.floor(w / 2);
        const hh = Math.floor(h / 2);

        for (let y = this.playerY - hh; y < this.playerY + hh; y++) {
            for (let x = this.playerX - hw; x < this.playerX + hw; x++) {
                if (x === this.playerX && y === this.playerY) str += '👖'
                else if (x === this.playerX && y === this.playerY - 1) str += '😀'
                else str += [
                    '🟦',
                    '🟫',
                    '🪵',
                    '🥬',
                ][this.map.grid[y][x]]
            }
            str += '\n'
        }

        return str;
    }

}