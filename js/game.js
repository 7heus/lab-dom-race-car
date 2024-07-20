class Game {
  constructor() {
    // Get the start screen and game screen elements
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.gameEndScreen = document.getElementById("game-end");
    this.livesCounter = document.getElementById("lives-counter");
    this.scoreCounter = document.getElementById("score-counter");

    // Set the height and width of the game screen
    this.height = 600;
    this.width = 500;
    this.player = new Player(
      this.gameScreen,
      225,
      500,
      100,
      150,
      "./images/car.png"
    );
    this.gameIntervalId;
    this.gameIsOver = false;
    // Array to store obstacles
    this.obstacles = [];
    this.score = 0;
    this.lives = 3;

    this.gameLoopFrequency = Math.round(1000 / 60); // 60fps
  }

  start() {
    // Set the height and width of the game screen
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;

    // Hide start screen & show game screen
    this.startScreen.style.display = "none";
    this.gameScreen.style.display = "block";

    this.gameIntervalId = setInterval(() => {
      this.gameLoop();
    }, this.gameLoopFrequency);
  }

  gameLoop() {
    this.update();
    console.log("loopin");
    if (this.gameIsOver) {
      clearInterval(this.gameIntervalId);
    }
  }

  endGame() {
    this.gameIsOver = true;
    this.player.element.remove();
    this.obstacles.forEach((obstacle) => {
      obstacle.element.remove();
    });
    this.gameScreen.style.display = "none";
    this.gameEndScreen.style.display = "block";
  }

  update() {
    //move player
    this.player.move();

    // Check if the player has collided with any obstacles & if they are still on screen
    this.obstacles.forEach((obstacle) => {
      obstacle.move();
      if (this.player.didCollide(obstacle)) {
        this.lives--;
        obstacle.element.remove();
        this.obstacles.splice(this.obstacles.indexOf(obstacle), 1);
      }

      if (obstacle.top > this.height) {
        this.score++;
        obstacle.element.remove();
        this.obstacles.splice(this.obstacles.indexOf(obstacle), 1);
      }

      /*     for (let i = 0; i < this.obstacles.length; i++) {
      const obstacle = this.obstacles[i];
      obstacle.move();

      if (obstacle.top > this.height) {
        this.score++;
        obstacle.element.remove();
        this.obstacles.splice(i, 1);
        i--;
      }
    } */
    });

    if (this.lives === 0) {
      this.endGame();
    }

    // Create a new obstacle based on random probability
    // when there is no other obstacles on screen
    if (Math.random() > 0.98 && this.obstacles.length < 1) {
      this.obstacles.push(new Obstacle(this.gameScreen));
    }
  }
}
