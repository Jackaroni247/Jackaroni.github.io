const starCount = 200;
const starsX = [];
const starsY = [];

const bodyCount = 0;
const celestialBodies = [];

const G = 0.2;

var paused = false;

function newBody(x, y, mass, fixed, xVelocity, yVelocity) {
  celestialBodies[celestialBodies.length] = new celestialBody();
  celestialBodies[celestialBodies.length - 1].xPos = x;
  celestialBodies[celestialBodies.length - 1].yPos = y;
  celestialBodies[celestialBodies.length - 1].mass = mass;
  celestialBodies[celestialBodies.length - 1].fixed = fixed;
  celestialBodies[celestialBodies.length - 1].vector.xVelocity = xVelocity;
  celestialBodies[celestialBodies.length - 1].vector.yVelocity = yVelocity;
  celestialBodies[celestialBodies.length - 1].radius = mass;
}

function mouseClicked() {
  newBody(mouseX, mouseY, 9.81, false, 0, 0);
}

function setup() {
  createCanvas(800, 800);
  background(0);
  for (var i = 0; i < starCount; i++) {
    starsX.push(random(0, width));
    starsY.push(random(0, height));
  }

  for (var i = 0; i < bodyCount; i++) {
    newBody(random(0, width), random(0, height), 9.81, false, 0, 0);
  }

  /*
  newBody(random(0,width), random(0,height), 9.81, false, 0, 0);
  newBody(random(0,width), random(0,height), 9.81, false, 0, 0);
  newBody(random(0,width), random(0,height), 9.81, false, 0, 0);
  newBody(random(0,width), random(0,height), 9.81, false, 0, 0);
  */

  //newBody(200, 200, 9.81, false, 0, 0);
  //newBody(200, 600, 9.81, false, 0, 0);
  //newBody(600, 200, 9.81, false, 0, 0);
  //newBody(600, 600, 9.81, false, 0, 0);

  //newBody(400, 400, 100, true, 0, 0);
}

function draw() {
  clear();
  background(0);
  for (var i = 0; i < starCount; i++) {
    fill(255);
    noStroke();
    ellipse(starsX[i], starsY[i], 2);
  }

  for (var i = 0; i < celestialBodies.length; i++) {
    celestialBodies[i].tick();
    celestialBodies[i].show();
  }
}

function keyReleased() {
    if (paused) {
      paused = !paused;
      loop();
    } else {
      paused = !paused;
      noLoop();
    }

}
