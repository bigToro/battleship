"use strict";
const express = require('express');
const app = express();
const port = 5000;
const readline = require('node:readline/promises');
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname });
});

app.listen(port, () => {
    //console.log(`Running on port ${port}`);
});

var board1 = [];
var board2 = [];
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

const shipArray = [
    {
        size: 2,
        name: "destructor",
        horizontal: true,
    },
    {
        size: 3,
        name: "submarine",
        horizontal: true,
    },
    {
        size: 3,
        name: "cruizer",
        horizontal: true,
    },
    {
        size: 4,
        name: "battleship",
        horizontal: true,
    },
    {
        size: 5,
        name: "carrier",
        horizontal: true,
    }
]


function createBoard() {
    var board = []
    for (var i = 0; i < 10; i++) {
        board[i] = [];
        for (var j = 0; j < 10; j++) {
            board[i][j] = [];
        }
    }
    return board
}

function isEmptyHorizontalSpace(x, y, ship, board) {
    for (let index = 0; index < ship.size; index++) {
        if ( board[x][y + index] === [Object]) {
            return false
        }
    }
    return true
}

async function placeShip(ship, board) {
    var rl = readline.createInterface(process.stdin, process.stdout);

    let positionX = await rl.question(`Position in X for: , ${ship.name}: `, (posx) => {
        rl.close();
    });
    let positionY = await rl.question(`Position in Y for: , ${ship.name}: `, (posy) => {
        rl.close();
    });

    if (isEmptyHorizontalSpace(parseInt(positionX), parseInt(positionY), ship, board)) {
        for (let i = 0; i < ship.size; i++) {
            board[parseInt(positionX)][parseInt(positionY) + i] = ship
        }
    }else{
        console.log("no room");
    }
}

function isCoordinateEmpty(x,y,board){
    console.log(board[x][y]);
    if(board[x][y].length === [].length){
        return true
    }else{
        return false
    }
}
//parece que no esta cerrando bien las interfaces de pregunta y se acumulan los listeners averiguar para cerrarlos y reduceshiplife no corre

async function shoot(board) {
    while (checkForWins()) {
        var rl = readline.createInterface(process.stdin, process.stdout);

        let shootX = await rl.question(`Where do you want to shoot for Position in X: `, (posx) => {
            rl.close();
        });
        let shootY = await rl.question(`Where do you want to shoot for Position in Y: `, (posy) => {
            rl.close();
        });
        if (board[parseInt(shootX)][parseInt(shootY)].length != [].length) {
            let ship = board[parseInt(shootX)][parseInt(shootY)]
            let typeOfShip = ship.name
            reduceShipLife(typeOfShip);
            board[parseInt(shootX)][parseInt(shootY)] = "X"
            console.clear()
            console.table(board);
        } else {
            board[parseInt(shootX)][parseInt(shootY)] = "O"
        }
    } 
    return 0;
}

function reduceShipLife(typeOfShip) {
    console.log(typeOfShip);
    if (typeOfShip === 'destructor') destructorCounter--
    if (typeOfShip === 'submarine') submarineCounter--
    if (typeOfShip === 'cruiser') cruiserCounter--
    if (typeOfShip === 'battleship') battleshipCounter--
    if (typeOfShip === 'carrier') carrierCounter--
}

async function checkForWins() {
    if ((destructorCounter + submarineCounter + cruiserCounter + battleshipCounter + carrierCounter) === 0) {
        console.log("player 1 wins");
        return false
    }
    if ((cpuDestructorCounter + cpuSubmarineCounter + cpuCruiserCounter + cpuBattleshipCounter + cpuCarrierCounter) === 0) {
        console.log("player 2 wins");
        return false
    }
    return true
}

var schema = {
    properties: {
        name: {
            pattern: /^[a-zA-Z\s\-]+$/,
            message: 'Name must be only letters, spaces, or dashes',
            required: true
        },
        password: {
            hidden: true
        }
    }
};

async function populateMatrix(board) {
    for (let index = 0; index < shipArray.length; index++) {
        await placeShip(shipArray[index], board);
    }
}

async function execute() {
    board1 = createBoard();
    console.table(board1);
    //await placeShip(shipArray[0],board1)
    //await placeShip(shipArray[0],board1)
    await populateMatrix(board1);
    console.clear()
    console.table(board1);
    //console.log(isCoordinateEmpty(0,0,board1)); 
    shoot(board1);
}
execute()


/* async function run() {
    let qwq = await getPosX()
    console.log(qwq);
    return qwq
}; */
//console.log(run());
//let xxx = getPosX1();
//console.log("dasdasd", xxx);
//let xxx1 = getPosX()

//console.table(board1)
//console.table(board1);
/*shoot(2, 2);
reduceShipLife(typeOfShip);
shoot(2, 3);
reduceShipLife(typeOfShip);
checkForWins(); */
