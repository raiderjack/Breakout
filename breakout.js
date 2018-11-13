//create a variable to hold one ball
let b;
let k;
let balls = [];
ballX=500;
ballY=650;


function setup() {
  createCanvas(800,700);
  // b = new Ball(800,400,20,20,random(2,5),random(2,5));
  k = new Ball(ballX,ballY,20,20,3,2.5); //make a new ball from the Ball class and call it b.
}


function draw()
{
	background(220);
    // b.drawBall();
    //   b.moveBall();
    //     b.bounceBall();
    k.drawBall();
    k.moveBall();
    k.bounceBall();
    paddle();



    for (let i = 0; i < balls.length; i++) {
    	 	balls[i].drawBall();
           	balls[i].moveBall();
            	  balls[i].bounceBall();
            }


// function keyPressed() {
//     let  b = new Ball(random(0,800),random(0,800),20,20,random(2,5),3);
//     balls.push(b);
}
function paddle() {
  stroke("black");
  strokeWeight(10);
  line(mouseX - 40, 650, mouseX + 40, 650);

}

//ball class from which to create new balls with similar properties.
class Ball {

	constructor(x,y,height,width,speedx,speedy) //every ball needs an x value and a y value
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
    fill(0);
		ellipse(this.x,this.y,this.height,this.width);
	  }
	moveBall() { //update the location of the ball, so it moves across the screen
		this.x = this.x-this.speedx;
		this.y = this.y-this.speedy;
    }
  bounceBall() {
    if (this.x >= 800)
        {
        this.speedx = -this.speedx;
        }
    if (this.x <= 5)
        {
      this.speedx = -this.speedx;
        }
    if (this.y >= 700)
        {
      textSize(50);
      fill(244,66,66);
      text("GAME OVER!",400,300);
      console.log("hi");
      location.reload();
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
