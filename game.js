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

class Platform {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  draw() {
    push();
    fill("purple");
    rect(this.x, this.y, this.w, this.h);
    pop();
  }
}

let canvasWidth = 400;
let canvasHeight = 600;
let character;
let platforms = [];

function setup() {
  createCanvas(canvasWidth, canvasHeight);

  character = new Character(200, 500, 40, 40);

  for (let i = 0; i < 6; i++) {
    let px = random(0, canvasWidth - 80);
    let py = i * 100;
    platforms.push(new Platform(px, py, 80, 15));
  }
}

function draw() {
  background(255, 192, 203);

  character.update();
  character.draw();

  for (const platform of platforms) {
    platform.draw();

    if (character.isColliding(platform)) {
      character.jump();
    }
  }

  if (character.y > canvasHeight) {
    character.y = 0;
    character.vy = 0;
  }
}
