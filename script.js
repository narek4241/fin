
//! Setup function fires automatically
function setup() {

    var socket = io();

    var side = 30;

    var matrix = [];

    //! Getting DOM objects (HTML elements)
    let grassCountElement = document.getElementById('grassCount');
    let grassEaterCountElement = document.getElementById('grassEaterCount');
    let PredatorCountElement = document.getElementById('PredatorCount');
    let MarshCountElement = document.getElementById('MarshCount');
    let HunterCountElement = document.getElementById('HunterCount');

    //! adding socket listener on "data" <-- name, after that fire 'drawCreatures' function 

    socket.on("data", drawCreatures);

    function drawCreatures(data) {
        //! after getting data pass it to matrix variable
        matrix = data.matrix;
        grassCountElement.innerText = data.grassCounter;
        grassEaterCountElement.innerText = data.grassEaterCounter;
        PredatorCountElement.innerText = data.PredatorCounter;
        MarshCountElement.innerText = data.MarshCounter;
        HunterCountElement.innerText = data.HunterCounter;
        //! Every time it creates new Canvas woth new matrix size
        createCanvas(matrix[0].length * side, matrix.length * side)
        //! clearing background by setting it to new grey color
        background('#acacac');
        //! Draw grassCount and grassEaterCount to HTML (use DOM objects to update information, yes, and use .innerText <- function)

        //! Drawing and coloring RECTs
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] == 1) {
                    fill("green");
                } else if (matrix[i][j] == 2) {
                    fill("orange");
                } else if (matrix[i][j] == 0) {
                    fill('#acacac');
                } else if (matrix[i][j] == 3) {
                    fill('red');
                } else if (matrix[i][j] == 4) {
                    fill('aqua');
                } else if (matrix[i][j] == 5) {
                    fill('black');
                }else if (matrix[i][j] == 6) {
                    fill('blue');
                }
                rect(j * side, i * side, side, side);
            }
        }
    }
}