// Setting up the canvas
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// Setting up initial location of the ball
var x = canvas.width/2;
var y = canvas.height/2;

// Defining the ball radius
var ballRadius = 8;

// Setting up speed of the ball
var dx = 2;
var dy = -2;

// Initializing speed of the ball
var m = 0;
var j = 0;

var aiSpeed = 2; // CPU players movement speed

// Setting up the paddle dimensions
var paddleHeight = 10;
var paddleWidth = 30;

// Setting up the initial X-coordinate of the paddle
var paddleX = (canvas.width-paddleWidth);

// Initializing 'keypress' status
var rightPressed = false;
var leftPressed = false;  

// Setting up the dimensions of goal-post
var goalpostWidth = 150;
var goalpostHeight = 10;

// Initializing the teams's score
var homeScore = 0;
var awayScore = 0;

// Setting up dimension of the players
var playerHeight = 50;
var playerWidth = 30;

// Setting up the flags
var initFlag = true;
var gameOver = false;
var flag1 = 1;
var flag2 = 1;
var drawFlag = true;

// Adding 'keypress' events
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

// Initializing variables of theorem.js
var V = SAT.Vector; // Vector Operations
var C = SAT.Circle; // Circle Collision
var B = SAT.Box;    // Box Collision

// To hold instances of circle and box objects used for collision detection
var circle;
var box;

// Initializing the images
var homePlayer = new Image();
var awayPlayer = new Image();


// Beginning the game functions
function init() {
    removeStatus();
    homePlayer.src = 'images/homePlayer.png';
    awayPlayer.src = 'images/awayPlayer.png';
    document.getElementById('startScreen').style['z-index'] = '-1';
    document.getElementById('gameOverScreen').style['z-index'] = '-1';
    document.getElementById('home').innerHTML = '0';    // Initial home score
    document.getElementById('away').innerHTML = '0';    // Initial away score
    // Resetting the scores
    awayScore = 0;
    homeScore = 0;
    gameOver = 0;   // Indicates the game is not over
    setInitialDelay();
}

// Initiating a delay before starting the game loop and timer
function setInitialDelay() {
    setTimeout(function() {
        startTimer(60*2) ; // Total match time (60*2 for 2mins)
        drawFlag = true;
        window.requestAnimationFrame(draw); // Initiating the game-loop
    }, 1500);
}

function setDelay() {
    setTimeout(function() {
        drawFlag = true;
        window.requestAnimationFrame(draw);
    }, 1500);
}

// Creating a count-down timer for a specified duration and perform certain actions when the timer reaches zero
function startTimer(duration) {
    var timer = duration, minutes, seconds;
    
    // Executes the inner logic every 1000 millisecond (1 second) until cleared (Recurring time)
    countdown = setInterval(function() {
        minutes = parseInt(timer / 60, 10); // Parse a string and convert it into an integer (for conversion)
        seconds = parseInt(timer % 60, 10); // Calculating the remaining seconds after calculating the minutes
        // Here, 10 after value means the base/radix of the number system. In this case it means decimal (base-10)

        // To maintain the 'Minutes:Seconds' format
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        // Updating the HTML to display the remaining time
        document.getElementById('countdown').innerHTML = minutes + ":" + seconds;

        // Updating the screen when timer reaches zero
        // Decrement the timer by 1 value and then check
        if (--timer < 0) {
            document.getElementById('gameOverScreen').style['z-index'] = 3;
            gameOver = true;
            clearInterval(countdown);
            if (homeScore > awayScore)
                updateStatus('Game Over<br>Nottingham Forest Won');
            else if (awayScore > homeScore)
                updateStatus('Game Over<br>Newcastle United Won');
            else
                updateStatus("Game Over<br>It's a draw");

            // Adding sound for final whistle
            const musicDuration = 4000; // Duration in milliseconds (this means 4sec. here)
            const music = document.getElementById('gameMusicEnd');
            music.play();

            setTimeout(function() {
                music.pause();
                // Additional actions after the music finishes (if needed)
            }, musicDuration);
        }
    }, 1000);
}


