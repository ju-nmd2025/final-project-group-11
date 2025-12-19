class Character {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.vy = 0; // Vertical speed
    this.gravity = 0.4;
    this.jumpForce = -10;
    this.speed = 5; // Horizontal speed
  }

  draw() {
    push();
    translate(this.x + this.w / 2, this.y + this.h / 2); // Move the drawing point
    scale(this.w / 250); // Scale to fit size
    translate(-200, -200); // Offset to center drawing

    fill(255, 200, 50);
    strokeWeight(0);
    circle(200, 200, 250);

    fill(255);
    ellipse(150, 160, 80, 30);
    ellipse(250, 160, 80, 30);

    fill(0, 0, 0);
    circle(130, 160, 15);
    circle(225, 160, 15);

    stroke(0);
    strokeWeight(5);
    noFill();
    arc(140, 130, 60, 30, PI, TWO_PI);
    arc(260, 130, 60, 30, PI, TWO_PI);

    noFill();
    stroke(0);
    strokeWeight(5);
    arc(200, 250, 155, 90, 0, PI);

    fill(255, 150, 150, 150);
    noStroke();
    ellipse(120, 200, 50, 30);
    ellipse(280, 200, 50, 30);

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
      this.vy > 0 && //when falling
      this.x + this.w > platform.x && //Right edge past the platform's left edge
      this.x < platform.x + platform.w && //Left edge past the platform's right edge
      this.y + this.h > platform.y && //Bottom edge past the platform's top edge
      this.y + this.h < platform.y + platform.h  //Character above the platform's bottom edge
    ) {
      return true;
    }
    return false;
  }

  jump() {
    this.vy = this.jumpForce;
  }
}