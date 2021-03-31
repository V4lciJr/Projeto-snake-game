let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");

let box = 32;
let img = new Image(box, box);
let img_jerry = new Image(box, box);
img.src = 'snake.jpg'
img_jerry.src = 'jerry.png'
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}

let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

let direction = "right";

function createBackGround(){
    context.fillStyle = "white";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

img.onload = function createSnake(){
    let pattern = context.createPattern(img, 'repeat');
    for(i = 0; i < snake.length; i++){
        context.fillStyle = pattern;
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
};

function drawFood(){
    let pattern2 = context.createPattern(img_jerry, 'repeat')
    context.fillStyle = pattern2;
    context.fillRect(food.x, food.y, box, box);
}

document.addEventListener("keydown", update);

function update(event){
    if (event.keyCode === 37 && direction != "right"){
        direction = "left";
    }

    if (event.keyCode === 38 && direction != "down"){
        direction = "up";
    }

    if (event.keyCode === 39 && direction != "left"){
        direction = "right";
    }


    if (event.keyCode === 40 && direction != "up"){
        direction = "down";
    }
}


function playGame(){

    if (snake[0].x > 15 * box && direction === "right"){ snake[0].x = 0;}
    if (snake[0].x < 0 && direction === "left"){ snake[0].x = 16 * box;}
    if (snake[0].y > 15 * box && direction === "down"){ snake[0].y = 0;}
    if (snake[0].y < 0 && direction === "up"){ snake[0].y = 16 * box;}
    
    for(i = 1; i < snake.length; i++){
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y){
            clearInterval(game);
            alert("Game Over :(.\nReinicie a página para jogar novamente");
        }
    }

    createBackGround();
    img.onload();
    drawFood();
    
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction === "right"){ snakeX += box;}
    if (direction === "left"){ snakeX -= box;}
    if (direction === "up"){ snakeY -= box;}
    if (direction === "down"){ snakeY += box;}

    if (snakeX != food.x || snakeY != food.y){
        snake.pop();
    }else{

        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }
    

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}

let game = setInterval(playGame, 110);
