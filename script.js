class entity {
    constructor() {
        this.x = 0
        this.y = 0
        this.shape = null
        this.x_vel = 0;
        this.y_vel = 0;
    }
}

class coin {
    constructor() {
        this.x = 0
        this.y = 0
        this.shape = null
        this.value = 10
    }
}
var player = new entity()
var coinsarray = new Array()

var stage = null;
var score = 0

var scoredisplay = new createjs.Text("Score: 0", "10px Arial", "#000000");

function init() {
    stage = new createjs.Stage("display");
    player.x = 0
    player.y = 0
    player.shape = new createjs.Shape()
    player.shape.graphics.beginFill("red").drawRect(player.x, player.y, 10, 10)
    stage.addChild(player.shape)
    createjs.Ticker.on("tick", tick);
    initcoins()
    stage.addChild(scoredisplay)
}

function tick() {
    scoredisplay.text = 'Score: ' + score
    player.x = player.x + player.x_vel
    player.y = player.y + player.y_vel
    player.shape.x = player.x
    player.shape.y = player.y
    for (let i = 0; i < coinsarray.length; i++) {
        var currentcoin = coinsarray[i]
        if (currentcoin.x +3 >= player.x && currentcoin.x -3 <= player.x + 10 && currentcoin.y +3>= player.y && currentcoin.y -3 <= player.y + 10) {
            coinsarray.splice(i, 1)
            score = score+currentcoin.value
            stage.removeChild(currentcoin.shape)
        }
    }
    stage.update();
}

document.addEventListener("keydown", keydown);
document.addEventListener("keyup", keyup);

function keydown(event) {
    if (event.key) {
        if (event.key == 'w') {
            player.y_vel = -5

        }
        if (event.key == 'a') {
            player.x_vel = -5


        }
        if (event.key == 's') {
            player.y_vel = 5

        }
        if (event.key == 'd') {
            player.x_vel = 5
        }
    }
}

function keyup(event) {
    if (event.key) {
        if (event.key == 'w' || event.key == "s") {
            player.y_vel = 0
        }
        if (event.key == 'd' || event.key == "a") {
            player.x_vel = 0
        }
    }
}

function initcoins() {
    for (let i = 0; i < 10; i++) {
        var newcoin = new coin()
        var rand_x = Math.random() * stage.canvas.width
        var rand_y = Math.random() * stage.canvas.height
        newcoin.x = rand_x
        newcoin.y = rand_y
        newcoin.shape = new createjs.Shape()
        newcoin.shape.graphics.beginFill("gold").drawCircle(newcoin.x, newcoin.y, 3)
        stage.addChild(newcoin.shape)
        coinsarray.push(newcoin)
    }
}
