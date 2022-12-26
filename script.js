const board = document.getElementById('board');
const scoreText = document.getElementById('score');
const highScoreText = document.getElementById('highscore');

let lastRender=0, score=0, highscore=0;

let snakePos = [{ x: 12, y: 12 }];
let foodPos = { x: 16 , y: 16 };
let input = { x: 0, y: 0 };

function update() {
    if(snakePos[0].x == foodPos.x  && snakePos[0].y == foodPos.y) {
        snakePos.unshift( { x: foodPos.x, y: foodPos.y } );
        foodPos = { x: Math.floor(1+19*Math.random()), y: Math.floor(1+19*Math.random()) };
        score++;

        if(score > highscore) {
            highscore = score;
        }
    }
    
    for(let i=snakePos.length-2;i>=0;i--) {
        snakePos[i+1] = {...snakePos[i]};
    }
    
    snakePos[0].x += input.x;
    snakePos[0].y += input.y;
  }
  
  function draw() {
    board.innerHTML = "";

    for(let i=0;i<snakePos.length;i++) {
        const snake = document.createElement('div');
        snake.style.gridRowStart = snakePos[i].x;
        snake.style.gridColumnStart = snakePos[i].y;

        if(i==0)
            snake.classList.add('head');
        else
            snake.classList.add('body');

        board.appendChild(snake);
    }

    const food = document.createElement('div');
    food.style.gridRowStart = foodPos.x;
    food.style.gridColumnStart = foodPos.y;
    food.classList.add('food');
    board.appendChild(food);

    scoreText.innerText = "Score: " + score;
    highScoreText.innerText = "HighScore: " + highscore;
  }
  
  function loop(timestamp) {
    window.requestAnimationFrame(loop);

    var progress = timestamp - lastRender;

    if(progress/1000 < 1/5 )
        return;
    
    lastRender = timestamp;
  
    let isCollided = collided();
    
    if(isCollided) {
        input = { x: 0, y: 0 };
        alert("Game Over!");
        localStorage.setItem('highscore', highscore.toString());
        score = 0;
        snakePos = [{ x: 12, y: 12 }];
        foodPos = { x: 16 , y: 16 };
    }

    update();
    draw();
  } 

  function collided() {
    const x = snakePos[0].x;
    const y = snakePos[0].y;

    for(let i=1;i<snakePos.length;i++) {
        if(x === snakePos[i].x && y === snakePos[i].y) {
            return true;
        }
    }

    if(x > 20 || x < 1 || y > 20 || y < 1 ) {
        return true;
    }

    return false;
  } 

  
  window.addEventListener('keydown', e => {
      
    if(e.key == 'ArrowUp' || e.key == 'ArrowDown' || e.key == 'ArrowLeft' || e.key == 'ArrowRight') {
        window.requestAnimationFrame(loop);
    }

    switch(e.key) {
        case 'ArrowUp':
            input.x = -1;
            input.y = 0;
            break;

        case 'ArrowDown':
            input.x = 1;
            input.y = 0;
            break;
        case 'ArrowLeft':
            input.x = 0;
            input.y = -1;
            break;
        case 'ArrowRight':
            input.x = 0;
            input.y = 1;
            break;
        default:
            break;       
    }
  });

const currHighScore = localStorage.getItem('highscore');
    if(currHighScore == null)
        localStorage.setItem('highscore', "0");
    else
        highscore = parseInt(currHighScore);

  draw();