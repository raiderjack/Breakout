//create a variable to hold one ball

// drawing variable
let k;

// UNKOWN
let balls = [];

// starting coordinates for the ball
ballX = 500;
ballY = 650;

// stating coordinates for first brick
brickX = 400;
brickY = 20;

//
//let paddleX = 400;
//let paddleMovement = 0;

// counts number of bricks broken
let counter = 0;

// UNKOWN
bricks = [];

// creating background and ball (and things that are only created once)
function setup()
{
  // creating canvas
  background("black");
  createCanvas(800,700);

  // centering bricks
  rectMode(CENTER);

  //paddleX = 400;

  // controls how fast the animations move
  frameRate(200);

  //make a new ball from the Ball class and call it k
  k = new Ball(ballX,ballY,20,20,7,7);

  for (let i = 2; i > 0; i = i - 1)
  {
    brickX = 400;
    for (let j = 0; j < i; j++)
    {
      let b = new Brick(brickX, brickY, false);
      bricks.push(b);
      brickX += 75;
    }
    brickY += 50;
  }
  brickX = 400;
  brickY = 20;
  for (let i = 2 ; i > 0; i = i - 1)
  {
    brickX = 400;
    for (let j = 0; j < i; j++)
    {
      let b = new Brick(brickX, brickY, false);
      bricks.push(b);
      brickX -= 75;
    }
    brickY += 50;
  }

}

function draw()
{
  // making the color black
  background(0);

  // making functions
  k.drawBall();
  k.moveBall();
  k.bounceBall();
  k.bounceBricks();
  k.gameCheck();

  // draws paddle
  paddle();

  if (keyCode == 39)
  {
    paddleX += 5;
  }
  else if (keyCode == 37)
  {
    paddleX -= 5;
  }

  for (let i = 0; i < bricks.length; i ++ )
  {
    bricks[i].drawBrick();
    bricks[i].breakBrick();
  }
}
function keyPressed()
{
  if (keyCode == 32)
  {
    location.reload(true);
  }

}
function paddle()
{
  stroke("white");
  strokeWeight(10);
  line(mouseX - 40, 650, mouseX + 40, 650);

}

class Brick
{
	constructor(x,y, broke) //every brick needs an x value and a y value
  {
		 this.x = x;
  	 this.y = y;
     this.broke = broke;

  }

  drawBrick() // draw a brick on the screen at x,y
  {
    if (this.broke == true)
    {
      fill("black")
      this.x = 2000;
      this.y = 2000;
      counter = counter + 1;
      print('counter = ' + counter.toString());

    }
    else
    {
      fill("red");
    }
      noStroke();
      rect(this.x, this.y, 70, 30);
  }
  breakBrick()
  {
        if(k.x >= this.x && k.x <= this.x + 70 && k.y <= this.y + 30)
        {
            this.broke = true;
        }
        else {
            this.broke = false;
        }
      }
}
class Ball
{
	constructor(x, y, height, width, speedx, speedy) //every ball needs an x value and a y value
  {
	   this.x = x;
  	 this.y = y;
     this.height = height;
     this.width = width;
     this.speedx = speedx;
     this.speedy = speedy;
	}

  drawBall()
  { // draw a ball on the screen at x,y
    stroke(0);
    strokeWeight(1);
    fill("white");
		ellipse(this.x, this.y, this.height, this.width);

    // balls.style.zIndex="1"
  }
	moveBall()
  { //update the location of the ball, so it moves across the screen
		this.x = this.x - this.speedx;
		this.y = this.y - this.speedy;
  }
  bounceBall()
  {
    // for (let i = 0; i < bricks.length; i++){
    //     if (this.x>= bricks[i].x && this.x <= bricks[i].x+70 && this.y <= bricks[i].y ){
    //       this.speedy = -this.speedy;
    //     }
    if (this.x >= 800)
    {
      this.speedx = -this.speedx;
    }
    if (this.x <= 5)
    {
      this.speedx = -this.speedx;
    }
    if (this.y <= 5)
    {
      this.speedy = -this.speedy;
    }
    if (this.x >= mouseX - 50 && this.x <= mouseX + 50 && this.y >= 650 - 12 && this.y <= 650 + 12)
    {
      this.speedy = -this.speedy;
      // this.speedx = -this.speedx;
      console.log(this.speedx);
      console.log(this.speedy);
    }
  }
  bounceBricks()
  {
    for (let i = 0; i < bricks.length; i++)
    {
      if (this.x >= bricks[i].x && this.x <= bricks[i].x + 70 && this.y >= bricks[i].y && this.y <= bricks[i].y + 30 && bricks[i].broke == false)
      {
        this.speedy = -this.speedy;
      }
    }
  }
  gameCheck()
  {
    if (counter == 6)
    {
      textSize(50);
      fill(10, 211, 30);
      text("YOU WIN!", 240, 320);
    }
    else if (this.y >= 700)
      {
        textSize(50);
        fill(244, 66, 66);
        text("GAME OVER!", 240, 320);

    }
  }


}
