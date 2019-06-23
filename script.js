
//! Setup function fires automatically
function setup() {

    var socket = io();

    var side = 30;

    var matrix = [];

    /* Images for Heroes */

    let ground = loadImage('img/ground.jpg');

    let grass_spring = loadImage('img/grass_spring.jpg'); 
    let grass_summer = loadImage('img/grass_summer.jpg'); 
    let grass_autumn = loadImage('img/grass_autumn.jpg');
    let grass_winter = loadImage('img/grass_winter.jpg');

    let grassEater = loadImage('img/_cow.jpg');
    let predator = loadImage('img/_rhino.jpg');
    let marsh = loadImage('img/marsh.jpg');
    let hunter = loadImage('img/hunter.png');
    let victim = loadImage('img/victim_.jpg');

    /* End Images */

    //! Getting DOM objects (HTML elements)
    let grassCountElement = document.getElementById('grassCount');
    let grassEaterCountElement = document.getElementById('grassEaterCount');
    let PredatorCountElement = document.getElementById('PredatorCount');
    let MarshCountElement = document.getElementById('MarshCount');
    let HunterCountElement = document.getElementById('HunterCount');

    //! adding socket listener on "data" <-- name, after that fire 'drawCreatures' function 

    socket.on("data", drawCreatures);


    // click

    function spanel(){
        document.body.style.background = "#f3f3f3 url('img/back_summer.jpg') no-repeat right top";
    }


    // end - click

    function drawCreatures(data) {
        //! after getting data pass it to matrix variable
        matrix = data.matrix;
        eghanak = data.weather;
        console.log(eghanak);

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
                    if(eghanak == "summer")
                    {
                        image(grass_summer, j * side, i * side, side, side);
                        // image(grass_autumn, j * side, i * side, side, side);

                    }
                    else if(eghanak == "autumn")
                    {
                        image(grass_autumn, j * side, i * side, side, side);
                    }
                    else if(eghanak == "winter"){
                        image(grass_winter, j * side, i * side, side, side);
                    }
                    else  
                    {
                        image(grass_spring, j * side, i * side, side, side);
                    }
                    // image(grass, j * side, i * side, side, side);
                } else if (matrix[i][j] == 2) {
                    image(grassEater, j * side, i * side, side, side);
                } else if (matrix[i][j] == 0) {
                    image(ground, j * side, i * side, side, side);
                } else if (matrix[i][j] == 3) {
                    image(predator, j * side, i * side, side, side);
                } else if (matrix[i][j] == 4) {
                    image(marsh, j * side, i * side, side, side);
                } else if (matrix[i][j] == 5) {
                    image(hunter, j * side, i * side, side, side);
                }else if (matrix[i][j] == 6) {
                    image(victim, j * side, i * side, side, side);
                }
                // rect(j * side, i * side, side, side);
            }
        }
    }
}