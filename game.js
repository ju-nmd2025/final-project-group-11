let canvasWidth = 400;
let canvasHeight = 600;
let character;
let platforms = [];

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  resetGame();
}

function resetGame() {
  platforms = [];

  character = new Character(200, 400, 40, 40);

  platforms.push(new Platform(160, 500, 80, 15));

  for (let i = 0; i < 7; i++) {
    let px = random(0, canvasWidth - 80);
    let py = i * 75; 
    platforms.push(new Platform(px, py, 80, 15));
  }
}

function draw() {
  background(255, 192, 203);

  character.update();
  character.draw();

  if (character.y < 200) {
    let dy = 200 - character.y;
    character.y = 200;
    for (const platform of platforms) {
      platform.y += dy;
    }
  }

  for (const platform of platforms) {
    platform.draw();

    if (character.isColliding(platform)) {
      character.jump();
    }

    if (platform.y > canvasHeight) {
      platform.y = -15;
      platform.x = random(0, canvasWidth - 80);
    }
  }

  if (character.y > canvasHeight) {
    resetGame();
  }
}