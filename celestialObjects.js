function getDistance(obj1, obj2) {
  return sqrt(sq(obj1.xPos - obj2.xPos) + sq(obj1.yPos - obj2.yPos));
}

function getAngle(obj1, obj2) {
  return atan2(obj2.yPos - obj1.yPos, obj2.xPos - obj1.xPos);
}

class celestialBody {
  xPos = random(0, width);
  yPos = random(0, height);
  mass;
  fixed;
  radius;
  vector;

  constructor() {
    this.vector = new vector();
  }

  tick() {
    angleMode(DEGREES);
    this.vector.tick();
    this.gravityForces();
    this.checkColissions();
    this.vector.tick();
    this.xPos += this.vector.xVelocity;
    this.yPos += this.vector.yVelocity;
  }

  gravityForces() {
    if (!this.fixed) {
      var distance = 0;
      var angle = 0;
      for (var i = 0; i < celestialBodies.length; i++) {
        if (celestialBodies[i] != this) {
          distance = getDistance(this, celestialBodies[i]);
          angle = getAngle(this, celestialBodies[i]);
          this.vector.xVelocity +=
            cos(angle) * (this.mass / max(distance, 20)) * G;
          this.vector.yVelocity +=
            sin(angle) * (this.mass / max(distance, 20)) * G;
        }
      }
    }
  }

  checkColissions() {
    angleMode(DEGREES);
    if (!this.fixed) {
      for (var i = 0; i < celestialBodies.length; i++) {
        if (celestialBodies[i] != this) {
          if (
            getDistance(this, celestialBodies[i]) <=
            this.radius + celestialBodies[i].radius
          ) {
            var tempXVelocity;
            var tempYVelocity;
            var angle = getAngle(this, celestialBodies[i]);
            console.log("hit");
            tempXVelocity =
              ((this.vector.velocity *
                (this.vector.direction - angle - 180) *
                (this.mass - celestialBodies[i].mass) +
                2 *
                  celestialBodies[i].mass *
                  celestialBodies[i].vector.velocity *
                  cos(celestialBodies[i].vector.direction - angle - 180)) /
                (this.mass + celestialBodies[i].mass)) *
                cos(angle - 90) +
              this.vector.velocity *
                sin(this.vector.direction - angle - 180) *
                cos(angle);

            tempYVelocity =
              ((this.vector.velocity *
                (this.vector.direction - angle - 180) *
                (this.mass - celestialBodies[i].mass) +
                2 *
                  celestialBodies[i].mass *
                  celestialBodies[i].vector.velocity *
                  cos(celestialBodies[i].vector.direction - angle - 180)) /
                (this.mass + celestialBodies[i].mass)) *
                sin(angle - 90) +
              this.vector.velocity *
                sin(this.vector.direction - angle - 180) *
                sin(angle);

            celestialBodies[i].vector.xVelocity =
              ((celestialBodies[i].vector.velocity *
                (celestialBodies[i].vector.direction - angle - 180) *
                (celestialBodies[i].mass - this.mass) +
                2 *
                  this.mass *
                  this.vector.velocity *
                  cos(this.vector.direction - angle - 180)) /
                (celestialBodies[i].mass + this.mass)) *
                cos(angle - 90) +
              celestialBodies[i].vector.velocity *
                sin(celestialBodies[i].vector.direction - angle - 180) *
                cos(angle);

            celestialBodies[i].vector.yVelocity =
              ((celestialBodies[i].vector.velocity *
                (celestialBodies[i].vector.direction - angle - 180) *
                (celestialBodies[i].mass - this.mass) +
                2 *
                  this.mass *
                  this.vector.velocity *
                  cos(this.vector.direction - angle - 180)) /
                (celestialBodies[i].mass + this.mass)) *
                sin(angle - 90) +
              celestialBodies[i].vector.velocity *
                sin(celestialBodies[i].vector.direction - angle - 180) *
                sin(angle);
            this.vector.xVelocity = tempXVelocity * 0.8;
            this.vector.yVelocity = tempYVelocity * 0.8;
            celestialBodies[i].xVelocity *= 0.8;
            celestialBodies[i].yVelocity *= 0.8;
            this.vector.tick();
            this.xPos += this.vector.xVelocity;
            this.yPos += this.vector.yVelocity;
            celestialBodies[i].vector.tick();
            celestialBodies[i].xPos += celestialBodies[i].vector.xVelocity;
            celestialBodies[i].yPos += celestialBodies[i].vector.yVelocity;
          }
        }
      }
    }
  }
  show() {
    fill(255);
    circle(this.xPos, this.yPos, this.radius * 2);
  }
}
