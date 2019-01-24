let level = localStorage.getItem("current_level");

// drawing variable
let k;

// UNKOWN
let balls = [];

// starting coordinates for the ball
let ballX = 500;
let ballY = 650;


// counts number of bricks broken
let counter = 0;

// let brickX = 20;
// let brickY = 7;

let bricks = [];

let canvasX = 1450;
let canvasY = 850;
let paddleX = 200;
let brickCount = 100;

// creating background and ball (and things that are only created once)
function setup() {

  if (localStorage) {
    if (level == null) {
      print("this is the first time the page loads. You are on level one. This is Jack's code.");
      //Jack's setup code
      // creating canvas

      brickX = 400;
      brickY = 20;
      background("black");
      createCanvas(800, 700);

      // centering bricks
      rectMode(CENTER);

      //paddleX = 400;

      // controls how fast the animations move
      frameRate(200);

      //make a new ball from the Ball class and call it k
      k = new JackBall(ballX, ballY, 20, 20, 7, 7);

      for (let i = 2; i > 0; i = i - 1) {
        brickX = 400;
        for (let j = 0; j < i; j++) {
          let b = new JackBrick(brickX, brickY, false);
          bricks.push(b);
          brickX += 75;
        }
        brickY += 50;
      }
      brickX = 400;
      brickY = 20;
      for (let i = 2; i > 0; i = i - 1) {
        brickX = 400;
        for (let j = 0; j < i; j++) {
          let b = new JackBrick(brickX, brickY, false);
          bricks.push(b);
          brickX -= 75;
        }
        brickY += 50;
      }
    } else if (level == 1) {

      print("You beat level 1. You are now on level 2. This is Jeffrey's code.");

      brickX = 20;
      brickY = 7;
      background("black");
      createCanvas(canvasX, canvasY);
      frameRate(180);
      k = new JeffreyBall(ballX, ballY, 20, 20, 7, 7); //make a new ball from the Ball class and call it b.


      for (let h = 0; h < 250; h += 50) {
        for (let i = 0; i < 1400; i = i + 75) {
          let b = new JeffreyBrick(brickX + i, brickY + h, false);
          bricks.push(b);
        }
      }
    }
    //
    else {
      print("you beat the game: no more levels. ");
      localStorage.clear();
      location.reload();
    }
  } else {
    print("Sorry, your browser do not support local storage.");
  }


}

function draw() {
  if (level == null) {
    //Jack's game
    // making the color black
    background(0);

    // making functions
    k.drawBall();
    k.moveBall();
    k.bounceBall();
    k.bounceBricks();
    k.gameCheck();

    // draws paddle
    paddleJack();

    for (let i = 0; i < bricks.length; i++) {
      bricks[i].drawBrick();
      bricks[i].breakBrick();
    }
  } // end Jack's game
  else if (level == 1) {
    print("You beat level 1. You are now on level 2. This is Jeffrey's code.");

    background(0);
    k.drawBall();
    k.moveBall();
    k.bounceBall();
    k.bounceBricks();
    paddleJeffrey();

    arrowMovement();

    for (let i = 0; i < bricks.length; i++) {
      bricks[i].drawBrick();
      bricks[i].breakBrick();
    }
  }

}


function keyPressed() {
  if (keyCode == 32) {
    location.reload(true);
  }

  if (keyCode === RIGHT_ARROW) {
    localStorage.clear();

    location.reload();
  }

  if (keyCode === 13) {
    level++
    localStorage.setItem("current_level", level);
    location.reload();
  }

}

function paddleJack() {
  stroke("white");
  strokeWeight(10);
  line(mouseX - 40, 650, mouseX + 40, 650);

}

function paddleJeffrey() {
  stroke("white");
  strokeWeight(10);
  line(mouseX - 50, 720, mouseX + 50, 720);

}

function brick(x, y) {
  fill("pink");
  noStroke();
  rect(x, y, 70, 30);


}

