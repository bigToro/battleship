const express = require('express'); //Import the express dependency
const app = express();              //Instantiate an express app, the main work horse of this server
const port = 5000;                  //Save the port number where your server will be listening
//Idiomatic expression in express to route and respond to a client request
app.get('/', (req, res) => {        //get requests to the root ("/") will route here
    res.sendFile('index.html', {root: __dirname});      //server responds by sending the index.html file to the client's browser
                                                        //the .sendFile method needs the absolute path to the file, see: https://expressjs.com/en/4x/api.html#res.sendFile 
});

app.listen(port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Running on port ${port}`); 
});

var board = [];
var typeOfShip = ""

var destructorCounter = 2
var submarineCounter = 3
var cruiserCounter = 3
var battleshipCounter = 4
var carrierCounter = 5

var cpuDestructorCounter = 2
var cpuSubmarineCounter = 3
var cpuCruiserCounter = 3
var cpuBattleshipCounter = 4
var cpuCarrierCounter = 5

var destructor = {
    size:2,
    name:"destructor",
    horizontal:true,
}
var submarine = {
    size:3,
    name:"submarine",
    horizontal:true,
}
var cruizer = {
    size:3,
    name:"cruizer",
    horizontal:true,
}
var battleship = {
    size:4,
    name:"battleship",
    horizontal:true,
}
var carrier = {
    size:5,
    name:"carrier",
    horizontal:true,
}


function createBoard() {
    for(var i=0; i<5; i++) {
        board[i] = [];
        for(var j=0; j<5; j++) {
            board[i][j] = null;
        }
    }
}

function placeShip (x,y,ship) {
    if(!board[x][y] || !board[x+1][y] || !board[x+2][y]){
        for (let i = 0; i < ship.size; i++) {
            board[x][y+i]=ship
        }
        //console.log(board);
    }
}

function shoot (x,y) {
    console.log(destructorCounter);
    if(board[x][y]){
        obj=board[x][y]
        typeOfShip = obj.name
        board[x][y]=null
        console.log(board);
    }else{
        //cambiar de turno
    }
}

function reduceShipLife(typeOfShip){
    if (typeOfShip ==='destructor') destructorCounter--
    if (typeOfShip ==='submarine') submarineCounter--
    if (typeOfShip ==='cruiser') cruiserCounter--
    if (typeOfShip ==='battleship') battleshipCounter--
    if (typeOfShip ==='carrier') carrierCounter--
}

function checkForWins() {
    if ((destructorCounter + submarineCounter + cruiserCounter + battleshipCounter + carrierCounter) === 0) {
      console.log("player 1 wins");
    }
    if ((cpuDestructorCounter + cpuSubmarineCounter + cpuCruiserCounter + cpuBattleshipCounter + cpuCarrierCounter) === 0) {
        console.log("player 1 wins");
    }
  }

createBoard();
placeShip(2,2,destructor);
shoot(2,2);
reduceShipLife(typeOfShip);
shoot(2,3);
reduceShipLife(typeOfShip);
checkForWins();
