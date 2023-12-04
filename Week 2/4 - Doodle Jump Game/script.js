// Setting up the canvas board
let board;
let boardWidth = 360;   // Background image has 360p width
let boardHeight = 576;  // Background image has 576p height
let context;


// Setting up the doodle character
let doodleWidth = 46;
let doodleHeight = 46;
// Setting up initial position of the doodle character (horizontally at center and vertically close to bottom)
let doodleX = (boardWidth/2) - (doodleWidth/2);
let doodleY = (boardHeight * (7/8)) - doodleHeight;
let doodleRightImg;
let doodleLeftImg;


// Initializing the 'doodle' object
let doodle = {
    img: null,  // To hold image (for later purpose)
    // x,y are the co-ordinates of the board
    x: doodleX,
    y: doodleY,
    width: doodleWidth,
    height: doodleHeight
}


// Adding the game physics
let velocityX = 0; // Initial velocity before pressing left or right key
let velocityY = 0;
let initialVelocityY = -5;
let gravity = 0.2; 


// Setting up platforms (creating an array because we need multiple platforms)
let platformArray = [];
let platformWidth = 60;
let platformHeight = 18;
let platformImg;


// Setting up the score system
let score = 0;
let maxScore = 0;


// When the game is over
let gameOver = false;


// Setting up the page when the window loads
window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d");   // Retrieves 2D rendering context to allow drawing operations on canvas

    // Drawing the doodle character
    // context.fillStyle = "red";
    // context.fillRect(doodle.x, doodle.y, doodle.width, doodle.height)

    // Loading the images
    doodleRightImg = new Image();
    doodleRightImg.src = "images/doodle_right.png";
    doodle.img = doodleRightImg;
    
    // Drawing character only after the image has been loaded
    doodleRightImg.onload = function() {
        context.drawImage(doodle.img, doodle.x, doodle.y, doodle.width, doodle.height);
    }

    // Loading the doodle character's left-side image
    doodleLeftImg = new Image();
    doodleLeftImg.src = "images/doodle_left.png";
    doodle.img = doodleLeftImg;

    // Loading the platform image
    platformImg = new Image();
    platformImg.src = "images/platform.png";

    velocityY = initialVelocityY;

    placePlatform(); // Calling the function to place platforms 

    // Calling the update function before the next re-paint of the browser window
    requestAnimationFrame(update);

    // Adding event listeners
    document.addEventListener("keydown", moveDoodle);
}


function update() {
    requestAnimationFrame(update);

    if (gameOver) {
        return;
    }

    // Clearing the canvas each time we draw the doodle in order to avoid frames overlapping
    context.clearRect(0, 0, board.width, board.height)

    // Updating the values before drawing the doodle
    doodle.x += velocityX;

    // For doodle to appear on the opposite side of the screen whenever it falls from one side
    if (doodle.x > board.width) {
        doodle.x = 0;
    }
    else if (doodle.x < 0) {
        doodle.x = board.width;
    }

    // Updating the Y-axis velocity with the application of gravity
    velocityY += gravity;

    // Updating the position of doodle in Y-axis
    doodle.y += velocityY;

    // Condition for the game to be over
    if (doodle.y > board.height) {
        gameOver = true;
    }

    // Loop to draw the doodle image each time the character moves
    context.drawImage(doodle.img, doodle.x, doodle.y, doodle.width, doodle.height);

    // Generating platforms
    for (let i=0; i<platformArray.length; i++) {
        let platform = platformArray[i];

        // Calling the function that shows platform just above the canvas, whenever the doodle jumps up form current screen view
        if (velocityY < 0 && doodle.y < boardHeight*3/4) {
            platform.y -= initialVelocityY; // Sliding the platforms down
        }

        if (detectCollision(doodle, platform) && velocityY >= 0) {
            velocityY = initialVelocityY;   // To jump off the platform (once landed)
        }
        context.drawImage(platform.img, platform.x, platform.y, platform.width, platform.height);
    }

    // Clearing the platforms and generating new ones when the screen is slid down
    while (platformArray.length > 0 && platformArray[0].y >= boardHeight) {
        platformArray.shift();  // Removing the first element from the array
        newPlatform();  // Function call to generate the new platforms
    }

    // Score update section
    updateScore();
    context.fillStyle = "red";
    context.font = "18px sans-seriff";
    context.fillText(score, 5, 20);

    // Game Over Screen
    if (gameOver) {
        context.fillText("GAME OVER (Press 'Space' to Restart)", boardWidth/7, boardHeight*7/8)
    }
}


