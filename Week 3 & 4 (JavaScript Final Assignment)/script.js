// Global Variables
var DIRECTION = {
  IDLE: 0,
  UP: 1,
  DOWN: 2,
  LEFT: 3,
  RIGHT: 4,
};

var rounds = [5, 4, 4, 3, 3];
var colors = ["#1ABC9C", "#A9A9A9", "#023020", "#8C52FF", "#9B59B6"];

// The ball object (The cube that bounces back and forth)
var Ball = {
  new: function (incrementedSpeed) {
    return {
      width: 20,
      height: 20,
      x: this.canvas.width / 2 - 9,
      y: this.canvas.height / 2 - 9,
      moveX: DIRECTION.IDLE,
      moveY: DIRECTION.IDLE,
      speed: incrementedSpeed || 7,
    };
  },
};

// The ai object (The two lines that move up and down)
var Ai = {
  new: function (side) {
    return {
      width: 18, // Width of the players
      height: 120, // Height of the players
      x: side === "left" ? 100 : this.canvas.width - 100, // Distance from edge for player and AI re
      y: this.canvas.height / 2 - 35,
      score: 0,
      move: DIRECTION.IDLE,
      speed: 8,
    };
  },
};

var Game = {
  initialize: function () {
    this.canvas = document.querySelector("canvas");
    this.context = this.canvas.getContext("2d");

    this.canvas.width = 2600;
    this.canvas.height = 1400;

    this.canvas.style.width = this.canvas.width / 2 + "px";
    this.canvas.style.height = this.canvas.height / 2 + "px";

    this.player = Ai.new.call(this, "left"); // Player is on the left side
    this.ai = Ai.new.call(this, "right");   // AI is on the right side
    this.ball = Ball.new.call(this);

    this.ai.speed = 5;
    this.running = this.over = false;
    this.turn = this.ai;
    this.timer = this.round = 0;
    this.color = "#8c52ff";

    Foosball.menu();
    Foosball.listen();
  },

  endGameMenu: function (text) {
    // Change the canvas font size and color
    Foosball.context.font = "45px Courier New";
    Foosball.context.fillStyle = this.color;

    // Draw the rectangle behind the 'Press Any Key To Begin' text
    Foosball.context.fillRect(
      Foosball.canvas.width / 2 - 350,
      Foosball.canvas.height / 2 - 48,
      700,
      100
    );

    // Change the canvas color;
    Foosball.context.fillStyle = "#ffffff";

    // Draw the end game menu text ('Game Over' and 'Winner')
    Foosball.context.fillText(
      text,
      Foosball.canvas.width / 2,
      Foosball.canvas.height / 2 + 15
    );

    setTimeout(function () {
      Foosball = Object.assign({}, Game);
      Foosball.initialize();
    }, 3000);
  },

  menu: function () {
    // Draw all the Foosball objects in their current state
    Foosball.draw();

    // Change the canvas font size and color
    this.context.font = "50px Courier New";
    this.context.fillStyle = this.color;

    // Draw the rectangle behind the 'Press any key to begin' text.
    this.context.fillRect(
      this.canvas.width / 2 - 350,
      this.canvas.height / 2 - 48,
      700,
      100
    );

    // Change the canvas color;
    this.context.fillStyle = "#ffffff";

    // Draw the 'press any key to begin' text
    this.context.fillText(
      "Press Any Key To Begin",
      this.canvas.width / 2,
      this.canvas.height / 2 + 15
    );
  },

  // Update all objects (move the player, ai, ball, increment the score, etc.)
  update: function () {
    if (!this.over) {
      // If the ball collides with the bound limits - correct the x and y coords.
      if (this.ball.x <= 0) Foosball._resetTurn.call(this, this.ai, this.player);
      if (this.ball.x >= this.canvas.width - this.ball.width)
        Foosball._resetTurn.call(this, this.player, this.ai);
      if (this.ball.y <= 0) this.ball.moveY = DIRECTION.DOWN;
      if (this.ball.y >= this.canvas.height - this.ball.height)
        this.ball.moveY = DIRECTION.UP;

      // Move player if they player.move value was updated by a keyboard event
      if (this.player.move === DIRECTION.UP) this.player.y -= this.player.speed;
      else if (this.player.move === DIRECTION.DOWN)
        this.player.y += this.player.speed;

      // On new serve (start of each turn) move the ball to the correct side
      // and randomize the direction to add some challenge.
      if (Foosball._turnDelayIsOver.call(this) && this.turn) {
        this.ball.moveX =
          this.turn === this.player ? DIRECTION.LEFT : DIRECTION.RIGHT;
        this.ball.moveY = [DIRECTION.UP, DIRECTION.DOWN][
          Math.round(Math.random())
        ];
        this.ball.y =
          Math.floor(Math.random() * this.canvas.height - 200) + 200;
        this.turn = null;
      }

      // If the player collides with the bound limits, update the x and y coords.
      if (this.player.y <= 0) this.player.y = 0;
      else if (this.player.y >= this.canvas.height - this.player.height)
        this.player.y = this.canvas.height - this.player.height;

      // Move ball in intended direction based on moveY and moveX values
      if (this.ball.moveY === DIRECTION.UP)
        this.ball.y -= this.ball.speed / 1.5;
      else if (this.ball.moveY === DIRECTION.DOWN)
        this.ball.y += this.ball.speed / 1.5;
      if (this.ball.moveX === DIRECTION.LEFT) this.ball.x -= this.ball.speed;
      else if (this.ball.moveX === DIRECTION.RIGHT)
        this.ball.x += this.ball.speed;

      // Handle ai (AI) UP and DOWN movement
      if (this.ai.y > this.ball.y - this.ai.height / 2) {
        if (this.ball.moveX === DIRECTION.RIGHT)
          this.ai.y -= this.ai.speed / 1.5;
        else this.ai.y -= this.ai.speed / 4;
      }
      if (this.ai.y < this.ball.y - this.ai.height / 2) {
        if (this.ball.moveX === DIRECTION.RIGHT)
          this.ai.y += this.ai.speed / 1.5;
        else this.ai.y += this.ai.speed / 4;
      }

      // Handle ai (AI) wall collision
      if (this.ai.y >= this.canvas.height - this.ai.height)
        this.ai.y = this.canvas.height - this.ai.height;
      else if (this.ai.y <= 0) this.ai.y = 0;

      // Handle Player-Ball collisions
      if (
        this.ball.x - this.ball.width <= this.player.x &&
        this.ball.x >= this.player.x - this.player.width
      ) {
        if (
          this.ball.y <= this.player.y + this.player.height &&
          this.ball.y + this.ball.height >= this.player.y
        ) {
          this.ball.x = this.player.x + this.ball.width;
          this.ball.moveX = DIRECTION.RIGHT;
        }
      }

      // Handle ai-ball collision
      if (
        this.ball.x - this.ball.width <= this.ai.x &&
        this.ball.x >= this.ai.x - this.ai.width
      ) {
        if (
          this.ball.y <= this.ai.y + this.ai.height &&
          this.ball.y + this.ball.height >= this.ai.y
        ) {
          this.ball.x = this.ai.x - this.ball.width;
          this.ball.moveX = DIRECTION.LEFT;
        }
      }
    }

    // Handle the end of round transition
    // Check to see if the player won the round.
    if (this.player.score === rounds[this.round]) {
      // Check to see if there are any more levels left and display the victory screen if not
      if (!rounds[this.round + 1]) {
        this.over = true;
        setTimeout(function () {
          Foosball.endGameMenu("Congratulations! You Won.");
        }, 1000);
      } 
      else {
        // If there is another level, reset all the values and increment the round number
        this.color = this._generateRoundColor();
        this.player.score = this.ai.score = 0;
        this.player.speed += 0.5;
        this.ai.speed += 1;
        this.ball.speed += 1;
        this.round += 1;
      }
    }

    // Check to see if the AI has won the round.
    else if (this.ai.score === rounds[this.round]) {
      this.over = true;
      setTimeout(function () {
        Foosball.endGameMenu("Game Over! You Lost.");
      }, 1000);
    }
  },

  // Draw the objects to the canvas element
  draw: function () {
    // Clear the Canvas
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Set the fill style to black
    this.context.fillStyle = this.color;

    // Draw the background
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Set the fill for player
    this.context.fillStyle = "skyblue"; // Color for player

    // Draw the Player
    this.context.fillRect(this.player.x, this.player.y, this.player.width, this.player.height);

    // Set the fill style for AI
    this.context.fillStyle = "red"; // Color for AI

    // Draw the Ai
    this.context.fillRect(this.ai.x, this.ai.y, this.ai.width, this.ai.height);

    // Draw the Ball (Circle)
    if (Foosball._turnDelayIsOver.call(this)) {
        this.context.beginPath();
        this.context.arc(
            this.ball.x + this.ball.width / 2, // X-coordinate of the center of the circle
            this.ball.y + this.ball.height / 2, // Y-coordinate of the center of the circle
            this.ball.width, // Radius of the circle
            0, // Start angle
            Math.PI * 2 // End angle (full circle)
        );
        this.context.fillStyle = 'yellow'; // Color for the ball
        this.context.fill();
    }

    // Draw the net (Line in the middle)
    this.context.beginPath();
    this.context.setLineDash([]);
    this.context.moveTo(this.canvas.width / 2, this.canvas.height - 140);
    this.context.lineTo(this.canvas.width / 2, 140);
    this.context.lineWidth = 10; // Increase the line width for a bold line
    this.context.strokeStyle = "#ffffff"; // Set the line color to white
    this.context.stroke();

    // Draw the small horizontal line at the center
    this.context.beginPath();
    this.context.moveTo(this.canvas.width / 2 - 15, this.canvas.height / 2);
    this.context.lineTo(this.canvas.width / 2 + 15, this.canvas.height / 2);
    this.context.lineWidth = 8; // Adjust the line width as needed
    this.context.stroke();

    // Calculate the coordinates for the center circle of the football ground
    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;

    // Drawing a circle at the center of the football ground
    const circleRadius = 200; // Adjust the radius of the circle as needed
    this.context.beginPath();
    this.context.arc(centerX, centerY, circleRadius, 0, Math.PI * 2);
    this.context.lineWidth = 10; // Adjust the line width of the circle
    this.context.strokeStyle = "#ffffff"; // Set the color of the circle
    this.context.stroke();

    // Calculate the midpoint of the ground
    const groundMidPoint = this.canvas.height / 2;

    // Calculate the midpoint of the goal posts
    const goalPostMidPoint = 150 + 20; // 150 is the x-coordinate of the left goal post and 20 is half of its width

    // Calculate the gap between the midpoint of the ground and the midpoint of the goal posts
    const gap = groundMidPoint - goalPostMidPoint;

    // Adjust the position of the left goal post and draw it
    this.context.fillStyle = "#ffffff"; // Set color for the goal post
    this.context.fillRect(0, groundMidPoint - 150, 40, 300);

    // Adjust the position of the right goal post and draw it
    this.context.fillStyle = "#ffffff"; // Set color for the goal post
    this.context.fillRect(this.canvas.width - 40, groundMidPoint - 150, 40, 300);

    // Calculate D-box dimensions
    const dBoxWidth = 180;
    const dBoxHeight = 460;
    const dBoxGap = 20;

    // Draw the left D-box outline
    this.context.beginPath();
    this.context.setLineDash([]);
    this.context.moveTo(0, groundMidPoint - dBoxHeight / 2); // Top-left corner of the D-box
    this.context.lineTo(dBoxWidth, groundMidPoint - dBoxHeight / 2); // Top-right corner of the D-box
    this.context.lineTo(dBoxWidth, groundMidPoint + dBoxHeight / 2); // Bottom-right corner of the D-box
    this.context.lineTo(0, groundMidPoint + dBoxHeight / 2); // Bottom-left corner of the D-box
    this.context.closePath();
    this.context.lineWidth = 5;
    this.context.strokeStyle = "#ffffff";
    this.context.stroke();

    // Draw the right D-box outline
    this.context.beginPath();
    this.context.moveTo(this.canvas.width, groundMidPoint - dBoxHeight / 2); // Top-right corner of the D-box
    this.context.lineTo(this.canvas.width - dBoxWidth, groundMidPoint - dBoxHeight / 2); // Top-left corner of the D-box
    this.context.lineTo(this.canvas.width - dBoxWidth, groundMidPoint + dBoxHeight / 2); // Bottom-left corner of the D-box
    this.context.lineTo(this.canvas.width, groundMidPoint + dBoxHeight / 2); // Bottom-right corner of the D-box
    this.context.closePath();
    this.context.lineWidth = 5;
    this.context.strokeStyle = "#ffffff";
    this.context.stroke();

    // Set the default canvas font and align it to the center
    this.context.font = "100px Courier New";
    this.context.textAlign = "center";

    // Draw the players score (left)
    this.context.font = "bold 100px sans-seriff";
    this.context.fillText(
      this.player.score.toString(),
      50, // X-coordinate for score to be at top left
      100 // Y-coordinate for score to be at top right
    );

    // Draw the paddles score (right)
    this.context.font = "bold 100px sans-seriff";
    this.context.fillText(
      this.ai.score.toString(),
      this.canvas.width - 100, // X-coordindate for score to be at top right
      100 // Y-coordinate for score to be at top right
    );

    // Change the font size for the center score text
    this.context.font = "bold 45px sans-seriff";

    // Draw the winning score (center)
    this.context.fillText(
      "Current Level: " + (Foosball.round + 1),
      this.canvas.width / 2,
      50
    );

    // Draw the current round number
    this.context.font = "33px sans-seriff";
    this.context.fillText(
      `Score ${
        rounds[Foosball.round] ? rounds[Foosball.round] : rounds[Foosball.round - 1]
      } goals to win`,
      this.canvas.width / 2,
      110 // Adjust the Y-coordinate as needed for positioning
    );
  },

  loop: function () {
    Foosball.update();
    Foosball.draw();

    // If the game is not over, draw the next frame.
    if (!Foosball.over) requestAnimationFrame(Foosball.loop);
  },

  listen: function () {
    document.addEventListener("keydown", function (key) {
      // Handle the 'Press any key to begin' function and start the game.
      if (Foosball.running === false) {
        Foosball.running = true;
        window.requestAnimationFrame(Foosball.loop);
      }

      // Handle up arrow and w key events
      if (key.keyCode === 38 || key.keyCode === 87)
        Foosball.player.move = DIRECTION.UP;

      // Handle down arrow and s key events
      if (key.keyCode === 40 || key.keyCode === 83)
        Foosball.player.move = DIRECTION.DOWN;
    });

    // Stop the player from moving when there are no keys being pressed.
    document.addEventListener("keyup", function (key) {
      Foosball.player.move = DIRECTION.IDLE;
    });
  },

  // Reset the ball location, the player turns and set a delay before the next round begins.
  _resetTurn: function (victor, loser) {
    this.ball = Ball.new.call(this, this.ball.speed);
    this.turn = loser;
    this.timer = new Date().getTime();

    victor.score++;
  },

  // Wait for a delay to have passed after each turn.
  _turnDelayIsOver: function () {
    return new Date().getTime() - this.timer >= 1000;
  },

  // Select a random color as the background of each level/round.
  _generateRoundColor: function () {
    var newColor = colors[Math.floor(Math.random() * colors.length)];
    if (newColor === this.color) return Foosball._generateRoundColor();
    return newColor;
  },
};

var Foosball = Object.assign({}, Game);
Foosball.initialize();
