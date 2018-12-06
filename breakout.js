//create a variable to hold one ball
let k;
let balls = [];
// ballX=mouseX;
// ballY=mouseY;
let paddleStart = 400;

// var timerVar = setInterval(countTimer,1000);
// var total seconds = 0;
// function countTimer() {
//   ++total seconds
//   var hour = Math.floor(totalSeconds/3600);
//   var minute = Math.floor(totalSeconds = (hour*3600/60);
//   var seconds = totalSeconds - (hour*3600 + minute*60);


function setup() {
  background("black");
  createCanvas(800,700);
  k = new Ball(paddleStart,640,20,20,5,5,false); //make a new ball from the Ball class and call it b.

}


function draw() {

	background(0);

  if(this.inPlay == true){
    k.startBall();
    k.inPlay = false;
    print(k.inPlay);
  } else {
    k.moveBall();
  }

    k.drawBall();
    k.bounceBall();

    paddle();
    paddleStart = mouseX;


    for (var row = 0; row <= 5; row++) {
        push(); //save state of canvas
        // console.log("row " + row);
        for (var col = 0; col <= 9; col++) {
          brick();
          translate(75, 0); //translate in X (left-right)
          // console.log("drawing shape in row: " + row + " and column: " + col);
        }
        pop();
        translate(0, 50);
      }
    for (let i = 0; i < balls.length; i++) {
    	balls[i].drawBall();
      balls[i].moveBall();
      balls[i].bounceBall();
      balls[i].startBall();
      }

}

function paddle() {
  stroke("white");
  strokeWeight(10);
 line(paddleStart - 40, 650, paddleStart + 40, 650);
if (paddleStart>=40 && paddleStart<=760) {


} else{


}



}
function keyPressed() {
  if (keyCode == 32)
    location.reload(true);
    this.inPlay = true;

}

function brick() {
  fill("red");
  strokeWeight(1);
  rect(20,5,70,30);

}

class Ball {

	constructor(x,y,height,width,speedx,speedy,inPlay) { //every ball needs an x value and a y value

		 this.x = x;
  	 this.y = y;
     this.height = height;
     this.width = width;
     this.speedx = speedx;
     this.speedy = speedy;
     this.inPlay = false;
	  }


  startBall() {
    if(k.inPlay == true){
    this.x = 500
    this.y = 640
  }
}

  drawBall() { // draw a ball on the screen at x,y
    stroke(0);
    strokeWeight(1);
    fill("white");
		ellipse(this.x,this.y,this.height,this.width);
	  }
	moveBall() { //update the location of the ball, so it moves across the screen

		this.x = this.x-this.speedx;
		this.y = this.y-this.speedx;
    }
  bounceBall() {
    if (this.x >= 800)
        {
        this.speedx = -this.speedx;
        }
    if (this.x <= 5)  {
      this.speedx = -this.speedx;
        }
    if (this.y >= 700)  {
      textSize(50);
      fill(244,66,66);
      text("GAME OVER!",240,340)
       }

    if (this.y <= 5)
        {
      this.speedy = -this.speedy;
        }
    if (this.x >= mouseX - 50 && this.x <= mouseX + 50 && this.y >= 650 - 12 && this.y <= 650 + 12) {
      this.speedy = -this.speedy;
      // this.speedx = -this.speedx;
      console.log(this.speedx);
      console.log(this.speedy);
      }
   }
}
