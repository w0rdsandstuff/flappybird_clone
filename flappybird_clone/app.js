const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
var player = new Image();
player.src = 'images/ba_fly.gif'

var x = 0;
var y = 0;
var key, keyState = 0;

player.onload = function() {
    ctx.drawImage(player, x, y)

}
document.onkeydown = function(e) {
    keyState = "keydown"
    key = e.key;
}

document.onkeyup = function (e) {
    keyState = "keyup"
}

function chooseRandom(min,max) {
    return Math.random() * (max - min) + min;
}

var obstacles = []

function createObstacle() {
    obstacles.push({
        x: chooseRandom(500, 1500),
        y: chooseRandom(0, 300),
        width: 50,
        height: 100
    });
}

setInterval(createObstacle, 1000); // Creates a new obstacle every 1000 milliseconds


function handleCollision(obstacle) {

    const playerLeft = x;
    const playerRight = x + 85;
    const playerTop = y;
    const playerBottom = y + 75;

    const obstacleLeft = obstacle.x;
    const obstacleRight = obstacle.x + obstacle.width;
    const obstacleTop = obstacle.y;
    const obstacleBottom = obstacle.y + obstacle.height;

    if (playerBottom < obstacleTop || 
        playerTop > obstacleBottom || 
        playerRight < obstacleLeft ||
        playerLeft > obstacleRight
        ) {
            return false;
    } else {
    return true;
    }
    
}

var score = 0;

setInterval(function() {
    score += 1;
    document.getElementById("score").innerHTML = "Score: " + score;
}, 1); // Increase the score every 1 milliseconds

setInterval(function() {
    if (keyState === "keydown") {
    if (key === "w") {
        y -= 1;
    }    
    if (key === "a") {
        x -= 1;
    }
    if (key === "s") {
        y += 1;
    }
    if (key === "d") {
        x += 1;
    }
  }

  ctx.clearRect(0,0,2000,2000);
  ctx.drawImage(player, x, y);
  ctx.fillStyle = 'black';

  for(i=0; i < obstacles.length; i++) {
    const obstacle =  obstacles[i]
    obstacle.x -= 1;
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    if (handleCollision(obstacle)) {
        location.reload()
    }
}
}, 5) 
