const canvas = document.getElementById('canvas');
const displayScore = document.getElementById('score');
const tileSize = 20;
const ctx = canvas.getContext('2d');
const dimensions = { rows: canvas.clientWidth / tileSize, cols: canvas.clientHeight / tileSize }
let foodX = 10;
let foodY = 10;
let snakeX = tileSize * 5;
let snakeY = tileSize * 5;
let speedX = 0;
let speedY = 0;
let snakeBody = []
let score = 0;
let gameOver = false;
generateFood()
function drawSnake() {
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }
    if (borderCollision(snakeX, snakeY) == true || snakeCollision(snakeX, snakeY) == true) {
        gameOver = true;
        return;
    }
    snakeX += speedX * tileSize;
    snakeY += speedY * tileSize;
    ctx.fillStyle = "black";
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    ctx.fillStyle = "red";
    ctx.fillRect(foodX, foodY, tileSize, tileSize)
    ctx.fillStyle = "green";
    ctx.fillRect(snakeX, snakeY, tileSize, tileSize);
    for (let i = 0; i < snakeBody.length; i++) {
        ctx.fillRect(snakeBody[i][0], snakeBody[i][1], tileSize, tileSize);
    }
    if (snakeX == foodX && snakeY == foodY) {
        score++;
        snakeBody.push([foodX, foodY])
        generateFood()
    }
}
function generateFood() {
    foodX = Math.floor(Math.random() * dimensions.cols) * tileSize;
    foodY = Math.floor(Math.random() * dimensions.rows) * tileSize;
}
const changeDirection = (event) => {
    if (event.code == "ArrowUp" && speedY != 1) {
        speedX = 0;
        speedY = -1;
    }
    else if (event.code == "ArrowDown" && speedY != -1) {
        speedX = 0;
        speedY = 1;
    }
    else if (event.code == "ArrowLeft" && speedX != 1) {
        speedX = -1;
        speedY = 0;
    }
    else if (event.code == "ArrowRight" && speedX != -1) {
        speedX = 1;
        speedY = 0;
    }
}

document.addEventListener("keyup", changeDirection);

function playGame() {

    if (!gameOver) {
        displayScore.innerHTML = score;
        drawSnake()
        setTimeout(() => {
            requestAnimationFrame(playGame);
        }, 1000 / 10);
    }
    else
    {
        alert("Game Over")
        location.reload();
    }
        

}
function borderCollision(headX, headY) {
    if (headX < 0 || headY < 0 || headX >= 400 || headY >= 400) {
        console.log("Border Collision detected");
        console.log(snakeBody);
        return true;
    }
    return false;
}
function snakeCollision(headX, headY) {
    let body = snakeBody.slice(1);
    for (let i = 0; i < body.length; i++) {
        if (headX == body[i][0] && headY == body[i][1])
        {
            return true;
        }        
    }
    return false;
}
playGame();