// Beginning the Drawing functions 
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPlayers();
    drawGoalPost();
    // Updating the ball's position based on its velcoity (dx and dy)
    x += dx;
    y += dy;
    // Adjusting the players position based on keypress (also making sure they reamin within the canvas's boundary)
    if (rightPressed && paddleX * 3 / 4 + m < canvas.width - paddleWidth) {
        m += 2;
    }
    else if (leftPressed && paddleX / 4 + m > 0) {
        m -= 2;
    }
    // Controlling the animation (if drawFlag is True, allows canvas to render next frame)
    if (drawFlag && !gameOver)
        window.requestAnimationFrame(draw);
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);  // Creating a circular path
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.closePath();
    
    // Creating a theorem.js circle object for collision detection with a specified position and radius 
    circle = new C(new V(x, y), 6);
    // Checking collision
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
            dx = -dx; // Reversing the direction
            // Ensuring the ball remains within the canvas
            if(x<0)
                x=0;
            if(x>canvas.width)
                x = canvas.width; 
    }
    if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
        dy = -dy;   // Reversing the velcoity if the ball hits top or bottom boundaries
    }
}

function drawPlayers() {
    drawHomeTeam();
    drawAwayTeam();   
}

function drawHomeTeam() {
    drawGoalkeeper();
    drawDefenders();
    drawMidfielders();
    drawStrikers();
}

function drawAwayTeam() {
    drawAwayGoalkeeper();
    drawAwayDefenders();
    drawAwayMidfielders();
    drawAwayStrikers();
}

function drawGoalPost() {
    // Drawing home goal-post
    ctx.beginPath();
    var gphX = (canvas.width - goalpostWidth) / 2;  // X-coordinate of the goal-post's top left
    var gphY = canvas.height - goalpostHeight;  // Y-coordinate of the goal-post's top left
    ctx.rect(gphX, gphY, goalpostWidth, goalpostHeight);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();

    // Creating theorem.js box (converted to polygon) for home goal-post detection
    box = new B(new V(gphX, gphY), goalpostWidth, goalpostHeight).toPolygon();
    if (goalDetection(box)) {
        updateScore('home');
        updateStatus('Newcastle<br>scored a Goal');
        removeStatus();
        resetBall();
        setDelay();
    }

    // Drawing away goal-post
    ctx.beginPath();
    var gpaX = (canvas.width - goalpostWidth) / 2;
    var gpaY = paddleHeight - goalpostHeight;
    ctx.rect(gpaX, gpaY, goalpostWidth, goalpostHeight);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
    
    // Creating theorem.js box (converted to polygon) for home goal-post detection
    box = new B(new V(gpaX, gpaY), goalpostWidth, goalpostHeight).toPolygon();
    if (goalDetection(box)) {
        updateScore('away');
        updateStatus('Nottingham<br>scored a Goal');
        removeStatus();
        resetBall();
        setDelay();
    }
}

// Updating the goals based on the team that scored
function updateScore(goal) {
    if (goal === 'home') {
        awayScore += 1;
        document.getElementById('away').innerHTML = awayScore;
    } else {
        homeScore += 1;
        document.getElementById('home').innerHTML = homeScore;
    }
    
    // Adding Goal Sound
    const musicDuration = 3000; // Duration in milliseconds (this means 3sec. here)
            const music = document.getElementById('gameMusicGoal');
            music.play();

            setTimeout(function() {
                music.pause();
                // Additional actions after the music finishes (if needed)
            }, musicDuration);
}

// Resetting the ball to the center, clearing canvas, and redrawing
function resetBall() {
    x = canvas.width / 2;
    y = canvas.height / 2;
    drawBall();
    drawFlag = false;   // Do not draw the canvas immediately after this function is called
    window.requestAnimationFrame(draw);
}

function updateStatus(message) {
    document.getElementById('status').innerHTML = message;
}

