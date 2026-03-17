class vector {
  xVelocity;
  yVelocity;
  velocity;
  direction;

  calculateDirection() {
    this.direction = atan2(this.xVelocity, this.yVelocity);
  }

  calculateVelocity() {
    this.velocity = sqrt(sq(this.xVelocity) + sq(this.yVelocity));
  }

  tick() {
    this.calculateDirection();
    this.calculateVelocity();
  }

}
