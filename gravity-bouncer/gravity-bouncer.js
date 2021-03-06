//Variables--------------------------------------
var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;
var ball;
var gravity = 1;
var friction = 0.9;
var colorArray = [
  '#C9DAE',
  '#03F7EE', 
  '#00B295', 
  '#191516', 
  '#AB2346'
];
var ballArray = [];
var mouse = {
  x: innerWidth / 2, 
  y: innerHeight / 2
};



//Establish ball structure-----------------------
function Ball(x, y, dx, dy, radius, color) {
  //Ball variables
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.color = color;

  //Draw balls
  this.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.stroke();
    c.closePath();
  }

  //Check parameters
  this.update = function() {
    if(this.y + this.radius + this.dy > canvas.height) {
      this.dy = -this.dy * friction;
    }
    else {
      this.dy += gravity;
    }
    if (this.x + this.radius + this.dx > canvas.width || this.x - this.radius <= 0) {
      this.dx = -this.dx;
    }
    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  }
}


//Create balls-----------------------------------
function init() {
  ballArray = [];
  for (var i = 0; i < 100; i++) {
    var x = randomIntFromRange(radius, canvas.width - radius);
    var y = randomIntFromRange(0, canvas.height - radius);
    var dx= randomIntFromRange(-2, 2);
    var dy= randomIntFromRange(-2, 2);
    var radius= randomIntFromRange(15, 30);
    var color = randomColor(colorArray);
    ballArray.push(new Ball(x, y, dx, dy, radius, color));
  }
  console.log(ballArray);
}


//Animate balls----------------------------------
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0,0, canvas.width, canvas.height);
  for (var i = 0; i < ballArray.length; i++){
    ballArray[i].update();
  }
}



//Outputs random number between a certain range--
function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max-min + 1) + min);
}

//Outputs random color from the color array------
function randomColor(colorArray) {
  return colorArray[Math.floor(Math.random() * colorArray.length)];
}



//Track mouse movement---------------------------
addEventListener('mousemove', function(event) {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

//Resize canvas on page resize, restart animation
addEventListener('resize', function() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  init();
});

//On page click, restart animation---------------
addEventListener('click', function() {
  init();
})


//Calls creation and animation functions---------
init();
animate();