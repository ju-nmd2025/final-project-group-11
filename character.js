class Character {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.vy = 0;
    this.gravity = 0.4;
    this.jumpForce = -10;
    this.speed = 5;
  }

  draw() {
    push();
    fill(221, 160, 221);
    ellipse(this.x + this.w / 2, this.y + this.h / 2, this.w, this.h);
    pop();
  }

  update() {
    this.vy += this.gravity;
    this.y += this.vy;

    if (keyIsDown(LEFT_ARROW)) {
      this.x -= this.speed;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += this.speed;
    }

    if (this.x > width) {
      this.x = -this.w;
    }
    if (this.x + this.w < 0) {
      this.x = width;
    }
  }

  isColliding(platform) {
    if (
      this.vy > 0 &&
      this.x + this.w > platform.x &&
      this.x < platform.x + platform.w &&
      this.y + this.h > platform.y &&
      this.y + this.h < platform.y + platform.h
    ) {
      return true;
    }
    return false;
  }

  jump() {
    this.vy = this.jumpForce;
  }
}