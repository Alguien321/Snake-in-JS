class Vector
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }
}

var canvas = document.querySelector("canvas");
var cc = canvas.getContext("2d");

var up = false, down = true, left = false, right = false;

window.addEventListener("keydown", keyboardController, false);
function keyboardController(e)
{
    if (e.key == 'w')
    {
        up = true;
    }else 
    {
        up = false;
    }
    if (e.key == 'a')
    {
        left = true;
    }else 
    {
        left = false;
    }
    if (e.key == 's')
    {
        down = true;
    }else 
    {
        down = false;
    }
    if (e.key == 'd')
    {
        right = true;
    }else 
    {
        right = false;
    }

    if (!up && !down && !left && !right)
    {
        left = true;
    }
}

blocks = [
    new Vector(0, 0),
    new Vector(16, 0),
    new Vector(32, 0)
];

coin = new Vector(64, 64);

direction = 4;
vel = 16;
score = 0;

function update()
{
    for (let index = blocks.length-1; index > 0; index--) 
    {
        blocks[index] = new Vector(blocks[index - 1].x, blocks[index - 1].y);
    }

    if (right)
    {
        if (direction != 2)
        {
            blocks[0].x += vel;
            direction = 1;
        }else
        {
            blocks[0].x -= vel;
            direction = 2;
        }
    }else if (left)
    {
        if (direction != 1)
        {
            blocks[0].x -= vel;
            direction = 2;
        }else
        {
            blocks[0].x += vel;
            direction = 1;
        }
    }else if (up)
    {
        if (direction != 4)
        {
            blocks[0].y -= vel;
            direction = 3;
        }else
        {
            blocks[0].y += vel;
            direction = 4;
        }
    }
    else if (down)
    {
        if (direction != 3)
        {
            blocks[0].y += 16;
            direction = 4;
        }else
        {
            blocks[0].y -= 16;
            direction = 3;
        }
    }

    if (blocks[0].x == coin.x && blocks[0].y == coin.y)
    {
        coin.x = (Math.floor(Math.random() * 50)) * 16;
        coin.y = (Math.floor(Math.random() * 37.5)) * 16;

        blocks[blocks.length] = new Vector(900, 700)
        score += 1;
    }

    if (blocks[0].x < 0 || blocks[0].y < 0 || blocks[0].x > 800 || blocks[0].y > 600)
    {
        window.location.reload();
        alert("Score: " + score)
    }

    blocks.forEach(element => {
       if (element != blocks[0])
       {
            if (blocks[0].x == element.x && blocks[0].y == element.y)
            {
                window.location.reload();
                alert("Score: " + score)
            }
       } 
    });

    //console.log("d: " + direction + " up: " + up + " down: " + down + " rigth: " + right + " left: " + left);
}

function draw()
{
    cc.clearRect(0, 0, canvas.width, canvas.height)

    blocks.forEach(element => {
        cc.fillRect(element.x, element.y, 16, 16);
    });

    cc.fillRect(coin.x+4, coin.y+4, 8, 8)
    cc.strokeText(score, 5, 10, 500)
}

setInterval(update, 1000/8);
setInterval(draw, 1000/40);