//Global Variables
let canvasWidth = 400;
let canvasHeight = 600;
let character;
let platforms = [];
let state = "start";
let score = 0;
let scrollOffset = 0; // Calculate the score

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  textAlign(CENTER);
  resetGame(); // Initialize game state
}

function resetGame() {
  score = 0;
  scrollOffset = 0;
  platforms = [];
  character = new Character(200, 400, 40, 40);// Character size 40x40
  platforms.push(new Platform(160, 500, 80, 15, 0));// Starting platform

  for (let i = 0; i < 7; i++) {
    let px = random(0, canvasWidth - 80);//Random x position
    let py = i * 75; //Evenly spaced y position
    let type = (random(1) < 0.2) ? 1 : (random(1) > 0.9 ? 2 : 0);
    platforms.push(new Platform(px, py, 80, 15, type));//Push platforms to array
  }
}

function draw() {
  if (state === "start") drawStartScreen();
  else if (state === "game") drawGame();
  else if (state === "gameover") drawGameOverScreen();
}

function drawStartScreen() {
  background(255, 192, 203); // Pink background
  fill(0); // Black text
  textSize(32);
  text("Doodle Jump", width / 2, height / 2 - 20);  // Game title
  textSize(16); 
  text("Click to Start", width / 2, height / 2 + 20); // Instructions
}

function drawGameOverScreen() {
  background(50);
  fill(255);
  textSize(32);
  text("Game Over", width / 2, height / 2 - 40);
  textSize(24);
  text("Score: " + score, width / 2, height / 2);
  textSize(16);
  text("Click to Restart", width / 2, height / 2 + 40);
}

function drawGame() {  // Main game loop
  background(255, 192, 203);
  
  // 1. Score and Scrolling
  let totalHeight = (400 - character.y) + scrollOffset;// Total height climbed
  score = max(score, Math.floor(totalHeight / 75)); // Each 75 pixels = 1 point
  
  // Display score
  textSize(24);
  fill(0);
  text("Score: " + score, 60, 40);

  if (character.y < 200) {
    let dy = 200 - character.y;
    character.y = 200;
    scrollOffset += dy;
    for (let p of platforms) p.y += dy;
  }

  // 2. Character
  character.update();
  character.draw();
  if (character.y > canvasHeight) state = "gameover";

  // 3. Platform
  for (let p of platforms) {
    p.update();
    p.draw();

    if (!p.isBroken && character.isColliding(p)) {
      character.jump();
      if (p.type === 2) p.isBroken = true;
    }

    if (p.y > canvasHeight) {
      p.y = -15;
      p.x = random(0, canvasWidth - 80);
      p.isBroken = false;
      p.type = (random(1) < 0.2) ? 1 : (random(1) > 0.9 ? 2 : 0);
    }
  }
}

function mousePressed() {
  if (state !== "game") {
    resetGame();
    state = "game";
  }
}