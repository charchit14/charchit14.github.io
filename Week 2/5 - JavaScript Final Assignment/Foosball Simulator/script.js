// Setting up the ground
let ground;
let groundWidth = 1320;
let groundHeight = 660;

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
let columnWidth = 20; // Width of each player (column)
let columnGap = 48;    // Gap between columns
let columnCount = 4;   // Number of columns
let playerHeight = 30; // Height of each player

// Calculate total width occupied by columns and gaps
let totalColumnsWidth = columnCount * columnWidth + (columnCount - 1) * columnGap;

// Calculate the starting position for the columns on the left side
let startXLeft = (groundWidth / 2 - totalColumnsWidth) / 2;

/*
// Left side team (sky blue team)
column for gk: 1 player
column for DF: 3 players
column for MID: 4 players
column for FWD: 3 players 




*/



















// Draw four columns of sky blue players on the left side
for (let i = 0; i < columnCount; i++) {
    let columnX = startXLeft + i * (columnWidth + columnGap);

    // Draw a sky blue player rectangle in each column on the left side
    ctx.fillStyle = 'skyblue';
    ctx.fillRect(columnX, (groundHeight - playerHeight) / 2, columnWidth, playerHeight);
}

// Calculate the starting position for the columns on the right side
let startXRight = groundWidth / 2 + (groundWidth / 2 - totalColumnsWidth) / 2;

// Draw four columns of red players on the right side
for (let i = 0; i < columnCount; i++) {
    let columnX = startXRight + i * (columnWidth + columnGap);

    // Draw a red player rectangle in each column on the right side
    ctx.fillStyle = 'red';
    ctx.fillRect(columnX, (groundHeight - playerHeight) / 2, columnWidth, playerHeight);
}