// Executing after 1.5secs.
function removeStatus() {
    setTimeout(function() {
        document.getElementById('status').innerHTML = '';
    }, 1500);
}

function drawGoalkeeper() {
    var gkX = paddleX / 2 + m;
    var gkY = canvas.height * 7 / 8 - paddleHeight;
    ctx.drawImage(homePlayer, gkX, gkY - 15, playerWidth, playerHeight);
    drawRods(gkY);
    // Creating a box representation at GK's position converting iy into a polygon
    box = new B(new V(gkX, gkY), playerWidth, paddleHeight).toPolygon();
    collisionDetection(box, gkX);   // Collision detection based on GK's position within the game
}

function drawDefenders() {
    var lcbX = paddleX / 4 + m;
    var lcbY = canvas.height * 13 / 16 - paddleHeight;
    drawRods(lcbY);
    ctx.drawImage(homePlayer, lcbX, lcbY - 15, playerWidth, playerHeight);
    box = new B(new V(lcbX, lcbY), playerWidth, paddleHeight).toPolygon();
    collisionDetection(box, lcbX);

    var rcbX = paddleX * 3 / 4 + m;
    var rcbY = canvas.height * 13 / 16 - paddleHeight;
    ctx.drawImage(homePlayer, rcbX, rcbY - 15, playerWidth, playerHeight);
    box = new B(new V(rcbX, rcbY), playerWidth, paddleHeight).toPolygon();
    collisionDetection(box, rcbX);
}

function drawMidfielders() {
    var lwbX = paddleX * 1 / 8 + m;
    var lwbY = canvas.height * 5 / 8 - paddleHeight;
    drawRods(lwbY);
    ctx.drawImage(homePlayer, lwbX, lwbY - 15, playerWidth, playerHeight);
    box = new B(new V(lwbX, lwbY), playerWidth, paddleHeight).toPolygon();
    collisionDetection(box, lwbX);

    var lcmX = paddleX * 3 / 8 + m;
    var lcmY = canvas.height * 5 / 8 - paddleHeight;
    ctx.drawImage(homePlayer, lcmX, lcmY - 15, playerWidth, playerHeight);
    box = new B(new V(lcmX, lcmY), playerWidth, paddleHeight).toPolygon();
    collisionDetection(box, lcmX);

    var rcmX = paddleX * 5 / 8 + m;
    var rcmY = canvas.height * 5 / 8 - paddleHeight;
    ctx.drawImage(homePlayer, rcmX, rcmY - 15, playerWidth, playerHeight);
    box = new B(new V(rcmX, rcmY), playerWidth, paddleHeight).toPolygon();
    collisionDetection(box, rcmX);

    var rwbX = paddleX * 7 / 8 + m;
    var rwbY = canvas.height * 5 / 8 - paddleHeight;
    ctx.drawImage(homePlayer, rwbX, rwbY - 15, playerWidth, playerHeight);
    box = new B(new V(rwbX, rwbY), playerWidth, paddleHeight).toPolygon();
    collisionDetection(box, rwbX);
}

function drawStrikers() {
    var lwX = paddleX / 4 + m;
    var lwY = canvas.height * 9 / 32 - paddleHeight;
    drawRods(lwY);
    ctx.drawImage(homePlayer, lwX, lwY - 15, playerWidth, playerHeight);
    box = new B(new V(lwX, lwY), playerWidth, paddleHeight).toPolygon();
    collisionDetection(box, lwX);

    var cfX = paddleX / 2 + m;
    var cfY = canvas.height * 9 / 32 - paddleHeight;
    ctx.drawImage(homePlayer, cfX, cfY - 15, playerWidth, playerHeight);
    box = new B(new V(cfX, cfY), playerWidth, paddleHeight).toPolygon();
    collisionDetection(box, cfX);

    var rwX = paddleX * 3 / 4 + m;
    var rwY = canvas.height * 9 / 32 - paddleHeight;
    ctx.drawImage(homePlayer, rwX, rwY - 15, playerWidth, playerHeight);
    box = new B(new V(rwX, rwY), playerWidth, paddleHeight).toPolygon();
    collisionDetection(box, rwX);
}

