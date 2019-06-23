var Base = require("./Base");
var random = require("./random.js");



module.exports = class Predator extends Base{
    constructor(x, y) {
        super(x, y);
        this.index = 3;
        this.energy = 5;
    }
    getNewCoordinates() {
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

    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }

    move() {
        let newCell0 = this.chooseCell(0);
        let newCell1 = this.chooseCell(1);

        var newCell = random(newCell0.concat(newCell1));
        if(newCell){
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
    eat() {

        var newCell = random(this.chooseCell(2));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;

            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
            this.y = newY;
            this.x = newX;
            this.energy += 2;
        }
    }
    mul() {

        var newCell = random(this.chooseCell(0));

        if (this.energy >= 6 && newCell) {
            PredatorHashiv++;
            var newPredator = new Predator(newCell[0], newCell[1], this.index);
            PredatorArr.push(newPredator);
            matrix[newCell[1]][newCell[0]] = 3;
            this.energy = 5;
        }
    }
    die() {

        if (this.energy == 0) {
            matrix[this.y][this.x] = 0;
            for (var i in PredatorArr) {
                if (this.x == PredatorArr[i].x && this.y == PredatorArr[i].y) {
                    PredatorArr.splice(i, 1);
                }
            }
        }
    }


}