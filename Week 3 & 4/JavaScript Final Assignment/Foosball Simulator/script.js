// Setting up the ground
let ground;
let groundWidth = 1320;
let groundHeight = 660;

// Defining player movement variables
let blueTeamY = 0; // Initial position for the blue team
let redTeamY = 0; // Initial position for the red team
const playerMoveSpeed = 10; // Speed at which players move

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


// Event listener for key press
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowUp' && blueTeamY > 0) {
        blueTeamY -= playerMoveSpeed; // Move the blue team up
    } 
    else if (event.key === 'ArrowDown' && blueTeamY < groundHeight - 60) {
        blueTeamY += playerMoveSpeed; // Move the blue team down
    } 
    else if (event.key === 'w' && redTeamY > 0) {
        redTeamY -= playerMoveSpeed; // Move the red team up
    } 
    else if (event.key === 's' && redTeamY < groundHeight - 60) {
        redTeamY += playerMoveSpeed; // Move the red team down
    }
});


// Function to check collision between players and the ball
function checkPlayerBallCollision(playerX, playerY, playerWidth, playerHeight) {
    // Calculate the distance between the ball and the center of the player
    const distX = Math.abs(ballX - (playerX + playerWidth / 2));
    const distY = Math.abs(ballY - (playerY + playerHeight / 2));

    // Checking if the distance is less than the sum of the radii of ball and player (collision)
    if (distX <= ballRadius + playerWidth / 2 && distY <= ballRadius + playerHeight / 2) {
        
        // Collision occurred between ball and player so Change the ball's direction based on the collision
        ballVelocityX *= -1; // Reverse the X-direction of the ball
        ballVelocityY *= -1; // Reverse the Y-direction of the ball
    }
}


// drawPlayers function to include collision detection and  players movement
function drawPlayers(color, startX, startY, count) {
    ctx.fillStyle = color;
    const playerWidth = 12;
    const playerHeight = 60;
    const gap = 80;

    for (let i = 0; i < count; i++) {   //Loop through each player in the specified count
        let adjustedY;  // Variable to hold the adjusted Y-position of the player

        // For Blue Team
        if (color === 'skyblue') {
            const maxUpward = startY + i * (playerHeight + gap);    // Calculation for maximum upward movement of a player
            const minDownward = groundHeight - 60 - (count - 1 - i) * (playerHeight + gap); // Maximum downward movement of a player

            adjustedY = Math.max(blueTeamY + startY + i * (playerHeight + gap), maxUpward); // Limiting the adjusted Y-position based on upward movement
            adjustedY = Math.min(adjustedY, minDownward);   // Limiting the adjusted Y-position based on downward move
            ctx.fillRect(startX, adjustedY, playerWidth, playerHeight); // Drawing the player rectangle at the adjusted position

            // Collision for blue team
            checkPlayerBallCollision(startX, adjustedY, playerWidth, playerHeight);
        } 
        
        // For Red Team
        else if (color === 'red') {
            const maxUpward = startY + i * (playerHeight + gap);
            const minDownward = groundHeight - 60 - (count - 1 - i) * (playerHeight + gap);

            adjustedY = Math.max(redTeamY + startY + i * (playerHeight + gap), maxUpward);
            adjustedY = Math.min(adjustedY, minDownward);
            ctx.fillRect(startX, adjustedY, playerWidth, playerHeight);

            // Collision for red team
            checkPlayerBallCollision(startX, adjustedY, playerWidth, playerHeight);
        }
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

    // Checking collision between players and the ball for Blue Team
    checkPlayerBallCollision(50, blueTeamY, 12, 60); // Adjusting parameters for the goalkeeper
    checkPlayerBallCollision(200, blueTeamY + 190, 12, 60); // Adjusting parameters for defenders
    checkPlayerBallCollision(525, blueTeamY + 110, 12, 60); // Adjusting parameters for midfielders
    checkPlayerBallCollision(950, blueTeamY + 190, 12, 60); // Adjusting parameters for forwarders

    // Checking collision between players and the ball for Red Team
    checkPlayerBallCollision(groundWidth - 60, redTeamY, 12, 60); // Adjusting parameters for the goalkeeper
    checkPlayerBallCollision(groundWidth - 200, redTeamY + 190, 12, 60); // Adjusting parameters for defenders
    checkPlayerBallCollision(groundWidth - 525, redTeamY + 110, 12, 60); // Adjusting parameters for midfielders
    checkPlayerBallCollision(groundWidth - 950, redTeamY + 190, 12, 60); // Adjusting parameters for forwarders


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


function checkGoalCollision() {
    if (
        (ballX - ballRadius < goalPostWidth && ballY > (groundHeight - goalPostHeight) / 2 && ballY < (groundHeight + goalPostHeight) / 2) ||
        (ballX + ballRadius > groundWidth - goalPostWidth && ballY > (groundHeight - goalPostHeight) / 2 && ballY < (groundHeight + goalPostHeight) / 2)
    ) {
        // Ball has entered the left or right goal post area
        if (ballX - ballRadius < goalPostWidth) {
            rightTeamScore++; // Right team scored
            ballVelocityX = -ballVelocity; // Ball moves towards the left (Blue Team)
        } 
        else {
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

    // For Blue Team
    drawPlayers('skyblue', 50, 300, 1);
    drawPlayers('skyblue', 200, 190, 3);
    drawPlayers('skyblue', 525, 110, 4);
    drawPlayers('skyblue', 950, 190, 3);

    // For Red Team
    drawPlayers('red', groundWidth - 60, 300, 1);
    drawPlayers('red', groundWidth - 200, 190, 3);
    drawPlayers('red', groundWidth - 525, 110, 4);
    drawPlayers('red', groundWidth - 950, 190, 3);

    // Check for goal collision
    checkGoalCollision();

    requestAnimationFrame(drawCircle);
}

// Start the animation
drawCircle();
