var canvas, pen, W, H, box;

function init () { 
    console.log("init");
    canvas = document.getElementById("mycanvas");
    pen = canvas.getContext("2d");
    W = canvas.width;
    H = canvas.height;
    
    box = {
        x: 10,
        y: 10,
        h: 10,
        w: 10,
        speed: 5
    }
}	

function draw () {
	// body... 
    pen.clearRect(0, 0, W, H);
    pen.fillStyle = "orange";
    pen.fillRect(box.x, box.y, box.w, box.h);
}

function update () {
    
    box.x += box.speed;
    if (box.x >= W - (2 * box.speed)) {
        box.speed *= -1;
    } else if (box.x <= 0){
        box.speed *= -1;
    }
}

function gameLoop () {
	draw();
	update();	
}

init();
setInterval(gameLoop, 100);