import { readFileSync } from "fs";
import path from "path";

export default class {

    public grid!: Block[][]
    public height: number;
    public width: number;

    constructor() {
        const raw = readFileSync(path.resolve(
            __dirname,
            '../res/map.txt'
        ), 'utf8');

        this.grid = raw.split('\n')
            .map(l => l
                .split('')
                .map(c => ({
                    ' ': Block.Air,
                    '#': Block.Dirt,
                    'L': Block.Leaf,
                    'W': Block.Wood,
                })[c]!)
            );

        this.height = this.grid.length;
        this.width = this.grid[0].length;
    }

}

export enum Block {
    Air,
    Dirt,
    Wood,
    Leaf
}