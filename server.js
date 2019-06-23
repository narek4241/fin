
//! Requiring modules  --  START
var Grass = require("./modules/Grass.js");
var GrassEater = require("./modules/GrassEater.js");
var Predator = require("./modules/Predator.js");
var Marsh = require("./modules/Marsh.js");
var Hunter = require("./modules/Hunter.js");

let random = require('./modules/random');
//! Requiring modules  --  END


//! Setting global arrays  --  START
grassArr = [];
grassEaterArr = [];
PredatorArr = [];
MarshArr = [];
HunterArr = [];

matrix = [];

grassHashiv = 0;
grassEaterHashiv = 0;
PredatorHashiv = 0;
MarshHashiv = 0;
HunterHashiv = 0;
//! Setting global arrays  -- END


// io.on('connection', function(socket){
//     socket.on("spanel", mah);
// });

function mah(){
    console.log(1);
}





//! Creating MATRIX -- START
function matrixGenerator(matrixSize, grass, grassEater, Predator, Marsh, Hunter) {
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = [];
        for (let o = 0; o < matrixSize; o++) {
            matrix[i][o] = 0;
        }
    }
    for (let i = 0; i < grass; i++) {
        let customX = Math.floor(random(matrixSize)); // 0-9
        let customY = Math.floor(random(matrixSize)); // 4
        matrix[customY][customX] = 1;
    }
    for (let i = 0; i < grassEater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 2;
    }
    for (let i = 0; i < Predator; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 3;
    }
    for (let i = 0; i < Marsh; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 4;
    }
    for (let i = 0; i < Hunter; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 5;
    }
}
matrixGenerator(20, 50, 5, 10, 5, 5);
//! Creating MATRIX -- END



//! SERVER STUFF  --  START
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);
console.log('Fin The Server is running on port 3000');
//! SERVER STUFF END  --  END



function creatingObjects() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                grassArr.push(grass);
                grassHashiv++;
            }
            else if (matrix[y][x] == 2) {
                var grassEater = new GrassEater(x, y);
                grassEaterArr.push(grassEater);
                grassEaterHashiv++;
            }
            else if (matrix[y][x] == 3) {
                var pr = new Predator(x, y);
                PredatorArr.push(pr);
                PredatorHashiv++;
            }
            else if (matrix[y][x] == 4) {
                var mr = new Marsh(x, y);
                MarshArr.push(mr);
                MarshHashiv++;
            }
            else if (matrix[y][x] == 5) {
                var hn = new Hunter(x, y);
                HunterArr.push(hn);
                HunterHashiv++;
            }
        }
    }
}
 
///////////////////////
//////////////////////

let season = 0;
weatheris = "winter";


function chweather(){
    season++;
    // console.log(season);

    if(season > 0 && season < 6){
        weatheris = "summer";
    }
    else if(season >= 6 && season < 12){
        weatheris = "autumn";
    }
    else if(season >= 12 && season < 16){
        weatheris = "winter";
    }
    else if(season >= 16 && season < 18){
        weatheris = "spring";
    }
    else{
        season = 0;
    }
}







creatingObjects();

function game() {
    chweather();

    if (grassArr[0] !== undefined) {
        for (var i in grassArr) {
            grassArr[i].mul();
        }
    }
    if (grassEaterArr[0] !== undefined) {
        for (var i in grassEaterArr) {
            grassEaterArr[i].move();
            grassEaterArr[i].eat();
            grassEaterArr[i].mul();
            grassEaterArr[i].die();
        }
    }
    if (PredatorArr[0] !== undefined) {
        for (var i in PredatorArr) {
            PredatorArr[i].move();
            PredatorArr[i].eat();
            PredatorArr[i].mul();
            PredatorArr[i].die();
        }
    }
    if (MarshArr[0] !== undefined) {
        for (var i in MarshArr) {
            MarshArr[i].mul();
        }
    }
    if (HunterArr[0] !== undefined) {
        for (var i in HunterArr) {
            HunterArr[i].move();
            HunterArr[i].shoot();
        }
    }

    //! Object to send
    let sendData = {
        matrix: matrix,
        grassCounter: grassHashiv,
        grassEaterCounter: grassEaterHashiv,
        PredatorCounter: PredatorHashiv,
        MarshCounter: MarshHashiv,
        HunterCounter: HunterHashiv,
        matrix: matrix,
        weather: weatheris
    }

    //! Send data over the socket to clients who listens "data"
    io.sockets.emit("data", sendData);
}



setInterval(game, 1000)