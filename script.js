/** @type {HTMLCanvasElement} */

const canvas1 = document.getElementById("canvas1");
const ctx1 = canvas1.getContext("2d");
const numberOfEnemies1 = 50;
const enemies1 = [];

const canvas2 = document.getElementById("canvas2");
const ctx2 = canvas2.getContext("2d");
const numberOfEnemies2 = 25;
const enemies2 = [];

CANVAS_WIDTH = canvas1.width = canvas2.width = 500;
CANVAS_HEIGHT = canvas1.height = canvas2.height = 1000;

let gameFrame = 0;
class Enemy {
  constructor(imageScr, spriteWidth, spriteHeight) {
    this.image = new Image();
    this.image.src = imageScr;
    this.spriteWidth = spriteWidth;
    this.spriteHeight = spriteHeight;
    this.width = this.spriteWidth / 2.5;
    this.height = this.spriteHeight / 2.5;
    this.x = Math.random() * (CANVAS_WIDTH - this.width);
    this.y = Math.random() * (CANVAS_HEIGHT - this.height);
    this.frame = 0;
    this.flapSpeed = Math.floor(Math.random() * 3 + 1);
  }
}

class FlappingEnemy extends Enemy {
  constructor(imageScr, spriteWidth, spriteHeight) {
    super(imageScr, spriteWidth, spriteHeight);
    this.image.src = "/assets/enemy1.png";
  }
  update() {
    this.x += Math.random() * 5 - 2.5;
    this.y += Math.random() * 5 - 2.5;
    if (gameFrame % this.flapSpeed === 0) {
      this.frame > 4 ? (this.frame = 0) : this.frame++;
    }
  }
  draw() {
    ctx1.drawImage(
      this.image,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

class WigglyEnemy extends Enemy {
  constructor(imageScr, spriteWidth, spriteHeight) {
    super(imageScr, spriteWidth, spriteHeight);
    this.speed = Math.random() * 4 + 1;
    this.angle = Math.random() * 2;
    this.angleSpeed = Math.random() * 0.2;
    this.curve = Math.random() * 7;
  }
  update() {
    this.x -= this.speed;
    this.y += this.curve * Math.sin(this.angle);
    this.angle += this.angleSpeed;
    if (this.x + this.width < 0) {
      this.x = CANVAS_WIDTH;
    }
    if (gameFrame % this.flapSpeed === 0) {
      this.frame > 4 ? (this.frame = 0) : this.frame++;
    }
  }
  draw() {
    ctx2.drawImage(
      this.image,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

for (let i = 0; i < numberOfEnemies1; i++) {
  enemies1.push(new FlappingEnemy("/assets/enemy1.png", 293, 155));
}
for (let i = 0; i < numberOfEnemies2; i++) {
  enemies2.push(new WigglyEnemy("/assets/enemy2.png", 266, 188));
}

function animate() {
  ctx1.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  enemies1.forEach((enemy) => {
    enemy.update();
    enemy.draw();
  });
  ctx2.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  enemies2.forEach((enemy) => {
    enemy.update();
    enemy.draw();
  });
  gameFrame++;
  requestAnimationFrame(animate);
}
animate();