// Function to move the doodle character left and right
function moveDoodle(e) {
    if (e.code == "ArrowLeft") {
        velocityX = -2; // Negative velocity to indicate opposite direction
        doodle.img = doodleLeftImg;
    }
    else if (e.code == "ArrowRight") {
        velocityX = 2;
        doodle.img = doodleRightImg;
    }
    // NOTE: velocity here is in terms of pixels per frame

    // Restarting the game
    else if (e.code == "Space" && gameOver) {
  
        doodle = {
            img: doodleRightImg,
            x: doodleX,
            y: doodleY,
            width: doodleWidth,
            height: doodleHeight
        }
        velocityX = 0;
        velocityY = initialVelocityY;
        score = 0;
        maxScore = 0;
        gameOver = false;
        placePlatform();
    }
}


// Function to place platforms
function placePlatform() {
    platformArray = [];

    // Starting platform
    let platform = {
        img: platformImg,
        x: boardWidth/2,
        y: boardHeight - 50,
        width: platformWidth,
        height: platformHeight
    }
    platformArray.push(platform);   

    // Loop to generate other platforms
    for (let i=0; i<8; i++) {
        let randomX = Math.floor(Math.random() * boardWidth * (3/4));   // Random X-position of the platform
        let platform = {
            img: platformImg,
            x: randomX,
            y: boardHeight - 75*i - 150,
            width: platformWidth,
            height: platformHeight
        }
        platformArray.push(platform);
    }
    
}


// This platform exists just above the canvas so whenever we slide up above, this becomes visible
function newPlatform() {
    let randomX = Math.floor(Math.random() * boardWidth * (3/4));   // Random X-position of the platform
    let platform = {
        img: platformImg,
        x: randomX,
        y: -platformHeight,
        width: platformWidth,
        height: platformHeight
    }
    platformArray.push(platform);
}


// Function to detect collision between doodle character and the platform (so, that the doodle can sit on the platdform)
function detectCollision(a, b)  {
    return a.x < b.x + b.width &&   // a's top-left doesn't reach b's top-right
           a.x + a.width > b.x &&   // a's top-right passes b's top-left
           a.y < b.y + b.height &&  // a's top-left doesn't reach b's bottom-left
           a.y + a.height > b.y;    // a's bottom-left passes b's top-left
}


// Defining the score update function
function updateScore() {
    let point = Math.floor(4*Math.random());   // Generates a floating number between O and 4 (excl. 4) which is rounded to lower number
    if (velocityY <  0) {   // Meaning when doodle is going up (-ve velocity means going up)
        maxScore += point;
        if (score < maxScore) {
            score = maxScore
        }
    }
    else if (velocityY >= 0) {
        maxScore -= point;  // Going downward means losing points
    }
}


/*
NOTE (FOR VELOCITY IN Y-AXIS)
................................................................................
The co-ordinates of the board are as:
top left: 0,0
top right: 360,0
bottom left: 0,576
bottom right: 360, 576

So, for up and down movement i.e. in height (Y-axis),
moving upward means going towards 0. Hence, velocity is negative.
Similarly, downward means towards maximum value. Hence, positive velocity.
upward and downward is denoted by 'velocityY' (Y-axis)
*/