function drawAwayGoalkeeper() {
    var gkX = paddleX / 2 + j;
    var gkY = canvas.height * 1 / 8 - paddleHeight;
    drawRods(gkY);
    ctx.drawImage(awayPlayer, gkX, gkY - 15, playerWidth, playerHeight);
    box = new B(new V(gkX, gkY), playerWidth, paddleHeight).toPolygon();
    collisionDetectionAway(box, gkX);

    // Adjusting GK's position based on the ball's position and the paddle's width
    // To allow GK to move horizontally based on ball's movement (also making sure GK can't move beyond the boundaries)
    if (x > gkX && gkX < paddleX * 3 / 4)
        j += aiSpeed;
    else if (gkX > paddleX * 1 / 4)
        j -= aiSpeed;
}

function drawAwayDefenders() {
    var lcbX = paddleX / 4 + j;
    var lcbY = canvas.height * 3 / 16 - paddleHeight;
    drawRods(lcbY);
    ctx.drawImage(awayPlayer, lcbX, lcbY - 15, playerWidth, playerHeight);
    box = new B(new V(lcbX, lcbY), playerWidth, paddleHeight).toPolygon();
    collisionDetectionAway(box, lcbX);

    var rcbX = paddleX * 3 / 4 + j;
    var rcbY = canvas.height * 3 / 16 - paddleHeight;
    ctx.drawImage(awayPlayer, rcbX, rcbY - 15, playerWidth, playerHeight);
    box = new B(new V(rcbX, rcbY), playerWidth, paddleHeight).toPolygon();
    collisionDetectionAway(box, rcbX);

    if (x > lcbX && lcbX < paddleX * 3 / 4)
        j += aiSpeed;
    else if (lcbX > paddleX * 1 / 4)
        j -= aiSpeed;
    if (x > rcbX && rcbX < paddleX * 3 / 4)
        j += aiSpeed;
    else if (rcbX > paddleX * 1 / 4)
        j -= aiSpeed;
}

function drawAwayMidfielders() {
    var lwbX = paddleX * 1 / 8 + j;
    var lwbY = canvas.height * 3 / 8 - paddleHeight;
    drawRods(lwbY)
    ctx.drawImage(awayPlayer, lwbX, lwbY - 15, playerWidth, playerHeight);
    box = new B(new V(lwbX, lwbY), playerWidth, paddleHeight).toPolygon();
    collisionDetectionAway(box, lwbX);

    var lcmX = paddleX * 3 / 8 + j;
    var lcmY = canvas.height * 3 / 8 - paddleHeight;
    ctx.drawImage(awayPlayer, lcmX, lcmY - 15, playerWidth, playerHeight);
    box = new B(new V(lcmX, lcmY), playerWidth, paddleHeight).toPolygon();
    collisionDetectionAway(box, lcmX);

    var rcmX = paddleX * 5 / 8 + j;
    var rcmY = canvas.height * 3 / 8 - paddleHeight;
    ctx.drawImage(awayPlayer, rcmX, rcmY - 15, playerWidth, playerHeight);
    box = new B(new V(rcmX, rcmY), playerWidth, paddleHeight).toPolygon();
    collisionDetectionAway(box, rcmX);

    var rwbX = paddleX * 7 / 8 + j;
    var rwbY = canvas.height * 3 / 8 - paddleHeight;
    ctx.drawImage(awayPlayer, rwbX, rwbY - 15, playerWidth, playerHeight);
    box = new B(new V(rwbX, rwbY), playerWidth, paddleHeight).toPolygon();
    collisionDetectionAway(box, rwbX);

    if (x > lwbX && lwbX < paddleX * 3 / 4)
        j += aiSpeed;
    else if (lwbX > paddleX * 1 / 4)
        j -= aiSpeed;
    if (x > rwbX && rwbX < paddleX * 3 / 4)
        j += aiSpeed;
    else if (rwbX > paddleX * 1 / 4)
        j -= aiSpeed;
    if (x > rcmX && rcmX < paddleX * 3 / 4)
        j += aiSpeed;
    else if (rcmX > paddleX * 1 / 4)
        j -= aiSpeed;
    if (x > lcmX && lcmX < paddleX * 3 / 4)
        j += aiSpeed;
    else if (lcmX > paddleX * 1 / 4)
        j -= aiSpeed;
}

