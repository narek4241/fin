var Base = require("./Base");
var random = require("./random.js");



module.exports = class Hunter extends Base{
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 15;
        this.directions = [
            [this.x - 2, this.y - 2],
            [this.x - 1, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 1, this.y - 2],
            [this.x + 2, this.y - 2],

            [this.x - 2, this.y - 1],
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x + 2, this.y - 1],

            [this.x - 2, this.y],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x + 2, this.y],

            [this.x - 2, this.y + 1],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],

            [this.x - 2, this.y + 2],
            [this.x - 1, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 1, this.y + 2],
            [this.x + 2, this.y + 2],
        ];
    }
    
    move() {
        let newCell0 = this.chooseCell(0);
        let newCell1 = this.chooseCell(1);

        if(newCell){
            var newCell = random(newCell0.concat(newCell1));

            var newX = newCell[0];
            var newY = newCell[1];

            if (matrix[newY][newX] == 1) {
                matrix[this.y][this.x] = 1;
                matrix[newY][newX] = this.index;
            }
            else if (matrix[newY][newX] == 0) {
                matrix[this.y][this.x] = 0;
                matrix[newY][newX] = this.index;
            }

            this.y = newY;
            this.x = newX;
            this.energy--;
        

        matrix[this.y][this.x] = 1;
        matrix[newY][newX] = this.index;

        this.y = newY;
        this.x = newX;
        this.energy--;
        }

    }
    shoot() {
        var newCell = random(this.chooseCell(3));


        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = this.index;
            matrix[newY][newX] = 6;

            for (var i in PredatorArr) {
                if (newX == PredatorArr[i].x && newY == PredatorArr[i].y) {
                    PredatorArr.splice(i, 1);
                    break;
                }
            }
            this.energy += 2;
        }
    }
    die() {

        if (this.energy == 0) {
            matrix[this.y][this.x] = 0;
            for (var i in HunterArr) {
                if (this.x == HunterArr[i].x && this.y == HunterArr[i].y) {
                    HunterArr.splice(i, 1);
                }
            }
        }
    }
}