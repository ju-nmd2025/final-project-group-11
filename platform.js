class Platform {
  constructor(x, y, w, h, type) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.type = type; // 0: normal, 1: moving, 2: breakable
    this.vx = 2; // Horizontal speed for moving platforms
    this.isBroken = false; //Broken state for breakable platforms
  }

  draw() {
    if (this.isBroken) return;

    push();
    if (this.type === 1) {
      fill("blue"); // Moving platform
    } else if (this.type === 2) {
      fill("red"); // Breakable platform
    } else {
      fill("purple"); // Normal platform
    }
    rect(this.x, this.y, this.w, this.h);
    pop();
  }

  update() {
    // Update position for moving platforms
    if (this.type === 1) {
      this.x += this.vx;
      if (this.x < 0 || this.x + this.w > width) {
        this.vx *= -1;
      }
    }
  }
}
