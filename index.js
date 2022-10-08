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

var destructor = {
    id:1,
    size:2,
    name:"destructor",
    horizontal:true,
    destroyed:false,

}
var val = 1
var matrix = Array(5).fill(Array(5).fill(null));

function placeShip (x,y,ship) {
    
    if(!matrix[x][y] || !matrix[x+1][y] || !matrix[x+2][y]){
        for (let i = 0; i < ship.size; i++) {
            matrix[x][y+i] = ship.name;
        }
        console.log(matrix);
    }
}

//console.log(destructor.name);
//console.log(x[1][2]);
placeShip(2,2,destructor);
//console.log(aa);