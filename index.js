"use strict";
const express = require('express');
const app = express();
const port = 5000;
const readline = require('node:readline/promises');
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname });
});

app.listen(port, () => {});

var board1 = [];
var board2 = [];
var winner = false

var destructorCounter, cpuDestructorCounter = 2
var submarineCounter, cpuSubmarineCounter, cruiserCounter, cpuCruiserCounter = 3
var battleshipCounter, cpuBattleshipCounter = 4
var carrierCounter, cpuCarrierCounter = 5

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
        name: "cruiser",
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
    let result = false
    for (let index = 0; index < ship.size; index++) {
        if (board[x][y + index].length == [].length) {
            result = true
        } else {
            result = false
        }
    }
    return result
}

async function placeShip(ship, board) {
    var rl = readline.createInterface(process.stdin, process.stdout);

    let positionX = await rl.question(`Position in X for: , ${ship.name}: `, (posx) => {
        rl.close();
    });
    let positionY = await rl.question(`Position in Y for: , ${ship.name}: `, (posy) => {
        rl.close();
    });

    for (let i = 0; i < ship.size; i++) {
        board[parseInt(positionX)][parseInt(positionY) + i] = ship
    }

    //add this conditional in order to not place ships on the same spot
    /*     if (isEmptyHorizontalSpace(parseInt(positionX), parseInt(positionY), ship, board)) {
            for (let i = 0; i < ship.size; i++) {
                board[parseInt(positionX)][parseInt(positionY) + i] = ship
            }
        } else {
            console.log("no room");
        } */
    rl.removeAllListeners();
}

function getRandomNumberForCpuShip(ship, board) {
    let randomX = Math.floor(Math.random() * 10);
    let randomY = Math.floor(Math.random() * (10 - ship.size));
    if (isEmptyHorizontalSpace(randomX, randomY, ship, board) == true) {
        return [randomX, randomY]
    } else {
        return false
    }
}

async function placeCpuShip(ship, board) {
    let positions = getRandomNumberForCpuShip(ship, board);
    while (positions == false) {
        positions = getRandomNumberForCpuShip(ship, board);
    }
    for (let i = 0; i < ship.size; i++) {
        board[positions[0]][positions[1] + i] = ship;
    }
}

async function shoot(board, rl) {
    let shootX = await rl.question(`Where do you want to shoot for Position in X: `, (posx) => {
        rl.close();
    });
    let shootY = await rl.question(`Where do you want to shoot for Position in Y: `, (posy) => {
        rl.close();
    });
    if (board[parseInt(shootX)][parseInt(shootY)].length != [].length && board[parseInt(shootX)][parseInt(shootY)] !== "X") {
        let ships = board[parseInt(shootX)][parseInt(shootY)]
        let typeOfShip = ships.name
        await reduceShipLife(typeOfShip);
        board[parseInt(shootX)][parseInt(shootY)] = "X"
    } else {
        board[parseInt(shootX)][parseInt(shootY)] = "O"
    }
}

async function cpuShoot(playerBoard, board) {
    var randomPosX = Math.floor(Math.random() * 10)
    var randomPosY = Math.floor(Math.random() * 10)
    if (playerBoard[randomPosX][randomPosY].length != [].length && playerBoard[randomPosX][randomPosY] !== "X") {
        let ship = playerBoard[randomPosX][randomPosY]
        let typeOfShip = ship.name
        await reducePlayerShipLife(typeOfShip);
        playerBoard[randomPosX][randomPosY] = "X"
        console.clear()
        console.table(playerBoard)
        console.table(board);
    } else {
        playerBoard[randomPosX][randomPosY] = "O"
    }
}

async function reduceShipLife(typeOfShip) {
    if (typeOfShip === 'destructor') cpuDestructorCounter--
    if (typeOfShip === 'submarine') cpuSubmarineCounter--
    if (typeOfShip === 'cruiser') cpuCruiserCounter--
    if (typeOfShip === 'battleship') cpuBattleshipCounter--
    if (typeOfShip === 'carrier') cpuCarrierCounter--
}

async function reducePlayerShipLife(typeOfShip) {
    if (typeOfShip === 'destructor') destructorCounter--
    if (typeOfShip === 'submarine') submarineCounter--
    if (typeOfShip === 'cruiser') cruiserCounter--
    if (typeOfShip === 'battleship') battleshipCounter--
    if (typeOfShip === 'carrier') carrierCounter--
}

async function checkForWins() {
    if ((destructorCounter + submarineCounter + cruiserCounter + battleshipCounter + carrierCounter) === 0) {
        winner = true
        console.clear()
        console.log("player 1 wins");
        process.exit(0);
    }

    if ((cpuDestructorCounter + cpuSubmarineCounter + cpuCruiserCounter + cpuBattleshipCounter + cpuCarrierCounter) === 0) {
        winner = true
        console.clear()
        console.log("Cpu wins");
        process.exit(0);
    }
}

async function populateMatrix(board) {
    for (let index = 0; index < shipArray.length; index++) {
        await placeShip(shipArray[index], board);
    }
}
async function populateCpuMatrix(board) {
    for (let index = 0; index < shipArray.length; index++) {
        await placeCpuShip(shipArray[index], board);
    }
}

async function playGame(board2, board1) {
    var rl = readline.createInterface(process.stdin, process.stdout);
    while (winner != true) {
        await shoot(board2, rl);
        rl.removeAllListeners();
        await cpuShoot(board1, board2);
        checkForWins();
    }
}

async function execute() {
    board1 = createBoard();
    board2 = createBoard();
    console.table(board1);

    await populateCpuMatrix(board2)
    //await populateMatrix(board1);

    console.clear()
    console.table(board1);
    console.table(board2);

    //await playGame(board2, board1);
}
execute()