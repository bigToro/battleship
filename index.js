"use strict";
const express = require('express');
const app = express();
const port = 5000;
const readline = require('node:readline/promises');
//const { stdin: input, stdout: output } = require('node:process');
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

var destructor = {
    size: 2,
    name: "destructor",
    horizontal: true,
}
var submarine = {
    size: 3,
    name: "submarine",
    horizontal: true,
}
var cruizer = {
    size: 3,
    name: "cruizer",
    horizontal: true,
}
var battleship = {
    size: 4,
    name: "battleship",
    horizontal: true,
}
var carrier = {
    size: 5,
    name: "carrier",
    horizontal: true,
}


function createBoard() {
    var board = []
    for (var i = 0; i < 10; i++) {
        board[i] = [];
        for (var j = 0; j < 10; j++) {
            board[i][j] = [j+1];
        }
    }
    return board
}
function createBoard2() {
    var board = []
    for (var i = 0; i < 10; i++) {
        board[i] = [[]];
    }
    return board
}

function isEmptyHorizontalSpace(x, y, ship, board) {
    for (let index = 0; index < ship.size; index++) {
        if (board[x + index][y] == null) {
            return false
        }
    }
    return true
}

async function placeShip(ship, board) {

    //const rl = readline.createInterface({ input, output });
    var rl = readline.createInterface(
        process.stdin, process.stdout);

    let posxx = await rl.question('eje x ', (posx) => {
        rl.close();
    });

    let posyy = await rl.question('eje y ', (posy) => {
        rl.close();
    });
    if (isEmptyHorizontalSpace(parseInt(posxx), parseInt(posyy), ship, board)) {
        for (let i = 0; i < ship.size; i++) {
            console.log(parseInt(posxx),"hola");
            console.log(parseInt(posyy),"hola");
            board[parseInt(posxx)][parseInt(posyy) + i] = ship.name
        }
    }
}

function shoot(x, y, board) {
    console.log(destructorCounter);
    if (!board[x][y] == []) {
        obj = board[x][y]
        typeOfShip = obj.name
        reduceShipLife(typeOfShip);
        board[x][y] = "X"
        console.log(board);
    } else {
        board[x][y] = "O"
    }
    //cambiar de turno y verificar si se gano
}

function reduceShipLife(typeOfShip) {
    if (typeOfShip === 'destructor') destructorCounter--
    if (typeOfShip === 'submarine') submarineCounter--
    if (typeOfShip === 'cruiser') cruiserCounter--
    if (typeOfShip === 'battleship') battleshipCounter--
    if (typeOfShip === 'carrier') carrierCounter--
}

async function checkForWins() {
    if ((destructorCounter + submarineCounter + cruiserCounter + battleshipCounter + carrierCounter) === 0) {
        console.log("player 1 wins");
    }
    if ((cpuDestructorCounter + cpuSubmarineCounter + cpuCruiserCounter + cpuBattleshipCounter + cpuCarrierCounter) === 0) {
        console.log("player 2 wins");
    }
    console.log("sqqsq");
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

function getPosX1() {
    var rl = readline.createInterface(
        process.stdin, process.stdout);

    rl.setPrompt(`What is your age? `);
    rl.prompt();
    let age
    rl.on('line', (age) => {
        console.log(`Age received by the user: ${age}`);
        rl.close();
    });
    return age
}

/* async function getPosX() {
    const rl = readline.createInterface({ input, output });
    try {
        const answer = await rl.question('What is your favorite food? ');
        return answer
    } catch (err) {
        console.error('Question rejected', err);
    }
}; */

async function getPosY() {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });
    let names = ""
    readline.question('choose position in x for your ship:', name => {
        names = name
        readline.close();

    });
    return names
}

async function execute() {
    board1 = createBoard();
    board2 = createBoard2();
    console.table(board1);
    await placeShip(destructor, board1);
    console.table(board1);
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
