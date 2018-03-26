var canvas, pen, W, H, snakes, food, score, game_over;

function init () { 
    console.log("init");
    canvas = document.getElementById("mycanvas");
    pen = canvas.getContext("2d");
    W = canvas.width;
    H = canvas.height;

    game_over = false;
    food = getRandomFood();
    score = 0;
    
    snakes = {
        init_length: 2,
        color: "green",
        cells: [],
        direction: "right",
        createsnake: function () {
            for(var i = this.init_length - 1; i >= 0; --i) {
                this.cells.push({x: i, y: 0});
            }
        },
        drawSnake: function() {
            for(var j = 0; j < this.cells.length; ++j) {
                pen.fillStyle = this.color;
                pen.strokeStyle = "yellow";
                pen.lineWidth = 3;
                pen.strokeRect(this.cells[j].x * 10, this.cells[j].y * 10, 8, 10)
                pen.fillRect(this.cells[j].x * 10, this.cells[j].y * 10, 8, 10)
            }
            console.log("in draw");
        },
        updateSnake: function () {
            var headX = this.cells[0].x;
            var headY = this.cells[0].y;

            var nextX, nextY;

            // var nextX = headX + 1;
            // this.cells.unshift({x: nextX, y:0});

            if (headX === food.x && headY === food.y) {
                food = getRandomFood();
                score++;
            } else {
                this.cells.pop();
            }

            if (this.direction === 'right') {
                nextX = headX + 1;
                nextY = headY;
            } else if (this.direction === 'left') {
                nextX = headX - 1;
                nextY = headY;
            } else if (this.direction === 'down') {
                nextX = headX;
                nextY = headY + 1;
            } else {
                nextX = headX;
                nextY = headY - 1;
            }

            //Insert new cell at head
            this.cells.unshift({x:nextX, y: nextY});

            //Find last coordinates snake can pass
            var lastX = Math.round(W/ 10);
            var lastY = Math.round(H/ 10);

            if (this.cells[0].y < -1 || this.cells[0].x < -1
            || this.cells[0].x > lastX || this.cells[0].y > lastY) {
                alert("GameOver");
                game_over = true;
            }
        }
    };
    snakes.createsnake();

    //Add Event Listeners to our game
    //Keyboard events

    function KeyPressed(e) {
        if (e.key === 'ArrowRight') {
            snakes.direction = 'right';
        } else if (e.key === 'ArrowLeft') {
            snakes.direction = 'left';
        } else if (e.key === 'ArrowDown') {
            snakes.direction = 'down';
        } else {
            snakes.direction = 'up';
        }
    }

    document.addEventListener('keydown', KeyPressed);
}	

function getRandomFood() {
    console.log(Math.random());
    var foodX = Math.round(Math.random() * (W - 20) / 10);
    var foodY = Math.round(Math.random() * (H - 20) / 10);



    var foodColors = ['red', 'green', 'coral', 'aqua', 'orchid'];
    var i = Math.round(Math.random() * foodColors.length);

    var food = {
        x: foodX,
        y: foodY,
        color: foodColors[i]
    };

    return food;

}

function draw () {
	// body... 
    pen.clearRect(0, 0, W, H);
    snakes.drawSnake();

    pen.fillStyle = food.color;
    pen.fillRect(food.x * 10, food.y * 10, 10, 12);

    pen.fillStyle = 'white';
    pen.font = '14px Roboto';
    pen.fillText('Score: ' + score, 10, 10);
}

function update () {
    snakes.updateSnake();
}

function gameLoop () {
	draw();
    update();	
    
    if (game_over === true) {
        clearInterval(f);
    }
}

init();
var f = setInterval(gameLoop, 100);