function drawAwayStrikers() {
    ctx.beginPath();
    var lwX = paddleX / 4 + j;
    var lwY = canvas.height * 23 / 32 - paddleHeight;
    drawRods(lwY);
    ctx.drawImage(awayPlayer, lwX, lwY - 15, playerWidth, playerHeight);
    box = new B(new V(lwX, lwY), playerWidth, paddleHeight).toPolygon();
    collisionDetectionAway(box, lwX);

    ctx.beginPath();
    var cfX = paddleX / 2 + j;
    var cfY = canvas.height * 23 / 32 - paddleHeight;
    ctx.drawImage(awayPlayer, cfX, cfY - 15, playerWidth, playerHeight);
    box = new B(new V(cfX, cfY), playerWidth, paddleHeight).toPolygon();
    collisionDetectionAway(box, cfX);

    ctx.beginPath();
    var rwX = paddleX * 3 / 4 + j;
    var rwY = canvas.height * 23 / 32 - paddleHeight;
    ctx.drawImage(awayPlayer, rwX, rwY - 15, playerWidth, playerHeight);
    box = new B(new V(rwX, rwY), playerWidth, paddleHeight).toPolygon();
    collisionDetectionAway(box, rwX);
}

function collisionDetection(box, pX) {
    // Creating a SAT response object to hold the collision information
    var response = new SAT.Response();

    // Collision check between polygon(box) and a circle
    if (SAT.testPolygonCircle(box, circle, response)) {
        var speed = (x + (12 / 2) - pX + (20 / 2)) / (20 / 2) * 5;
        if (flag1 == 1) {
            // Reacting to the collision based on the ball's current direction
            // Adjusting the ball's position based on direction after collision
            if (dy > 0) {
                dy = -dy;
                y = y - speed;
                if (dx > 0)
                    x = x + speed;
                else
                    x = x - speed;
            } else {
                y = y - speed;
                if (dx > 0)
                    x = x - speed;
                else
                    x = x + speed;
            }
            // Chnaging flag1 to indicate collision has occured
            flag1 = 0;
        }
    } else
        // Resetting flag1 when no collision occurs
        flag1 = 1;
}

function collisionDetectionAway(box, pX) {
    var response = new SAT.Response();
    if (SAT.testPolygonCircle(box, circle, response)) { // Condition for collision
        var speed = (x + (12 / 2) - pX + (20 / 2)) / (20 / 2) * 5;  // Speed calculation
        if (flag2 == 1) {
            if (dy < 0) {
                dy = -dy;
                y = y + speed;
                if (dx > 0)
                    x = x + speed;
                
                else
                    x = x - speed;
            } else {
                y = y + speed;
                if (dx > 0)
                    x = x + speed;
                else
                    x = x - speed;
            }
        }
    } else
        flag2 = 1;
}


function goalDetection(box) {
    var response = new SAT.Response();  // SAT response object to hold collision information
    return SAT.testPolygonCircle(box, circle, response);    // Testing for collision
}

function drawRods(yAxis) {
    ctx.beginPath();
    ctx.rect(0, yAxis + 2, canvas.width, paddleHeight - 5);
    ctx.fillStyle = "#BDBDBD";
    ctx.fill();
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.closePath();
}

function keyDownHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = true;
    } else if (e.keyCode == 37) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = false;
    } else if (e.keyCode == 37) {
        leftPressed = false;
    }
}
