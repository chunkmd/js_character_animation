const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

canvas.width = 900;
canvas.height = 750;

const keys = [];

const player = {
    x: 0,
    y: 0,
    width: 90,
    height: 90,
    frameX: 0,
    frameY: 0,
    speed: 9,
    moving: false,
    isLeft: false
}

const playerSprite = new Image();
playerSprite.src = "Pengu_LRUDK.png"

const bg = new Image();
bg.src = "background.jpg"

function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH){
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

window.addEventListener("keydown", function (e){
    keys[e.keyCode] = true;
    console.log(keys);
    player.moving = true;
});

window.addEventListener("keyup", function (e){
    delete keys[e.keyCode];
    player.moving = false;
});

function  movePlayer(){

    //up button
    if(keys[38] && player.y > 0){
        player.y -= player.speed;
        player.frameY = 2;
    }

    //down button
    if(keys[40] && player.y < canvas.height - player.height){
        player.y += player.speed;
        player.frameY = 3;
    }

    //left button
    if(keys[37] && player.x > 0-9){
        player.x -= player.speed;
        player.frameY = 1;
        player.isLeft = true;
    }

    //right button
    if(keys[39] && player.x < canvas.width - player.width+12){
        player.x += player.speed;
        player.frameY = 0;
        player.isLeft = false;
    }

    //q = 81
    if(keys[81] && player.isLeft === false){
        player.frameY = 4;
    }

    if(keys[81] && player.isLeft){
        player.frameY = 5;
    }
}

function handlePlayerFrame(){
    if (player.frameX < 7 && player.moving) player.frameX++;
    else player.frameX = 0;
}

setInterval(function (){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

    drawSprite(playerSprite, player.width * player.frameX,
        player.height * player.frameY,
        player.width, player.height,
        player.x, player.y, player.width, player.height)

    movePlayer();
    handlePlayerFrame();}, 60);