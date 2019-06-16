var Base = require("./Base");
var random = require("./random");


module.exports = class Grass extends Base {
    constructor(x, y) {
        super(x, y);
        this.index = 1;
        this.multiply = 0;
        this.treatment = 0;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    mul() {
        this.multiply++;

        let newCell0 = this.chooseCell(0);
        let newCell6 = this.chooseCell(6);

        var newCell = random(newCell0.concat(newCell6));

        if (this.multiply >= 2 && newCell) {
            var newGrass = new Grass(newCell[0], newCell[1], this.index);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
            grassHashiv++;
            this.multiply = 0;
        }
    }

    treat() {
        this.treatment++;
        var newCell = random(this.chooseCell(4));

        if (newCell && this.treatment >= 20) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = this.index;
            matrix[newY][newX] = this.index;

            for (var i in MarshArr) {
                if (newX == MarshArr[i].x && newY == MarshArr[i].y) {
                    MarshArr.splice(i, 1);
                    break;
                }
            }
            this.y = newY;
            this.x = newX;
        }
    }
}



