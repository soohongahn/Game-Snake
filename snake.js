const snakeBoard = document.getElementById("board");
const snakeBoard_ctx = snakeBoard.getContext("2d");

const boardColor = "#000";
const snakeColor = "#2DB238";
const snakeBorder = "#000";
const foodColor = "#DB1C1C";
const foodBorder = "#000";

let moveX = 10;
let moveY = 0;
let snakeLength = 5;
let foodX = 0;
let foodY = 0;
let newGame = true;

let snake = [
  {x: 100, y: 100}, //Snake Head
  {x: 90, y: 100},
  {x: 80, y: 100},
  {x: 70, y: 100},
  {x: 60, y: 100}
];

document.getElementById("exitButton").addEventListener("click", function(){
  window.open("list.html", target="_self");
});


document.getElementById("startButton").addEventListener("click", function(){
  newGame = false;
  startGame();
  makeFood();
});

document.getElementById("restartButton").addEventListener("click", function(){
  reset();
  if(!newGame){
    startGame();
    makeFood();
  }
});

function reset(){
  document.getElementById("message").innerHTML = "";
  moveX = 10;
  moveY = 0;
  snakeLength = 5;
  snake = [
    {x: 100, y: 100},
    {x: 90, y: 100},
    {x: 80, y: 100},
    {x: 70, y: 100},
    {x: 60, y: 100}
  ];
}


document.addEventListener("keydown", moveDirection);

function startGame(){
  if(checkDead()){
    document.getElementById("message").innerHTML = "Game Over";
    return;
  }
  setTimeout(function(){
    clearCanvas();
    moveSnake();
    if(checkEat()){
      makeFood();
      growSnake();
    }
    drawSnake();
    drawFood();
    updateScore();
    startGame();
  }, 100);
}

function clearCanvas() {
  snakeBoard_ctx.fillStyle = boardColor;
  snakeBoard_ctx.fillRect(0, 0, snakeBoard.width, snakeBoard.height);
}

function drawSnake(){
  snake.forEach(drawSnakePart);
}

function drawSnakePart(snakePart){
  snakeBoard_ctx.fillStyle = snakeColor;
  snakeBoard_ctx.strokestyle = snakeBorder;
  snakeBoard_ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
  snakeBoard_ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

function moveSnake(){
  const head = {x: snake[0].x + moveX, y: snake[0].y + moveY};
  snake.unshift(head);
  snake.pop();
}

function moveDirection(event){
  switch (event.keyCode) {
    case 37:  //left
      if(moveX != -10 && moveX != 10){
        moveX = -10;
        moveY = 0;
      }
    break;
    case 38:  //up
      if(moveY != -10 && moveY != 10){
        moveX = 0;
        moveY = -10;
      }
    break;
    case 39:  //right
      if(moveX != 10  && moveX != -10){
        moveX = 10;
        moveY = 0;
      }
    break;
    case 40:  //down
      if(moveY != 10 && moveY != -10){
        moveX = 0;
        moveY = 10;
      }
    break;
  }
}

function checkDead(){
  for(let i = 1; i < snakeLength; i++){
    if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
      return true;
    }
  }
  if(snake[0].x < 0 || snake[0].y < 0){
    return true;
  } else if(snake[0].x > snakeBoard.width - 10 || snake[0].y > snakeBoard.height - 10){
    return true;
  }
  return false;
}

function randomCoord(min, max){
  var num = (Math.floor(Math.random() * (max - min) ) + min);
  num = (num - (num%10));
  return num;
}

function makeFood(){
  foodX = randomCoord(0, snakeBoard.width);
  foodY = randomCoord(0, snakeBoard.height);
}

function checkEat(){
  if (snake[0].x == foodX && snake[0].y == foodY){
    return true;
  }
  return false;
}

function drawFood(){
  snakeBoard_ctx.fillStyle = foodColor;
  snakeBoard_ctx.strokestyle = foodBorder;
  snakeBoard_ctx.fillRect(foodX, foodY, 10, 10);
  snakeBoard_ctx.strokeRect(foodX, foodY, 10, 10);
}

function growSnake(){
  const tail = {x: snake[snakeLength - 1].x + moveX, y: snake[snakeLength - 1].y + moveY};
  snake.push(tail);
  snakeLength++;
}

function updateScore(){
  document.getElementById("score").innerHTML = (snakeLength - 5) * 10;
}
