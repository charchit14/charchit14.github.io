// Setting up the ground
let ground;
let groundWidth = 1320;
let groundHeight = 660;

// Getting the canvas element by its ID
ground = document.getElementById('ground');

// Setting the width and height attributes of the canvas
ground.width = groundWidth;
ground.height = groundHeight;

// Getting the 2D rendering context of the canvas
let ctx = ground.getContext('2d');

function drawGround() {
    // Drawing a white center line
    ctx.beginPath();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 3;
    ctx.moveTo(groundWidth / 2, 0); // Starting point
    ctx.lineTo(groundWidth / 2, groundHeight);  // Ending point
    ctx.stroke();

    // Drawing center point at the center line
    ctx.beginPath();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 3;
    ctx.moveTo(groundWidth / 2 - 10, groundHeight / 2);
    ctx.lineTo(groundWidth / 2 + 10, groundHeight / 2);
    ctx.stroke();

    // Defining goal post's dimensions and positions
    let goalPostWidth = 24;
    let goalPostHeight = 120;
    let goalPostOffset = 0; // Distance from the edges

    // Drawing left goal post
    ctx.fillStyle = 'white';
    ctx.fillRect(goalPostOffset, (groundHeight - goalPostHeight) / 2, goalPostWidth, goalPostHeight);

    // Drawing right goal post
    ctx.fillRect(groundWidth - goalPostOffset - goalPostWidth, (groundHeight - goalPostHeight) / 2, goalPostWidth, goalPostHeight);
}

// Defining and designing the football
let ballX = groundWidth / 2;
let ballY = groundHeight / 2;
const ballRadius = 10;
let ballVelocityX = Math.random() > 0.5 ? 2 : -2; // Random initial X-direction
let ballVelocityY = Math.random() > 0.5 ? 2 : -2; // Random initial Y-direction

function drawCircle() {
    // Clearing the canvas to avoid overlapping of the frames
    ctx.clearRect(0, 0, groundWidth, groundHeight);

    // Redraw the ground elements
    drawGround();

    // Drawing the ball
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'yellow';
    ctx.fill();
    ctx.closePath();

    // Updating the circle position
    ballX += ballVelocityX;
    ballY += ballVelocityY;

    // Checking the boundary collision
    if (ballX + ballRadius > groundWidth || ballX - ballRadius < 0) {
        ballVelocityX *= -1; // Reversing the X-direction
    }
    if (ballY + ballRadius > groundHeight || ballY - ballRadius < 0) {
        ballVelocityY *= -1; // Reversing the Y-direction
    }

    requestAnimationFrame(drawCircle);
}

// Start the animation
drawCircle();















// // Setting up the players
// // Define player column properties
// let columnWidth = 20; // Width of each player (column)
// let columnGap = 48;    // Gap between columns
// let columnCount = 4;   // Number of columns
// let playerHeight = 30; // Height of each player

// // Calculate total width occupied by columns and gaps
// let totalColumnsWidth = columnCount * columnWidth + (columnCount - 1) * columnGap;

// // Calculate the starting position for the columns on the left side
// let startXLeft = (groundWidth / 2 - totalColumnsWidth) / 2;

// // Draw four columns of sky blue players on the left side
// for (let i = 0; i < columnCount; i++) {
//     let columnX = startXLeft + i * (columnWidth + columnGap);

//     // Draw a sky blue player rectangle in each column on the left side
//     ctx.fillStyle = 'skyblue';
//     ctx.fillRect(columnX, (groundHeight - playerHeight) / 2, columnWidth, playerHeight);
// }

// // Calculate the starting position for the columns on the right side
// let startXRight = groundWidth / 2 + (groundWidth / 2 - totalColumnsWidth) / 2;

// // Draw four columns of red players on the right side
// for (let i = 0; i < columnCount; i++) {
//     let columnX = startXRight + i * (columnWidth + columnGap);

//     // Draw a red player rectangle in each column on the right side
//     ctx.fillStyle = 'red';
//     ctx.fillRect(columnX, (groundHeight - playerHeight) / 2, columnWidth, playerHeight);
// }
