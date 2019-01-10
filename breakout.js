let k;
let balls = [];
let ballX = 500;
let ballY = 650;

let brickX = 20;
let brickY = 7;

let bricks = [];
let counter = 0;
let canvasX = 1450;
let canvasY = 850;



function setup() {
  background("black");
  createCanvas(canvasX, canvasY);
  frameRate(180);
  k = new Ball(ballX, ballY, 20, 20, 7, 7); //make a new ball from the Ball class and call it b.


  for (let h = 0; h < 250; h += 50) {
    for (let i = 0; i < 1400; i = i + 75) {
      let b = new Brick(brickX + i, brickY + h, false);
      bricks.push(b);

    }
  }





}


function draw() {
  background(0);
  k.drawBall();
  k.moveBall();
  k.bounceBall();
  k.bounceBricks();
  paddle();

  // arrowMovement();






  for (let i = 0; i < bricks.length; i++) {
    bricks[i].drawBrick();
    bricks[i].breakBrick();

  }

}



function paddle() {
  stroke("white");
  strokeWeight(10);
  line(mouseX - 50, 720, mouseX + 50, 720);

}

function keyPressed() {
  if (keyCode == 32) {
    location.reload(true);
  }

}


function brick(x, y) {
  fill("pink");
  noStroke();
  rect(x, y, 70, 30);


}


class Brick {

  constructor(x, y, broke, broke1) //every ball needs an x value and a y value
  {
    this.x = x;
    this.y = y;
    this.broke = broke;

  }

  drawBrick() { // draw a ball on the screen at x,y

    if (this.broke == true) {
      this.x = this.x + 4000;
      this.y = this.y + 4000;
      counter += 1;
      print('counter = ' + counter.toString());


    } else if (this.broke == false) {
      fill("pink");

    } else {
      fill("turquoise");

    }
    noStroke();
    rect(this.x, this.y, 70, 30);
  }


  breakBrick() {
    if (k.x >= this.x && k.x <= this.x + 70 && k.y <= this.y + 30 && k.y >= this.y) {
      this.broke = true;
      print(this.broke);

    }
  }
}



class Ball {

  constructor(x, y, height, width, speedx, speedy) //every ball needs an x value and a y value
  {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.speedx = speedx;
    this.speedy = speedy;

  }

  drawBall() { // draw a ball on the screen at x,y
    stroke(0);
    strokeWeight(1);
    fill("white");
    ellipse(this.x, this.y, this.height, this.width);
    // balls.style.zIndex="1"
  }
  moveBall() { //update the location of the ball, so it moves across the screen
    this.x = this.x - this.speedx;
    this.y = this.y - this.speedy;
  }
  bounceBall() {
    for (let i = 0; i < bricks.length; i++) {
      if (this.x >= bricks[i].x && this.x <= bricks[i].x + 70 && this.y <= bricks[i].y) {
        this.speedy = -this.speedy;
      }

      if (this.x >= canvasX) {
        this.speedx = -this.speedx;
      }
      if (this.x <= 35) {
        this.speedx = -this.speedx;
      }
      if (this.y >= 730) {
        textSize(50);
        fill(244, 66, 66);
        text("GAME OVER!", 600, 390)
      }
      if (counter == 95) {
        textSize(50);
        fill(10, 211, 30);
        text("YOU WIN!", 240, 320);
      }
    }

    if (this.y <= 5) {
      this.speedy = -this.speedy;

    }

    if (this.x >= mouseX - 50 && this.x <= mouseX + 50 && this.y >= 720 - 12 && this.y <= 720 + 12) {
      this.speedy = -this.speedy;
      this.speedy = this.speedy * random(1, 1.02);
      this.speedx = this.speedx * random(1, 1.02);
      console.log("speedup");


      console.log(this.speedx);
      console.log(this.speedy);

    }

  }
  bounceBricks() {
    for (let i = 0; i < bricks.length; i++) {
      if (this.x >= bricks[i].x && this.x <= bricks[i].x + 70 && this.y <= bricks[i].y + 30 && bricks[i].broke == false) {
        this.speedy = -this.speedy;

      }

    }

  }

}
