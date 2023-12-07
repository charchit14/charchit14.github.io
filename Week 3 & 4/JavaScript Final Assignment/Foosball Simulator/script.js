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

// Defining and designing the football
let ballX = groundWidth / 2;
let ballY = groundHeight / 2;
const ballRadius = 10;
let ballVelocity = 2;
let ballVelocityX = Math.random() > 0.5 ? ballVelocity : -ballVelocity; // Random initial X-direction
let ballVelocityY = Math.random() > 0.5 ? ballVelocity : -ballVelocity; // Random initial Y-direction

// Defining goal post's dimensions and positions
let goalPostWidth = 24;
let goalPostHeight = 120;
let goalPostOffset = 0; // Distance from the edges

// Scores for both teams
let leftTeamScore = 0;
let rightTeamScore = 0;

// Function to draw players
function drawPlayers(color, startX, startY, count) {
    ctx.fillStyle = color;
    const playerWidth = 12;
    const playerHeight = 60;
    const gap = 80; // Gap between players

    for (let i = 0; i < count; i++) {
        ctx.fillRect(startX, startY + i * (playerHeight + gap), playerWidth, playerHeight);
    }
}

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
    
    // Drawing players for Blue Team
    drawPlayers('skyblue', 50, 300, 1); // 1 player (Goalkeeper) (color, closeness to center, sideways)
    drawPlayers('skyblue', 200, 190, 3); // 3 players (Defenders)
    drawPlayers('skyblue', 525, 110, 4); // 4 players (Midfielders)
    drawPlayers('skyblue', 950, 190, 3); // 3 players (Forwarders)

    // Drawing players for Red Team
    drawPlayers('red', groundWidth - 60, 300, 1); // 1 player (Goalkeeper)
    drawPlayers('red', groundWidth - 200, 190, 3); // 3 players (Defenders)
    drawPlayers('red', groundWidth - 525, 110, 4); // 4 players (Midfielders)
    drawPlayers('red', groundWidth - 950, 190, 3); // 3 players (Forwarders)

    // Drawing left goal post
    ctx.fillStyle = 'white';
    ctx.fillRect(goalPostOffset, (groundHeight - goalPostHeight) / 2, goalPostWidth, goalPostHeight);

    // Drawing right goal post
    ctx.fillRect(groundWidth - goalPostOffset - goalPostWidth, (groundHeight - goalPostHeight) / 2, goalPostWidth, goalPostHeight);

    // Displaying scores
    ctx.fillStyle = 'white';
    ctx.font = '18px Arial';
    ctx.fillText(`Blue Team: ${leftTeamScore}`, 20, 40);
    ctx.fillText(`Red Team: ${rightTeamScore}`, groundWidth - 140, 40);
}


// Checkingm















function checkGoalCollision() {
    if (
        (ballX - ballRadius < goalPostWidth && ballY > (groundHeight - goalPostHeight) / 2 && ballY < (groundHeight + goalPostHeight) / 2) ||
        (ballX + ballRadius > groundWidth - goalPostWidth && ballY > (groundHeight - goalPostHeight) / 2 && ballY < (groundHeight + goalPostHeight) / 2)
    ) {
        // Ball has entered the left or right goal post area
        if (ballX - ballRadius < goalPostWidth) {
            rightTeamScore++; // Right team scored
            ballVelocityX = -ballVelocity; // Ball moves towards the left (Blue Team)
        } else {
            leftTeamScore++; // Left team scored
            ballVelocityX = ballVelocity; // Ball moves towards the right (Red Team)
        }
        // Reset ball to the center
        ballX = groundWidth / 2;
        ballY = groundHeight / 2;
        ballVelocityY = Math.random() > 0.5 ? ballVelocity : -ballVelocity; // Randomize Y-direction for the next movement
    }
}

function drawCircle() {
    // Clearing the canvas to avoid overlapping of the frames
    ctx.clearRect(0, 0, groundWidth, groundHeight);

    // Redrawing the ground elements
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

    // Boundary collision check
    if (ballX + ballRadius > groundWidth || ballX - ballRadius < 0) {
        ballVelocityX *= -1; // Reverse the X-direction
    }
    if (ballY + ballRadius > groundHeight || ballY - ballRadius < 0) {
        ballVelocityY *= -1; // Reverse the Y-direction
    }

    // Check for goal collision
    checkGoalCollision();

    requestAnimationFrame(drawCircle);
}

// Start the animation
drawCircle();
