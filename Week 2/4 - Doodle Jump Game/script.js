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

// Adding the game physics
let velocityX = 0; // Initial velocity before pressing left or right key





// Initializing the 'doodle' object
let doodle = {
    img: null,  // To hold image (for later purpose)
    // x,y are the co-ordinates of the board
    x: doodleX,
    y: doodleY,
    width: doodleWidth,
    height: doodleHeight
}


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

    // Calling the update function before the next re-paint of the browser window
    requestAnimationFrame(update);

    // Adding event listeners
    document.addEventListener("keydown", moveDoodle);

}

function update() {
    requestAnimationFrame(update);

    // CLearing the canvas each time we draw the doodle in order to avoid frames overlapping
    context.clearRect(0, 0, board.width, board.height)

    // Updating the values before drawing the doodle
    doodle.x += velocityX;
    // Loop to draw the doodle image each time the character moves
    context.drawImage(doodle.img, doodle.x, doodle.y, doodle.width, doodle.height);
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
}