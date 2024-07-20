window.onload = function () {
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");
  console.log(startButton);

  startButton.addEventListener("click", function () {
    startGame();
  });

  function startGame() {
    console.log("start");
    game = new Game();

    game.start();
  }

  restartButton.addEventListener("click", function () {
    restartGame();
  });

  function restartGame() {
    console.log("restart");
    game = new Game();

    document.getElementById("game-end").style.display = "none";

    game.start();
  }

  function handleKeyDown(event) {
    const key = event.key;
    const possibleKeystrokes = [
      "ArrowLeft",
      "ArrowUp",
      "ArrowRight",
      "ArrowDown",
      "w",
      "a",
      "s",
      "d",
    ];

    if (possibleKeystrokes.includes(key)) {
      event.preventDefault();
      switch (key) {
        case "ArrowUp":
        case "w":
          game.player.directionY = -1;
          break;
        case "ArrowDown":
        case "s":
          game.player.directionY = 1;
          break;
        case "ArrowLeft":
        case "a":
          game.player.directionX = -1;
          break;
        case "ArrowRight":
        case "d":
          game.player.directionX = 1;
          break;
      }
    }
  }

  window.addEventListener("keydown", handleKeyDown);
};
