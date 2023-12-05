// Setting up the ground
let ground;
let groundWidth = 1320;   // Background image has 1320p width
let groundHeight = 660;  // Background image has 660p height

// Get the canvas element by its ID
ground = document.getElementById('ground');

// Set the width and height attributes of the canvas
ground.width = groundWidth;
ground.height = groundHeight;

// Get the 2D rendering context of the canvas
let ctx = ground.getContext('2d');

// Draw a white center line
ctx.beginPath();
ctx.strokeStyle = 'white';
ctx.lineWidth = 3;
ctx.moveTo(groundWidth / 2, 0);
ctx.lineTo(groundWidth / 2, groundHeight);
ctx.stroke();

// Define goal post dimensions and positions
let goalPostWidth = 24;
let goalPostHeight = 120;
let goalPostOffset = 0; // Distance from the edges

// Draw left goal post
ctx.fillStyle = 'white';
ctx.fillRect(goalPostOffset, (groundHeight - goalPostHeight) / 2, goalPostWidth, goalPostHeight);

// Draw right goal post
ctx.fillRect(groundWidth - goalPostOffset - goalPostWidth, (groundHeight - goalPostHeight) / 2, goalPostWidth, goalPostHeight);


// Setting up the players
// Define player column properties
let columnWidth = 100; // Width of each column
let columnGap = 48;    // Gap between columns
let columnCount = 4;   // Number of columns
let playerHeight = 50; // Height of each player

// Calculate total width occupied by columns and gaps
let totalColumnsWidth = columnCount * columnWidth + (columnCount - 1) * columnGap;

// Calculate the starting position for the columns
let startX = (groundWidth / 2 - totalColumnsWidth) / 2; // Adjust for left side

// Draw four columns of players
for (let i = 0; i < columnCount; i++) {
    let columnX = startX + i * (columnWidth + columnGap);

    // Draw a player rectangle in each column
    ctx.fillStyle = 'blue'; // Change color or style as needed
    ctx.fillRect(columnX, (groundHeight - playerHeight) / 2, columnWidth, playerHeight);
}