function arrowMovement() {
  if (keyIsDown(65)) {
    paddleX = paddleX - 10;
    console.log("left");
  }
  if (keyIsDown(68)) {
    paddleX = paddleX + 10;
  }
}

class JackBrick {
  constructor(x, y, broke) //every brick needs an x value and a y value
  {
    this.x = x;
    this.y = y;
    this.broke = broke;

  }

  drawBrick() // draw a brick on the screen at x,y
  {
    if (this.broke == true) {
      fill("black")
      this.x = 2000;
      this.y = 2000;
      counter = counter + 1;
      print('counter = ' + counter.toString());

    } else {
      fill("red");
    }
    noStroke();
    rect(this.x, this.y, 70, 30);
  }
  breakBrick() {
    if (k.x >= this.x && k.x <= this.x + 70 && k.y <= this.y + 30) {
      this.broke = true;
    } else {
      this.broke = false;
    }
  }
}


class JeffreyBrick {

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




class JackBall {
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
    // for (let i = 0; i < bricks.length; i++){
    //     if (this.x>= bricks[i].x && this.x <= bricks[i].x+70 && this.y <= bricks[i].y ){
    //       this.speedy = -this.speedy;
    //     }
    if (this.x >= 800) {
      this.speedx = -this.speedx;
    }
    if (this.x <= 5) {
      this.speedx = -this.speedx;
    }
    if (this.y <= 5) {
      this.speedy = -this.speedy;
    }
    if (this.x >= mouseX - 50 && this.x <= mouseX + 50 && this.y >= 650 - 12 && this.y <= 650 + 12) {
      this.speedy = -this.speedy;
      // this.speedx = -this.speedx;
      console.log(this.speedx);
      console.log(this.speedy);
    }
  }
  bounceBricks() {
    for (let i = 0; i < bricks.length; i++) {
      if (this.x >= bricks[i].x && this.x <= bricks[i].x + 70 && this.y >= bricks[i].y && this.y <= bricks[i].y + 30 && bricks[i].broke == false) {
        this.speedy = -this.speedy;
      }
    }
  }
  gameCheck() {
    if (counter == 6) {
      textSize(30);
      fill(10, 211, 30);
      text("YOU WIN! PUSH ENTER TO MOVE TO LEVEL 2", 40, 320);


    } else if (this.y >= 700) {
      textSize(50);
      fill(244, 66, 66);
      text("GAME OVER!", 240, 320);

    }
  }


}

class JeffreyBall {

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
    // for (let i = 0; i < bricks.length; i++){
    //     if (this.x>= bricks[i].x && this.x <= bricks[i].x+70 && this.y <= bricks[i].y ){
    //       this.speedy = -this.speedy;
    //     }

    if (this.x >= canvasX) {
      this.speedx = -this.speedx;
    }
    if (this.x <= 35) {
      this.speedx = -this.speedx;
    }
    if (this.y >= 730) {
      textSize(50);
      fill(244, 66, 66);
      text("GAME OVER! Press Enter to replay", 600, 390);
      print("you lost");
      localStorage.clear();
    }

    if (this.y <= 5) {
      this.speedy = -this.speedy;

    }

    if (this.x >= mouseX - 50 && this.x <= mouseX + 50 && this.y >= 720 - 12 && this.y <= 720 + 12) {
      this.speedy = -this.speedy;
      this.speedy = this.speedy * random(1, 1.03);
      this.speedx = this.speedx * random(1, 1.03);
      console.log("speedup");


      console.log(this.speedx);
      console.log(this.speedy);

    }

  }
  bounceBricks() {
    for (let i = 0; i < bricks.length; i++) {
      if (this.x >= bricks[i].x && this.x <= bricks[i].x + 70 && this.y <= bricks[i].y + 30 && bricks[i].broke == false) {
        this.speedy = -this.speedy;
        brickCount += 1;
        if (brickCount == 95) {
          print("you won");
          localStorage.clear();
          location.reload(true);
        }

      }

    }

  }

}
